import { supabase } from '#/utils/supabase'

export interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_url: string | null
  category: string | null
  author: string
  user_id: string | null
  tags: string[]
  meta_title: string | null
  meta_description: string | null
  read_time_minutes: number | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export type NewsInsert = Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>
export type NewsUpdate = Partial<NewsInsert>

const TABLE = 'news'

export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as NewsItem[]
}

export async function getNewsItem(id: string): Promise<NewsItem> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as NewsItem
}

export async function createNewsItem(payload: NewsInsert): Promise<NewsItem> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data as NewsItem
}

export async function updateNewsItem(id: string, payload: NewsUpdate): Promise<NewsItem> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as NewsItem
}

export async function deleteNewsItem(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function uploadNewsCoverImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('news').upload(fileName, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('news').getPublicUrl(fileName)
  return data.publicUrl
}

export function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const NEWS_CATEGORIES = [
  { value: 'competition', label: 'Competition' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'event', label: 'Event' },
  { value: 'award', label: 'Award' },
  { value: 'community', label: 'Community' },
] as const
