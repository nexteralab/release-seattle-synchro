// One-shot: trae post_analytics de Supabase a la tabla analytics_events de D1.
//
// Uso:  SUPABASE_SERVICE_KEY=<service_role> node scripts/migrate-analytics.mjs
// Luego: npx wrangler d1 execute seattle-synchro-db --remote --file=scripts/analytics-seed.sql
//
// Hace falta la service_role key: la política RLS de post_analytics solo deja
// leer a `authenticated`, así que con la clave anon salen 0 filas siempre.
//
// ponytail: script desechable. Borrar cuando la migración esté hecha.
import { writeFileSync } from 'node:fs'

const URL_BASE = 'https://hfyxcakixklryajpnszd.supabase.co/rest/v1'
const KEY = process.env.SUPABASE_SERVICE_KEY
if (!KEY) throw new Error('Falta SUPABASE_SERVICE_KEY (Supabase → Settings → API → service_role)')

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` }

const get = async (path) => {
  const r = await fetch(`${URL_BASE}/${path}`, { headers })
  if (!r.ok) throw new Error(`${path}: ${r.status} ${await r.text()}`)
  return r.json()
}

const lit = (v) => {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'boolean') return v ? '1' : '0'
  if (typeof v === 'number') return String(v)
  return `'${String(v).replaceAll("'", "''")}'`
}

// Mismas reglas que classifyReferrer en src/features/analytics/track.service.ts
const SEARCH = /google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.|brave\.|baidu\.|yandex\./i
const SOCIAL = /facebook\.|instagram\.|twitter\.|x\.com|t\.co|linkedin\.|youtube\.|tiktok\.|reddit\.|pinterest\.|whatsapp\./i
const SITE_HOST = 'seattlesynchro.com'

function classifyReferrer(referrer) {
  if (!referrer) return 'direct'
  let host
  try { host = new URL(referrer).hostname } catch { return 'referral' }
  if (host === SITE_HOST || host.endsWith(`.${SITE_HOST}`)) return 'internal'
  if (SEARCH.test(host)) return 'organic'
  if (SOCIAL.test(host)) return 'social'
  return 'referral'
}

// El esquema viejo no guardaba `path`: se reconstruye desde el slug del post.
const EVENT_TYPE = {
  view: 'pageview',
  scroll_depth: 'scroll',
  read_complete: 'read_complete',
  exit: 'exit',
}

const [events, posts, news] = await Promise.all([
  get('post_analytics?select=*&order=created_at.asc'),
  get('posts?select=id,slug'),
  get('news?select=id,slug'),
])

console.error(`post_analytics: ${events.length} filas`)
if (!events.length) {
  console.error('Nada que migrar.')
  process.exit(0)
}

const slugs = new Map([
  ...posts.map((p) => [p.id, `/team/blog/${p.slug}`]),
  ...news.map((n) => [n.id, `/team/news/${n.slug}`]),
])

// `is_new_visitor` no existía. Se marca solo el primer evento de cada visitante
// (los eventos vienen ordenados por fecha) para no inflar ninguna de las dos
// mitades del desglose nuevo/recurrente.
const seenVisitors = new Set()

const COLS = [
  'id', 'type', 'path', 'post_id', 'post_type', 'session_id', 'visitor_id',
  'is_new_visitor', 'scroll_pct', 'time_spent', 'referrer', 'referrer_type',
  'device', 'is_bot', 'created_at',
]

const rows = events.map((e) => {
  const key = e.visitor_id ?? e.session_id
  const isNew = !seenVisitors.has(key)
  seenVisitors.add(key)

  return [
    e.id,
    EVENT_TYPE[e.event_type] ?? 'pageview',
    slugs.get(e.post_id) ?? `/team/${e.post_type === 'news' ? 'news' : 'blog'}/${e.post_id}`,
    e.post_id,
    e.post_type,
    e.session_id,
    e.visitor_id,
    isNew,
    e.scroll_pct,
    e.time_spent,
    e.referrer,
    classifyReferrer(e.referrer),
    e.device,
    false, // no había detección de bots: se importan como humanos
    e.created_at,
  ]
})

const out = [
  '-- Generado por scripts/migrate-analytics.mjs',
  '-- Solo borra lo importado antes (mismos ids), no lo que se haya recogido ya.',
  ...rows.map(
    (r) =>
      `INSERT OR REPLACE INTO \`analytics_events\` (${COLS.map((c) => `\`${c}\``).join(', ')}) ` +
      `VALUES (${r.map(lit).join(', ')});`,
  ),
]

writeFileSync('scripts/analytics-seed.sql', out.join('\n') + '\n')

const byType = rows.reduce((acc, r) => ((acc[r[1]] = (acc[r[1]] ?? 0) + 1), acc), {})
console.error('por tipo:', byType)
console.error(`visitantes distintos: ${seenVisitors.size}`)
console.error(`\n→ scripts/analytics-seed.sql (${rows.length} inserts)`)
