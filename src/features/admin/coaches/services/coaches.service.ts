import { supabase } from '#/utils/supabase'

export interface Coach {
  id: string
  name: string
  title: string
  email: string | null
  bio: string
  specialties: string[]
  certifications: string[]
  image_url: string | null
  active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type CoachInsert = Omit<Coach, 'id' | 'created_at' | 'updated_at'>
export type CoachUpdate = Partial<CoachInsert>

const TABLE = 'coaches'

export async function getCoaches(): Promise<Coach[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Coach[]
}

export async function createCoach(payload: CoachInsert): Promise<Coach> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data as Coach
}

export async function updateCoach(id: string, payload: CoachUpdate): Promise<Coach> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Coach
}

export async function deleteCoach(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleCoachActive(id: string, active: boolean): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ active })
    .eq('id', id)

  if (error) throw error
}

export async function reorderCoaches(ordered: { id: string; sort_order: number }[]): Promise<void> {
  const updates = ordered.map(({ id, sort_order }) =>
    supabase.from(TABLE).update({ sort_order }).eq('id', id)
  )
  await Promise.all(updates)
}

export async function uploadCoachImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from('coaches')
    .upload(fileName, file, { upsert: false })

  if (error) throw error

  const { data } = supabase.storage.from('coaches').getPublicUrl(fileName)
  return data.publicUrl
}

export async function deleteCoachImage(url: string): Promise<void> {
  const path = url.split('/coaches/').pop()
  if (!path) return
  await supabase.storage.from('coaches').remove([path])
}
