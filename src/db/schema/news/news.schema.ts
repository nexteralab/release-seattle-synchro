import {
  pgTable, uuid, text, boolean, timestamp, integer,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// NEWS — noticias del equipo Seattle Synchro
// ─────────────────────────────────────────────
export const news = pgTable('news', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),

  // Contenido principal
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),        // URL: /news/titulo-de-noticia
  excerpt: text('excerpt').notNull().default(''), // resumen corto (también meta description por defecto)
  content: text('content').notNull().default(''), // markdown del editor

  // Media
  cover_url: text('cover_url'),                   // imagen de portada (og:image)

  // Categoría
  category: text('category'),                     // ej: "competition", "announcement", "event", "award"

  // Autoría
  author: text('author').notNull().default(''),
  user_id: uuid('user_id'),                       // referencia a auth.users (nullable para flexibilidad)

  // Taxonomía / SEO
  tags: text('tags').array().notNull().default(sql`'{}'`),
  meta_title: text('meta_title'),
  meta_description: text('meta_description'),

  // Lectura
  read_time_minutes: integer('read_time_minutes'), // calculado al guardar

  // Estado
  published: boolean('published').notNull().default(false),
  published_at: timestamp('published_at', { withTimezone: true }),

  // Timestamps
  created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
  updated_at: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`now()`),
})

export type News = typeof news.$inferSelect
export type NewsInsert = typeof news.$inferInsert
export type NewsUpdate = Partial<NewsInsert>
