import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from '#/db'
import { subscriptions } from '#/db/schema'

export type SubscriptionSource = 'blog' | 'news' | 'general'

export class AlreadySubscribedError extends Error {
  constructor() { super('already_subscribed') }
}

const subscribeFn = createServerFn({ method: 'POST' })
  .inputValidator((input: { email: string; source: SubscriptionSource }) => {
    const email = input.email.trim().toLowerCase()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('invalid_email')
    if (!['blog', 'news', 'general'].includes(input.source)) throw new Error('invalid_source')
    return { email, source: input.source }
  })
  .handler(async ({ data }) => {
    const existing = await db
      .select({ id: subscriptions.id })
      .from(subscriptions)
      .where(and(eq(subscriptions.email, data.email), eq(subscriptions.source, data.source)))
      .get()
    if (existing) return { already: true }
    await db.insert(subscriptions).values({ ...data, status: 'active' })
    return { already: false }
  })

const unsubscribeFn = createServerFn({ method: 'POST' })
  .inputValidator((input: { email: string; source: SubscriptionSource }) => input)
  .handler(async ({ data }) => {
    await db
      .update(subscriptions)
      .set({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
      .where(and(eq(subscriptions.email, data.email), eq(subscriptions.source, data.source)))
  })

export async function subscribe(email: string, source: SubscriptionSource): Promise<void> {
  const { already } = await subscribeFn({ data: { email, source } })
  if (already) throw new AlreadySubscribedError()
}

export const unsubscribe = (email: string, source: SubscriptionSource) =>
  unsubscribeFn({ data: { email, source } })
