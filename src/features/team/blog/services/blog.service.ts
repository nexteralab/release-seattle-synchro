import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq } from 'drizzle-orm'
import { db } from '#/db'
import { posts } from '#/db/schema'
import type { Post } from '#/db/schema'

const listFn = createServerFn({ method: 'GET' }).handler(() =>
  db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      cover_url: posts.cover_url,
      author: posts.author,
      tags: posts.tags,
      read_time_minutes: posts.read_time_minutes,
      published_at: posts.published_at,
      created_at: posts.created_at,
    })
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.published_at))
    .all(),
)

const bySlugFn = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data }) => {
    const row = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, data), eq(posts.published, true)))
      .get()
    return row ?? null
  })

export const getPublishedPosts = () => listFn() as Promise<Post[]>
export const getPostBySlug = (slug: string) => bySlugFn({ data: slug })
