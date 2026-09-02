import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq } from 'drizzle-orm'
import { db } from '#/db'
import { news } from '#/db/schema'
import type { NewsItem } from '#/features/admin/news/services/news.service'

const listFn = createServerFn({ method: 'GET' }).handler(() =>
  db
    .select({
      id: news.id,
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      cover_url: news.cover_url,
      category: news.category,
      author: news.author,
      tags: news.tags,
      read_time_minutes: news.read_time_minutes,
      published_at: news.published_at,
      created_at: news.created_at,
    })
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.published_at))
    .all(),
)

const bySlugFn = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data }) => {
    const row = await db
      .select()
      .from(news)
      .where(and(eq(news.slug, data), eq(news.published, true)))
      .get()
    return row ?? null
  })

export const getPublishedNews = () => listFn() as Promise<NewsItem[]>
export const getNewsBySlug = (slug: string) => bySlugFn({ data: slug })
