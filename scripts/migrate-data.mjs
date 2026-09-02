// One-shot: baja las filas de Supabase y escribe scripts/seed.sql para D1.
// Uso: node scripts/migrate-data.mjs > /dev/null && wrangler d1 execute seattle-synchro-db --remote --file=scripts/seed.sql
// ponytail: script desechable, sin deps. Borrar cuando la migración esté hecha.
import { writeFileSync } from 'node:fs'

const URL_BASE = 'https://hfyxcakixklryajpnszd.supabase.co/rest/v1'
const KEY = 'sb_publishable_cvhspBXyNwefAaSNSon2qA_BsoxOuhi'

const get = async (table) => {
  const r = await fetch(`${URL_BASE}/${table}?select=*`, { headers: { apikey: KEY } })
  if (!r.ok) throw new Error(`${table}: ${r.status} ${await r.text()}`)
  return r.json()
}

const lit = (v) => {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'boolean') return v ? '1' : '0'
  if (typeof v === 'number') return String(v)
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v)
  return `'${s.replaceAll("'", "''")}'`
}

const insert = (table, cols, rows) =>
  rows.map((r) => `INSERT INTO \`${table}\` (${cols.map((c) => `\`${c}\``).join(', ')}) VALUES (${cols.map((c) => lit(r[c])).join(', ')});`)

// Tablas 1:1 (mismos nombres de columna en ambos lados)
const TABLES = {
  posts: ['id', 'title', 'slug', 'excerpt', 'content', 'cover_url', 'author', 'user_id', 'tags', 'meta_title', 'meta_description', 'read_time_minutes', 'published', 'published_at', 'created_at', 'updated_at'],
  news: ['id', 'title', 'slug', 'excerpt', 'content', 'cover_url', 'category', 'author', 'user_id', 'tags', 'meta_title', 'meta_description', 'read_time_minutes', 'published', 'published_at', 'created_at', 'updated_at'],
  coaches: ['id', 'name', 'title', 'email', 'bio', 'specialties', 'certifications', 'image_url', 'active', 'sort_order', 'created_at', 'updated_at'],
  subscriptions: ['id', 'email', 'source', 'status', 'unsubscribed_at', 'created_at'],
  post_analytics: ['id', 'post_id', 'post_type', 'event_type', 'session_id', 'visitor_id', 'scroll_pct', 'time_spent', 'referrer', 'device', 'created_at'],
}

// Las 7 tablas *_config de 1 fila → tabla `config` (key, value json)
const CONFIGS = {
  beginner: 'beginner_config',
  competitive: 'competitive_config',
  'elite-clinic': 'elite_clinic_config',
  'free-try': 'free_try_config',
  recreational: 'recreational_config',
  'summer-camp': 'summer_camp',
  'try-out': 'try_out_config',
}

const out = ['-- Generado por scripts/migrate-data.mjs', 'PRAGMA defer_foreign_keys = true;']

for (const [table, cols] of Object.entries(TABLES)) {
  const rows = await get(table).catch((e) => (console.error(`skip ${table}:`, e.message), []))
  console.error(`${table}: ${rows.length} filas`)
  out.push(`DELETE FROM \`${table}\`;`, ...insert(table, cols, rows))
}

out.push('DELETE FROM `config`;')
for (const [key, table] of Object.entries(CONFIGS)) {
  const [row] = await get(table).catch((e) => (console.error(`skip ${table}:`, e.message), []))
  if (!row) { console.error(`${table}: vacía, se omite`); continue }
  const { id, created_at, updated_at, ...value } = row
  console.error(`config/${key}: ${Object.keys(value).join(',')}`)
  out.push(`INSERT INTO \`config\` (\`key\`, \`value\`, \`updated_at\`) VALUES (${lit(key)}, ${lit(value)}, ${lit(updated_at ?? new Date().toISOString())});`)
}

writeFileSync('scripts/seed.sql', out.join('\n') + '\n')
console.error(`\n→ scripts/seed.sql (${out.length - 2} statements)`)
