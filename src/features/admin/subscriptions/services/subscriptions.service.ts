import { supabase } from '#/utils/supabase'

export interface Subscription {
  id: string
  email: string
  source: 'blog' | 'news' | 'general'
  status: 'active' | 'unsubscribed'
  unsubscribed_at: string | null
  created_at: string
}

const db = supabase as any

export async function getSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await db
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Subscription[]
}

export async function deleteSubscription(id: string): Promise<void> {
  const { error } = await db.from('subscriptions').delete().eq('id', id)
  if (error) throw error
}

export async function unsubscribe(id: string): Promise<void> {
  const { error } = await db
    .from('subscriptions')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}
