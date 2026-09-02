import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { db } from '#/db'
import { posts } from '#/db/schema'
import type { Post } from '#/db/schema'
import { adminOnly } from '#/lib/auth-guard'
import { uploadMedia, deleteMedia } from '#/lib/media'

export type { Post }
export type PostInsert = Omit<Post, 'id' | 'created_at' | 'updated_at'>
export type PostUpdate = Partial<PostInsert>

const getPostsFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .handler(() => db.select().from(posts).orderBy(desc(posts.created_at)).all())

const getPostFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const row = await db.select().from(posts).where(eq(posts.id, data)).get()
    if (!row) throw new Error('Post not found')
    return row
  })

const createPostFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((payload: PostInsert) => payload)
  .handler(({ data }) => db.insert(posts).values(data).returning().get())

const updatePostFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((input: { id: string; payload: PostUpdate }) => input)
  .handler(({ data }) =>
    db
      .update(posts)
      .set({ ...data.payload, updated_at: new Date().toISOString() })
      .where(eq(posts.id, data.id))
      .returning()
      .get(),
  )

const deletePostFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    await db.delete(posts).where(eq(posts.id, data))
  })

export const getPosts = () => getPostsFn()
export const getPost = (id: string) => getPostFn({ data: id })
export const createPost = (payload: PostInsert) => createPostFn({ data: payload })
export const updatePost = (id: string, payload: PostUpdate) => updatePostFn({ data: { id, payload } })
export const deletePost = (id: string) => deletePostFn({ data: id })

export const uploadCoverImage = (file: File) => uploadMedia('blog', file)
export const deleteCoverImage = (url: string) => deleteMedia(url)

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
