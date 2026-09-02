import { createServerFn } from '@tanstack/react-start'
import { sql } from 'drizzle-orm'
import { db } from '#/db'
import { adminOnly } from '#/lib/auth-guard'

// ============================================================
// Interfaces
// ============================================================

export interface OverviewStats {
  totalViews: number
  uniqueVisitors: number
  avgTimeSpent: number
  completionRate: number
}

export interface DailyPoint {
  day: string
  views: number
  uniqueVisitors: number
}

export interface TopPost {
  postId: string
  title: string
  slug: string | null
  coverUrl: string | null
  views: number
  uniqueVisitors: number
  avgTimeSpent: number
  completionRate: number
}

export interface BreakdownItem {
  dimension: string
  value: string
  count: number
}

// Antes eran 4 funciones RPC de Postgres; en D1 son SQL plano.
// `created_at` es TEXT ISO, así que el corte se calcula en JS para que la
// comparación de strings sea exacta (no mezclar con datetime() de SQLite).
const cutoff = (days: number) => new Date(Date.now() - days * 86400_000).toISOString()

type Args = { postType: string; days: number }
const args = (input: Args) => input

// ============================================================
// Consultas del dashboard — solo admin
// ============================================================

const overviewFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(args)
  .handler(async ({ data }) => {
    const rows = await db.all<{
      total_views: number
      unique_visitors: number
      avg_time_spent: number | null
      completion_rate: number | null
    }>(sql`
      SELECT
        COUNT(CASE WHEN type = 'pageview' THEN 1 END) AS total_views,
        COUNT(DISTINCT CASE WHEN type = 'pageview' THEN session_id END) AS unique_visitors,
        ROUND(AVG(CASE WHEN type = 'exit' THEN time_spent END), 2) AS avg_time_spent,
        COUNT(DISTINCT CASE WHEN type = 'read_complete' THEN session_id END) * 100.0
          / NULLIF(COUNT(DISTINCT CASE WHEN type = 'pageview' THEN session_id END), 0) AS completion_rate
      FROM analytics_events
      WHERE post_type = ${data.postType} AND post_id IS NOT NULL
        AND is_bot = 0 AND created_at >= ${cutoff(data.days)}
    `)
    return rows[0] ?? null
  })

const timeseriesFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(args)
  .handler(({ data }) =>
    db.all<{ day: string; views: number; unique_visitors: number }>(sql`
      SELECT
        substr(created_at, 1, 10) AS day,
        COUNT(*) AS views,
        COUNT(DISTINCT session_id) AS unique_visitors
      FROM analytics_events
      WHERE post_type = ${data.postType}
        AND type = 'pageview' AND is_bot = 0
        AND created_at >= ${cutoff(data.days)}
      GROUP BY day
      ORDER BY day
    `),
  )

const topPostsFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(args)
  .handler(({ data }) =>
    db.all<{
      post_id: string
      title: string | null
      slug: string | null
      cover_url: string | null
      views: number
      unique_visitors: number
      avg_time_spent: number | null
      completion_rate: number | null
    }>(sql`
      SELECT
        a.post_id,
        -- post_type decide la tabla, pero SQLite no cambia de tabla en tiempo
        -- de ejecución: se unen las dos y gana la que traiga fila.
        COALESCE(p.title, n.title) AS title,
        COALESCE(p.slug, n.slug) AS slug,
        COALESCE(p.cover_url, n.cover_url) AS cover_url,
        COUNT(CASE WHEN a.type = 'pageview' THEN 1 END) AS views,
        COUNT(DISTINCT CASE WHEN a.type = 'pageview' THEN a.session_id END) AS unique_visitors,
        ROUND(AVG(CASE WHEN a.type = 'exit' THEN a.time_spent END), 2) AS avg_time_spent,
        COUNT(DISTINCT CASE WHEN a.type = 'read_complete' THEN a.session_id END) * 100.0
          / NULLIF(COUNT(DISTINCT CASE WHEN a.type = 'pageview' THEN a.session_id END), 0) AS completion_rate
      FROM analytics_events a
      LEFT JOIN posts p ON p.id = a.post_id
      LEFT JOIN news n ON n.id = a.post_id
      WHERE a.post_type = ${data.postType} AND a.post_id IS NOT NULL
        AND a.is_bot = 0 AND a.created_at >= ${cutoff(data.days)}
      -- Se agrupa por las expresiones completas, no por los alias: posts y
      -- news tienen ambas columna "title", y SQLite resuelve el alias contra
      -- las tablas de origen → "ambiguous column name".
      GROUP BY
        a.post_id,
        COALESCE(p.title, n.title),
        COALESCE(p.slug, n.slug),
        COALESCE(p.cover_url, n.cover_url)
      ORDER BY views DESC
      LIMIT 10
    `),
  )

const breakdownFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(args)
  .handler(({ data }) =>
    db.all<{ dimension: string; value: string | null; count: number }>(sql`
      SELECT 'device' AS dimension, COALESCE(device, 'unknown') AS value, COUNT(*) AS count
      FROM analytics_events
      WHERE post_type = ${data.postType} AND type = 'pageview' AND is_bot = 0 AND created_at >= ${cutoff(data.days)}
      GROUP BY device

      UNION ALL

      SELECT 'referrer', referrer, COUNT(*)
      FROM analytics_events
      WHERE post_type = ${data.postType} AND type = 'pageview' AND is_bot = 0 AND created_at >= ${cutoff(data.days)}
      GROUP BY referrer

      UNION ALL

      SELECT 'scroll', CAST(scroll_pct AS TEXT), COUNT(*)
      FROM analytics_events
      WHERE post_type = ${data.postType} AND is_bot = 0
        AND type IN ('scroll', 'read_complete')
        AND scroll_pct IS NOT NULL
        AND created_at >= ${cutoff(data.days)}
      GROUP BY scroll_pct
    `),
  )

// SQLite no tiene regex: el dominio del referrer se extrae aquí y se
// reagrupan los conteos, igual que hacía el regexp_replace de Postgres.
function referrerHost(referrer: string | null): string {
  if (!referrer) return 'Direct'
  try {
    return new URL(referrer).hostname
  } catch {
    return referrer
  }
}

// ============================================================
// API pública del módulo (mismas firmas que la versión Supabase)
// ============================================================

export async function getOverview(postType: string, days: number): Promise<OverviewStats> {
  const row = await overviewFn({ data: { postType, days } })
  return {
    totalViews: Number(row?.total_views ?? 0),
    uniqueVisitors: Number(row?.unique_visitors ?? 0),
    avgTimeSpent: Number(row?.avg_time_spent ?? 0),
    completionRate: Number(row?.completion_rate ?? 0),
  }
}

export async function getTimeseries(postType: string, days: number): Promise<DailyPoint[]> {
  const rows = await timeseriesFn({ data: { postType, days } })
  return rows.map((r) => ({
    day: String(r.day),
    views: Number(r.views),
    uniqueVisitors: Number(r.unique_visitors),
  }))
}

export async function getTopPosts(postType: string, days: number): Promise<TopPost[]> {
  const rows = await topPostsFn({ data: { postType, days } })
  return rows.map((r) => ({
    postId: String(r.post_id),
    // Si el post se borró, la analítica sobrevive pero se queda sin título.
    title: r.title ?? 'Deleted post',
    slug: r.slug,
    coverUrl: r.cover_url,
    views: Number(r.views),
    uniqueVisitors: Number(r.unique_visitors),
    avgTimeSpent: Number(r.avg_time_spent ?? 0),
    completionRate: Number(r.completion_rate ?? 0),
  }))
}

export async function getBreakdown(postType: string, days: number): Promise<BreakdownItem[]> {
  const rows = await breakdownFn({ data: { postType, days } })

  const merged = new Map<string, BreakdownItem>()
  for (const r of rows) {
    const value = r.dimension === 'referrer' ? referrerHost(r.value) : String(r.value ?? 'unknown')
    const key = `${r.dimension}:${value}`
    const existing = merged.get(key)
    if (existing) existing.count += Number(r.count)
    else merged.set(key, { dimension: String(r.dimension), value, count: Number(r.count) })
  }

  return [...merged.values()].sort(
    (a, b) => a.dimension.localeCompare(b.dimension) || b.count - a.count,
  )
}
