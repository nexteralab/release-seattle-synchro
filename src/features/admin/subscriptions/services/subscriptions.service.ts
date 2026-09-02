import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { db } from '#/db'
import { subscriptions } from '#/db/schema'
import type { Subscription } from '#/db/schema'
import { adminOnly } from '#/lib/auth-guard'

export type { Subscription }

const listFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .handler(() => db.select().from(subscriptions).orderBy(desc(subscriptions.created_at)).all())

const deleteFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    await db.delete(subscriptions).where(eq(subscriptions.id, data))
  })

const unsubscribeFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    await db
      .update(subscriptions)
      .set({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
      .where(eq(subscriptions.id, data))
  })

export const getSubscriptions = () => listFn()
export const deleteSubscription = (id: string) => deleteFn({ data: id })
export const unsubscribe = (id: string) => unsubscribeFn({ data: id })
