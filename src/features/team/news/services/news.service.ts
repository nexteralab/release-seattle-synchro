import { supabase } from '#/utils/supabase'
import type { NewsItem } from '#/features/admin/news/services/news.service'

const db = supabase as any

export async function getPublishedNews(): Promise<NewsItem[]> {
  const { data, error } = await db
    .from('news')
    .select('id, title, slug, excerpt, cover_url, category, author, tags, read_time_minutes, published_at, created_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as NewsItem[]
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const { data, error } = await db
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) throw error
  return data as NewsItem | null
}
