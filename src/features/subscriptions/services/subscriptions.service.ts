import { supabase } from '#/utils/supabase'

export type SubscriptionSource = 'blog' | 'news' | 'general'

const db = supabase as any

export class AlreadySubscribedError extends Error {
  constructor() { super('already_subscribed') }
}

export async function subscribe(email: string, source: SubscriptionSource): Promise<void> {
  const { error } = await db
    .from('subscriptions')
    .insert({ email, source, status: 'active' })

  if (!error) return

  // 23505 = unique_violation: email+source ya existe para este source
  if (error.code === '23505') throw new AlreadySubscribedError()

  throw error
}

export async function unsubscribe(email: string, source: SubscriptionSource): Promise<void> {
  const { error } = await db
    .from('subscriptions')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('email', email)
    .eq('source', source)

  if (error) throw error
}
