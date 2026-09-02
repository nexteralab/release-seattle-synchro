import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { env } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'
import { db } from '#/db'
import * as authSchema from '#/db/auth.schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'sqlite', schema: authSchema }),
  // ponytail: sin signup público — los admins se crean con scripts/create-admin.mjs
  emailAndPassword: { enabled: true, disableSignUp: true },
  // `input: false` = nadie puede mandar su propio rol desde el cliente.
  user: {
    additionalFields: {
      role: { type: 'string', defaultValue: 'user', input: false },
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  // Sin baseURL, Better Auth lo deriva del request entrante. Solo hace falta
  // fijarlo si algún día hay varios hosts apuntando al mismo worker.
  baseURL: env.BETTER_AUTH_URL,
  // Cada sesión nueva = un login. Se marca aquí y no en el endpoint para que
  // cuente igual venga de donde venga (formulario, futuro OAuth, etc.).
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          await db
            .update(authSchema.user)
            .set({ lastLoginAt: new Date() })
            .where(eq(authSchema.user.id, session.userId))
        },
      },
    },
  },
  plugins: [tanstackStartCookies()],
})
