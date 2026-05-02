import { supabase } from '#/utils/supabase'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_url: string | null
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

export type PostInsert = Omit<Post, 'id' | 'created_at' | 'updated_at'>
export type PostUpdate = Partial<PostInsert>

const TABLE = 'posts'

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Post[]
}

export async function getPost(id: string): Promise<Post> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Post
}

export async function createPost(payload: PostInsert): Promise<Post> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data as Post
}

export async function updatePost(id: string, payload: PostUpdate): Promise<Post> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Post
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function uploadCoverImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('blog').upload(fileName, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('blog').getPublicUrl(fileName)
  return data.publicUrl
}

export async function deleteCoverImage(url: string): Promise<void> {
  const path = url.split('/blog/').pop()
  if (!path) return
  await supabase.storage.from('blog').remove([path])
}

// Calcula minutos de lectura estimados basado en palabras
export function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

// Genera slug a partir del título
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
