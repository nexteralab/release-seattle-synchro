import { createServerFn } from '@tanstack/react-start'
import { sql } from 'drizzle-orm'
import { db } from '#/db'
import { adminOnly } from '#/lib/auth-guard'

// `created_at` es TEXT ISO: el corte se calcula en JS para que la comparación
// de strings sea exacta y no dependa del datetime() de SQLite.
// days = 0 → desde siempre.
const cutoff = (days: number) =>
  days > 0 ? new Date(Date.now() - days * 86400_000).toISOString() : '0000'

// Los bots se excluyen SIEMPRE. Sin esto los números no significan nada:
// un sitio pequeño recibe más crawlers que personas.
const HUMAN = sql`is_bot = 0`

export interface Overview {
  pageviews: number
  sessions: number
  visitors: number
  newVisitors: number
  returningVisitors: number
  avgSessionSeconds: number
  conversions: number
  botsFiltered: number
}

export interface DailyPoint { day: string; pageviews: number; sessions: number }
export interface PagePoint { path: string; pageviews: number; sessions: number }
export interface DimPoint { value: string; count: number }
/** Campaña con su utm_source, para poder mostrar el icono de la fuente. */
export interface CampaignPoint extends DimPoint { source: string | null }
export interface DeviceDay { day: string; desktop: number; mobile: number; tablet: number }
export interface ConversionPoint { conversion: string; count: number; sessions: number }
export interface FunnelRow {
  conversion: string
  referrerType: string
  entryPath: string
  count: number
}

const range = (input: { days: number }) => input

const overviewFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(range)
  .handler(async ({ data }) => {
    const from = cutoff(data.days)
    const rows = await db.all<{
      pageviews: number
      sessions: number
      visitors: number
      new_visitors: number
      conversions: number
      bots_filtered: number
    }>(sql`
      SELECT
        COUNT(CASE WHEN type = 'pageview' THEN 1 END) AS pageviews,
        COUNT(DISTINCT session_id) AS sessions,
        COUNT(DISTINCT visitor_id) AS visitors,
        COUNT(DISTINCT CASE WHEN is_new_visitor = 1 THEN visitor_id END) AS new_visitors,
        COUNT(CASE WHEN type = 'conversion' THEN 1 END) AS conversions,
        (SELECT COUNT(*) FROM analytics_events WHERE is_bot = 1 AND created_at >= ${from}) AS bots_filtered
      FROM analytics_events
      WHERE created_at >= ${from} AND ${HUMAN}
    `)

    // Duración de sesión = último evento menos el primero. julianday() está en
    // días, de ahí el *86400.
    const dur = await db.all<{ avg_seconds: number | null }>(sql`
      SELECT AVG(seconds) AS avg_seconds FROM (
        SELECT (julianday(MAX(created_at)) - julianday(MIN(created_at))) * 86400 AS seconds
        FROM analytics_events
        WHERE created_at >= ${from} AND ${HUMAN}
        GROUP BY session_id
        HAVING COUNT(*) > 1
      )
    `)

    const r = rows[0]
    const visitors = Number(r?.visitors ?? 0)
    const newVisitors = Number(r?.new_visitors ?? 0)
    return {
      pageviews: Number(r?.pageviews ?? 0),
      sessions: Number(r?.sessions ?? 0),
      visitors,
      newVisitors,
      returningVisitors: Math.max(0, visitors - newVisitors),
      avgSessionSeconds: Math.round(Number(dur[0]?.avg_seconds ?? 0)),
      conversions: Number(r?.conversions ?? 0),
      botsFiltered: Number(r?.bots_filtered ?? 0),
    } satisfies Overview
  })

const timeseriesFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(range)
  .handler(({ data }) =>
    db.all<DailyPoint>(sql`
      SELECT
        substr(created_at, 1, 10) AS day,
        COUNT(CASE WHEN type = 'pageview' THEN 1 END) AS pageviews,
        COUNT(DISTINCT session_id) AS sessions
      FROM analytics_events
      WHERE created_at >= ${cutoff(data.days)} AND ${HUMAN}
      GROUP BY day
      ORDER BY day
    `),
  )

const topPagesFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(range)
  .handler(({ data }) =>
    db.all<PagePoint>(sql`
      SELECT path, COUNT(*) AS pageviews, COUNT(DISTINCT session_id) AS sessions
      FROM analytics_events
      WHERE type = 'pageview' AND created_at >= ${cutoff(data.days)} AND ${HUMAN}
      GROUP BY path
      ORDER BY pageviews DESC
      LIMIT 20
    `),
  )

const acquisitionFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(range)
  .handler(async ({ data }) => {
    const from = cutoff(data.days)
    const [channels, sources, campaigns] = await Promise.all([
      db.all<DimPoint>(sql`
        SELECT COALESCE(referrer_type, 'direct') AS value, COUNT(DISTINCT session_id) AS count
        FROM analytics_events
        WHERE type = 'pageview' AND created_at >= ${from} AND ${HUMAN}
          AND referrer_type != 'internal'
        GROUP BY value ORDER BY count DESC
      `),
      db.all<DimPoint>(sql`
        SELECT COALESCE(utm_source, referrer) AS value, COUNT(DISTINCT session_id) AS count
        FROM analytics_events
        WHERE type = 'pageview' AND created_at >= ${from} AND ${HUMAN}
          AND COALESCE(utm_source, referrer) IS NOT NULL
          AND referrer_type != 'internal'
        GROUP BY value ORDER BY count DESC LIMIT 15
      `),
      db.all<CampaignPoint>(sql`
        SELECT utm_campaign AS value, utm_source AS source, COUNT(DISTINCT session_id) AS count
        FROM analytics_events
        WHERE created_at >= ${from} AND ${HUMAN} AND utm_campaign IS NOT NULL
        GROUP BY value, source ORDER BY count DESC LIMIT 10
      `),
    ])
    return { channels, sources, campaigns }
  })

const audienceFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(range)
  .handler(async ({ data }) => {
    const from = cutoff(data.days)
    const [countries, devices, deviceSeries] = await Promise.all([
      db.all<DimPoint>(sql`
        SELECT COALESCE(country, 'unknown') AS value, COUNT(DISTINCT session_id) AS count
        FROM analytics_events
        WHERE created_at >= ${from} AND ${HUMAN}
        GROUP BY value ORDER BY count DESC LIMIT 15
      `),
      db.all<DimPoint>(sql`
        SELECT COALESCE(device, 'unknown') AS value, COUNT(DISTINCT session_id) AS count
        FROM analytics_events
        WHERE created_at >= ${from} AND ${HUMAN}
        GROUP BY value ORDER BY count DESC
      `),
      // Pivot en SQL: una fila por día con una columna por dispositivo, que es
      // lo que consume directamente el bar chart.
      db.all<DeviceDay>(sql`
        SELECT
          substr(created_at, 1, 10) AS day,
          COUNT(DISTINCT CASE WHEN device = 'desktop' THEN session_id END) AS desktop,
          COUNT(DISTINCT CASE WHEN device = 'mobile' THEN session_id END) AS mobile,
          COUNT(DISTINCT CASE WHEN device = 'tablet' THEN session_id END) AS tablet
        FROM analytics_events
        WHERE created_at >= ${from} AND ${HUMAN}
        GROUP BY day ORDER BY day
      `),
    ])
    return { countries, devices, deviceSeries }
  })

const conversionsFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(range)
  .handler(({ data }) =>
    db.all<ConversionPoint>(sql`
      SELECT conversion, COUNT(*) AS count, COUNT(DISTINCT session_id) AS sessions
      FROM analytics_events
      WHERE type = 'conversion' AND created_at >= ${cutoff(data.days)} AND ${HUMAN}
      GROUP BY conversion ORDER BY count DESC
    `),
  )

/**
 * Embudo: para cada sesión que convirtió, de dónde venía y por qué página
 * entró. Responde "de dónde salen los que se inscriben".
 */
const funnelFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator(range)
  .handler(({ data }) => {
    const from = cutoff(data.days)
    return db.all<{
      conversion: string
      referrer_type: string | null
      entry_path: string
      count: number
    }>(sql`
      WITH converted AS (
        SELECT DISTINCT session_id, conversion
        FROM analytics_events
        WHERE type = 'conversion' AND created_at >= ${from} AND ${HUMAN}
      ),
      entry AS (
        SELECT
          session_id, path, referrer_type,
          ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY created_at) AS rn
        FROM analytics_events
        WHERE type = 'pageview' AND created_at >= ${from} AND ${HUMAN}
      )
      SELECT
        c.conversion,
        e.referrer_type,
        e.path AS entry_path,
        COUNT(*) AS count
      FROM converted c
      JOIN entry e ON e.session_id = c.session_id AND e.rn = 1
      GROUP BY c.conversion, e.referrer_type, e.path
      ORDER BY count DESC
      LIMIT 25
    `)
  })

export const getOverview = (days: number) => overviewFn({ data: { days } })
export const getTimeseries = (days: number) => timeseriesFn({ data: { days } })
export const getTopPages = (days: number) => topPagesFn({ data: { days } })
export const getAcquisition = (days: number) => acquisitionFn({ data: { days } })
export const getAudience = (days: number) => audienceFn({ data: { days } })
export const getConversions = (days: number) => conversionsFn({ data: { days } })

export async function getFunnel(days: number): Promise<FunnelRow[]> {
  const rows = await funnelFn({ data: { days } })
  return rows.map((r) => ({
    conversion: r.conversion,
    referrerType: r.referrer_type ?? 'direct',
    entryPath: r.entry_path,
    count: Number(r.count),
  }))
}
