import { supabase } from '#/utils/supabase'
import type { Post } from '#/features/admin/blogs/services/posts.service'

const db = supabase as any

export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await db
    .from('posts')
    .select('id, title, slug, excerpt, cover_url, author, tags, read_time_minutes, published_at, created_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await db
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) throw error
  return data as Post | null
}
