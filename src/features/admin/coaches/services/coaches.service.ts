import { createServerFn } from '@tanstack/react-start'
import { asc, eq, inArray, sql } from 'drizzle-orm'
import { db } from '#/db'
import { coaches } from '#/db/schema'
import type { Coach } from '#/db/schema'
import { adminOnly } from '#/lib/auth-guard'
import { uploadMedia, deleteMedia } from '#/lib/media'

export type { Coach }
export type CoachInsert = Omit<Coach, 'id' | 'created_at' | 'updated_at'>
export type CoachUpdate = Partial<CoachInsert>

const getCoachesFn = createServerFn({ method: 'GET' }).handler(() =>
  db.select().from(coaches).orderBy(asc(coaches.sort_order), asc(coaches.created_at)).all(),
)

const createCoachFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((payload: CoachInsert) => payload)
  .handler(({ data }) => db.insert(coaches).values(data).returning().get())

const updateCoachFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((input: { id: string; payload: CoachUpdate }) => input)
  .handler(({ data }) =>
    db
      .update(coaches)
      .set({ ...data.payload, updated_at: new Date().toISOString() })
      .where(eq(coaches.id, data.id))
      .returning()
      .get(),
  )

const deleteCoachFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    await db.delete(coaches).where(eq(coaches.id, data))
  })

const toggleActiveFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((input: { id: string; active: boolean }) => input)
  .handler(async ({ data }) => {
    await db.update(coaches).set({ active: data.active }).where(eq(coaches.id, data.id))
  })

const reorderFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((ordered: { id: string; sort_order: number }[]) => ordered)
  .handler(async ({ data }) => {
    if (!data.length) return
    // Un solo UPDATE con CASE en vez de N round-trips a D1.
    const cases = sql.join(
      data.map((c) => sql`WHEN ${coaches.id} = ${c.id} THEN ${c.sort_order}`),
      sql` `,
    )
    await db
      .update(coaches)
      .set({ sort_order: sql`CASE ${cases} ELSE ${coaches.sort_order} END` })
      .where(inArray(coaches.id, data.map((c) => c.id)))
  })

export const getCoaches = () => getCoachesFn()
export const createCoach = (payload: CoachInsert) => createCoachFn({ data: payload })
export const updateCoach = (id: string, payload: CoachUpdate) => updateCoachFn({ data: { id, payload } })
export const deleteCoach = (id: string) => deleteCoachFn({ data: id })
export const toggleCoachActive = (id: string, active: boolean) => toggleActiveFn({ data: { id, active } })
export const reorderCoaches = (ordered: { id: string; sort_order: number }[]) => reorderFn({ data: ordered })

export const uploadCoachImage = (file: File) => uploadMedia('coaches', file)
export const deleteCoachImage = (url: string) => deleteMedia(url)
