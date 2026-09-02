import { createServerFn } from '@tanstack/react-start'
import { hashPassword } from 'better-auth/crypto'
import { asc, eq } from 'drizzle-orm'
import { db } from '#/db'
import { user, account } from '#/db/auth.schema'
import { adminOnly } from '#/lib/auth-guard'

export type UserRole = 'admin' | 'user'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  /** ISO, o null si nunca ha entrado. */
  lastLoginAt: string | null
}

export interface UserInsert {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface UserUpdate {
  name?: string
  role?: UserRole
  /** Vacío = no se cambia la contraseña. */
  password?: string
}

// Better Auth 1.7 exige este issuer sintético para las cuentas email+password.
const CREDENTIAL_ISSUER = 'local:credential'
const now = () => new Date()

function validate(email: string, password: string | undefined, isNew: boolean) {
  const clean = email.trim().toLowerCase()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) throw new Error('Invalid email')
  if (isNew || password) {
    if (!password || password.length < 8) throw new Error('Password must be at least 8 characters')
  }
  return clean
}

const listFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .handler(async () => {
    const rows = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      })
      .from(user)
      .orderBy(asc(user.createdAt))
      .all()
    return rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      lastLoginAt: r.lastLoginAt?.toISOString() ?? null,
    })) as AdminUser[]
  })

const createFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((input: UserInsert) => input)
  .handler(async ({ data }) => {
    const email = validate(data.email, data.password, true)

    const existing = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).get()
    if (existing) throw new Error('That email is already registered')

    const id = crypto.randomUUID()
    const ts = now()

    await db.insert(user).values({
      id,
      name: data.name.trim() || email,
      email,
      emailVerified: true,
      role: data.role,
      createdAt: ts,
      updatedAt: ts,
    })

    // La contraseña vive en `account`, no en `user` — así lo espera Better Auth.
    await db.insert(account).values({
      id: crypto.randomUUID(),
      accountId: id,
      providerId: 'credential',
      issuer: CREDENTIAL_ISSUER,
      userId: id,
      password: await hashPassword(data.password),
      createdAt: ts,
      updatedAt: ts,
    })

    return { id }
  })

const updateFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((input: { id: string; payload: UserUpdate }) => input)
  .handler(async ({ data, context }) => {
    const { id, payload } = data

    // Un admin no puede quitarse a sí mismo el rol y quedarse fuera del panel.
    if (id === context.user.id && payload.role && payload.role !== 'admin') {
      throw new Error('You cannot remove your own admin role')
    }

    const fields: Record<string, unknown> = { updatedAt: now() }
    if (payload.name !== undefined) fields.name = payload.name.trim()
    if (payload.role !== undefined) fields.role = payload.role
    await db.update(user).set(fields).where(eq(user.id, id))

    if (payload.password) {
      if (payload.password.length < 8) throw new Error('Password must be at least 8 characters')
      await db
        .update(account)
        .set({ password: await hashPassword(payload.password), updatedAt: now() })
        .where(eq(account.userId, id))
    }
  })

const deleteFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data, context }) => {
    if (data === context.user.id) throw new Error('You cannot delete your own account')
    // `account` tiene ON DELETE CASCADE sobre user.
    await db.delete(user).where(eq(user.id, data))
  })

export const getUsers = () => listFn()
export const createUser = (payload: UserInsert) => createFn({ data: payload })
export const updateUser = (id: string, payload: UserUpdate) => updateFn({ data: { id, payload } })
export const deleteUser = (id: string) => deleteFn({ data: id })
