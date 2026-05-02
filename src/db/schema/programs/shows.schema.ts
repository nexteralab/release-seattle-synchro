import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// SHOWS — configuración principal (1 fila activa)
// ─────────────────────────────────────────────
export const showsConfig = sqliteTable('shows_config', {
  id:           text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Email o enlace de contacto directo para shows
  contactEmail: text('contact_email').notNull().default('info@seattlesynchro.com'),

  isActive:     integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:    text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ─────────────────────────────────────────────
// SHOWS — párrafos de descripción del servicio
// ─────────────────────────────────────────────
export const showsDescriptionParagraphs = sqliteTable('shows_description_paragraphs', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => showsConfig.id, { onDelete: 'cascade' }),

  content:    text('content').notNull(), // párrafo completo
  sortOrder:  integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// SHOWS — tipos de eventos que pueden contratar
// ─────────────────────────────────────────────
export const showsEventTypes = sqliteTable('shows_event_types', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => showsConfig.id, { onDelete: 'cascade' }),

  name:       text('name').notNull(),    // ej: 'Sports Events', 'Celebrations', 'Festivals'
  sortOrder:  integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────
export const showsConfigRelations = relations(showsConfig, ({ many }) => ({
  descriptionParagraphs: many(showsDescriptionParagraphs),
  eventTypes:            many(showsEventTypes),
}))

export const showsDescriptionParagraphsRelations = relations(showsDescriptionParagraphs, ({ one }) => ({
  config: one(showsConfig, { fields: [showsDescriptionParagraphs.configId], references: [showsConfig.id] }),
}))

export const showsEventTypesRelations = relations(showsEventTypes, ({ one }) => ({
  config: one(showsConfig, { fields: [showsEventTypes.configId], references: [showsConfig.id] }),
}))
