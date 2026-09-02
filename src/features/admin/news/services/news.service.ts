import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { db } from '#/db'
import { news } from '#/db/schema'
import type { News } from '#/db/schema'
import { adminOnly } from '#/lib/auth-guard'
import { uploadMedia, deleteMedia } from '#/lib/media'

export type NewsItem = News
export type NewsInsert = Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>
export type NewsUpdate = Partial<NewsInsert>

const getNewsFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .handler(() => db.select().from(news).orderBy(desc(news.created_at)).all())

const getNewsItemFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const row = await db.select().from(news).where(eq(news.id, data)).get()
    if (!row) throw new Error('News item not found')
    return row
  })

const createNewsFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((payload: NewsInsert) => payload)
  .handler(({ data }) => db.insert(news).values(data).returning().get())

const updateNewsFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((input: { id: string; payload: NewsUpdate }) => input)
  .handler(({ data }) =>
    db
      .update(news)
      .set({ ...data.payload, updated_at: new Date().toISOString() })
      .where(eq(news.id, data.id))
      .returning()
      .get(),
  )

const deleteNewsFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    await db.delete(news).where(eq(news.id, data))
  })

export const getNews = () => getNewsFn()
export const getNewsItem = (id: string) => getNewsItemFn({ data: id })
export const createNewsItem = (payload: NewsInsert) => createNewsFn({ data: payload })
export const updateNewsItem = (id: string, payload: NewsUpdate) => updateNewsFn({ data: { id, payload } })
export const deleteNewsItem = (id: string) => deleteNewsFn({ data: id })

export const uploadNewsCoverImage = (file: File) => uploadMedia('news', file)
export const deleteNewsCoverImage = (url: string) => deleteMedia(url)

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
