import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core'

// ponytail: un solo archivo para 6 tablas pequeñas. Los timestamps son TEXT ISO
// (no epoch) para que los servicios los sigan tratando como `string` sin capa de
// conversión — es lo que ya devolvía Supabase.
const uuid = () => text('id').primaryKey().$defaultFn(() => crypto.randomUUID())
const now = () => new Date().toISOString()

// ─────────────────────────────────────────────
// POSTS — blog posts indexados para SEO
// ─────────────────────────────────────────────
export const posts = sqliteTable('posts', {
  id: uuid(),

  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull().default(''),
  content: text('content').notNull().default(''),

  cover_url: text('cover_url'),

  author: text('author').notNull().default(''),
  user_id: text('user_id'),

  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull().default([]),
  meta_title: text('meta_title'),
  meta_description: text('meta_description'),

  read_time_minutes: integer('read_time_minutes'),

  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  published_at: text('published_at'),

  created_at: text('created_at').notNull().$defaultFn(now),
  updated_at: text('updated_at').notNull().$defaultFn(now),
}, (t) => [index('posts_published_idx').on(t.published, t.published_at)])

export type Post = typeof posts.$inferSelect
export type PostInsert = typeof posts.$inferInsert
export type PostUpdate = Partial<PostInsert>

// ─────────────────────────────────────────────
// NEWS — noticias del equipo
// ─────────────────────────────────────────────
export const news = sqliteTable('news', {
  id: uuid(),

  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull().default(''),
  content: text('content').notNull().default(''),

  cover_url: text('cover_url'),
  category: text('category'),

  author: text('author').notNull().default(''),
  user_id: text('user_id'),

  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull().default([]),
  meta_title: text('meta_title'),
  meta_description: text('meta_description'),

  read_time_minutes: integer('read_time_minutes'),

  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  published_at: text('published_at'),

  created_at: text('created_at').notNull().$defaultFn(now),
  updated_at: text('updated_at').notNull().$defaultFn(now),
}, (t) => [index('news_published_idx').on(t.published, t.published_at)])

export type News = typeof news.$inferSelect
export type NewsInsert = typeof news.$inferInsert
export type NewsUpdate = Partial<NewsInsert>

// ─────────────────────────────────────────────
// COACHES
// ─────────────────────────────────────────────
export const coaches = sqliteTable('coaches', {
  id: uuid(),

  name: text('name').notNull(),
  title: text('title').notNull().default(''),
  email: text('email'),
  bio: text('bio').notNull().default(''),

  specialties: text('specialties', { mode: 'json' }).$type<string[]>().notNull().default([]),
  certifications: text('certifications', { mode: 'json' }).$type<string[]>().notNull().default([]),

  image_url: text('image_url'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  sort_order: integer('sort_order').notNull().default(0),

  created_at: text('created_at').notNull().$defaultFn(now),
  updated_at: text('updated_at').notNull().$defaultFn(now),
})

export type Coach = typeof coaches.$inferSelect
export type CoachInsert = typeof coaches.$inferInsert
export type CoachUpdate = Partial<CoachInsert>

// ─────────────────────────────────────────────
// SUBSCRIPTIONS — newsletter segmentada por source
// ─────────────────────────────────────────────
export const subscriptions = sqliteTable('subscriptions', {
  id: uuid(),

  email: text('email').notNull(),
  source: text('source').$type<'blog' | 'news' | 'general'>().notNull().default('general'),
  status: text('status').$type<'active' | 'unsubscribed'>().notNull().default('active'),

  unsubscribed_at: text('unsubscribed_at'),
  created_at: text('created_at').notNull().$defaultFn(now),
}, (t) => [uniqueIndex('subscriptions_email_source_idx').on(t.email, t.source)])

export type Subscription = typeof subscriptions.$inferSelect
export type SubscriptionInsert = typeof subscriptions.$inferInsert

// ─────────────────────────────────────────────
// ANALYTICS_EVENTS — eventos crudos de TODO el sitio.
// Una sola tabla: de aquí salen todos los informes. Sustituye a la vieja
// `post_analytics`, que solo cubría blog y news.
//
// ponytail: fila por evento. A este volumen sobra; si el dashboard se pone
// lento, el paso siguiente es un rollup diario por cron, no más índices.
// ─────────────────────────────────────────────
export const analyticsEvents = sqliteTable('analytics_events', {
  id: uuid(),

  type: text('type')
    .$type<'pageview' | 'scroll' | 'read_complete' | 'exit' | 'conversion'>()
    .notNull(),

  // Dónde ocurrió
  path: text('path').notNull(),
  post_id: text('post_id'),
  post_type: text('post_type').$type<'blog' | 'news'>(),

  // Quién
  session_id: text('session_id').notNull(),
  visitor_id: text('visitor_id'),
  is_new_visitor: integer('is_new_visitor', { mode: 'boolean' }).notNull().default(true),

  // Engagement
  scroll_pct: integer('scroll_pct'),
  time_spent: integer('time_spent'),

  // Adquisición
  referrer: text('referrer'),
  referrer_type: text('referrer_type')
    .$type<'direct' | 'organic' | 'social' | 'referral' | 'internal'>(),
  utm_source: text('utm_source'),
  utm_medium: text('utm_medium'),
  utm_campaign: text('utm_campaign'),

  // Contexto — country y is_bot los rellena el servidor desde request.cf
  device: text('device').$type<'mobile' | 'tablet' | 'desktop'>(),
  country: text('country'),
  is_bot: integer('is_bot', { mode: 'boolean' }).notNull().default(false),

  // Conversión: 'contact' | 'subscribe' | 'register_click'
  conversion: text('conversion'),

  created_at: text('created_at').notNull().$defaultFn(now),
}, (t) => [
  index('ae_created_idx').on(t.created_at),
  index('ae_type_created_idx').on(t.type, t.created_at),
  index('ae_path_created_idx').on(t.path, t.created_at),
  index('ae_session_idx').on(t.session_id),
  index('ae_post_idx').on(t.post_id, t.created_at),
])

export type AnalyticsEventRow = typeof analyticsEvents.$inferSelect
export type AnalyticsEventInsert = typeof analyticsEvents.$inferInsert


// ─────────────────────────────────────────────
// CONFIG — reemplaza las 7 tablas *_config de 1 fila.
// key: 'recreational' | 'beginner' | 'competitive' | 'elite-clinic'
//    | 'free-try' | 'summer-camp' | 'try-out'
// ─────────────────────────────────────────────
export const config = sqliteTable('config', {
  key: text('key').primaryKey(),
  value: text('value', { mode: 'json' }).notNull(),
  updated_at: text('updated_at').notNull().$defaultFn(now),
})

export type Config = typeof config.$inferSelect
