import { createServerFn } from '@tanstack/react-start'
import { sql } from 'drizzle-orm'
import { db } from '#/db'
import { authed } from '#/lib/auth-guard'

export interface ContentItem {
  id: string
  title: string
  kind: 'blog' | 'news'
  updated_at: string
}

export interface Dashboard {
  posts: { published: number; drafts: number }
  news: { published: number; drafts: number }
  coaches: number
  subscribers: { active: number; last30: number }
  /** Borradores pendientes, los más recientes primero. */
  drafts: ContentItem[]
  /** Últimos posts/news editados (publicados o no). */
  recent: ContentItem[]
  /** key de `config` → última edición. */
  programs: Record<string, string>
  recentSubscribers: { email: string; source: string; created_at: string }[]
}

// Una sola llamada para todo el dashboard: son consultas baratas sobre tablas
// pequeñas y así la página no hace 8 viajes.
const dashboardFn = createServerFn({ method: 'GET' })
  .middleware([authed])
  .handler(async (): Promise<Dashboard> => {
    const since30 = new Date(Date.now() - 30 * 86400_000).toISOString()
    const content = sql`
      SELECT id, title, 'blog' AS kind, updated_at, published FROM posts
      UNION ALL
      SELECT id, title, 'news' AS kind, updated_at, published FROM news`

    const [posts, news, coaches, subs, drafts, recent, programs, recentSubscribers] =
      await Promise.all([
        db.get<{ published: number; drafts: number }>(sql`
          SELECT COALESCE(SUM(published = 1), 0) AS published, COALESCE(SUM(published = 0), 0) AS drafts
          FROM posts`),
        db.get<{ published: number; drafts: number }>(sql`
          SELECT COALESCE(SUM(published = 1), 0) AS published, COALESCE(SUM(published = 0), 0) AS drafts
          FROM news`),
        db.get<{ n: number }>(sql`SELECT COUNT(*) AS n FROM coaches WHERE active = 1`),
        db.get<{ active: number; last30: number }>(sql`
          SELECT COUNT(*) AS active, COALESCE(SUM(created_at >= ${since30}), 0) AS last30
          FROM subscriptions WHERE status = 'active'`),
        db.all<ContentItem>(sql`
          SELECT id, title, kind, updated_at FROM (${content})
          WHERE published = 0 ORDER BY updated_at DESC LIMIT 5`),
        db.all<ContentItem>(sql`
          SELECT id, title, kind, updated_at FROM (${content})
          ORDER BY updated_at DESC LIMIT 5`),
        db.all<{ key: string; updated_at: string }>(sql`SELECT key, updated_at FROM config`),
        db.all<{ email: string; source: string; created_at: string }>(sql`
          SELECT email, source, created_at FROM subscriptions
          WHERE status = 'active' ORDER BY created_at DESC LIMIT 5`),
      ])

    return {
      posts: posts ?? { published: 0, drafts: 0 },
      news: news ?? { published: 0, drafts: 0 },
      coaches: coaches?.n ?? 0,
      subscribers: subs ?? { active: 0, last30: 0 },
      drafts,
      recent,
      programs: Object.fromEntries(programs.map((p) => [p.key, p.updated_at])),
      recentSubscribers,
    }
  })

export const getDashboard = () => dashboardFn()
