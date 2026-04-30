import { supabase } from '#/utils/supabase'
import type { Session } from '@supabase/supabase-js'

export async function adminLogin(email: string, password: string): Promise<Session> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.session!
}

export async function adminLogout(): Promise<void> {
  await supabase.auth.signOut()
}

export async function getAdminSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
