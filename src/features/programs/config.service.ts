import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '#/db'
import { config } from '#/db/schema'
import { authed } from '#/lib/auth-guard'

/** Contenido editable de una sola fila: tabla `config` (key → value JSON). */
export type ConfigKey =
  | 'beginner' | 'competitive' | 'elite-clinic'
  | 'free-try' | 'recreational' | 'summer-camp' | 'try-out'
  | 'booster'

const getFn = createServerFn({ method: 'GET' })
  .inputValidator((key: ConfigKey) => key)
  .handler(async ({ data }) => {
    const row = await db.select({ value: config.value }).from(config).where(eq(config.key, data)).get()
    return row?.value ?? null
  })

const setFn = createServerFn({ method: 'POST' })
  .middleware([authed])
  .inputValidator((input: { key: ConfigKey; value: unknown }) => input)
  .handler(async ({ data }) => {
    await db
      .insert(config)
      .values({ key: data.key, value: data.value })
      .onConflictDoUpdate({
        target: config.key,
        set: { value: data.value, updated_at: new Date().toISOString() },
      })
  })

export const getConfig = <T>(key: ConfigKey) => getFn({ data: key }) as Promise<T | null>
export const setConfig = (key: ConfigKey, value: unknown) => setFn({ data: { key, value } })
