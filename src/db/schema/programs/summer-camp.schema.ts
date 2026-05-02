import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// SUMMER CAMP — configuración principal (1 fila activa)
// ─────────────────────────────────────────────
export const summerCampConfig = sqliteTable('summer_camp_config', {
  id:             text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Detalles del programa
  ages:           text('ages').notNull(),          // ej: '6–11 years old'
  skillLevel:     text('skill_level').notNull(),   // requisito de natación para inscribirse
  dailySchedule:  text('daily_schedule').notNull(),// ej: '9:00 AM – 11:00 AM'

  // Precio
  pricePerWeek:   text('price_per_week').notNull(),// ej: '$450 per week'
  priceNote:      text('price_note'),              // nota opcional sobre el precio

  isActive:       integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:      text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ─────────────────────────────────────────────
// SUMMER CAMP — ubicaciones (varias por edición)
// ─────────────────────────────────────────────
export const summerCampLocations = sqliteTable('summer_camp_locations', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => summerCampConfig.id, { onDelete: 'cascade' }),

  name:       text('name').notNull(),    // ej: 'July in Bellevue (Newport Hills)'
  dates:      text('dates').notNull(),   // ej: 'July 27 – July 31, 2026'
  address:    text('address').notNull(), // dirección completa (permite saltos de línea)
  sortOrder:  integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// SUMMER CAMP — lista de qué traer (requisitos)
// ─────────────────────────────────────────────
export const summerCampRequirements = sqliteTable('summer_camp_requirements', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => summerCampConfig.id, { onDelete: 'cascade' }),

  name:       text('name').notNull(),    // ej: 'Swim Suit'
  note:       text('note'),              // ej: 'Recommendations'
  link:       text('link'),              // URL opcional (Amazon, etc.)
  sortOrder:  integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────
export const summerCampConfigRelations = relations(summerCampConfig, ({ many }) => ({
  locations:    many(summerCampLocations),
  requirements: many(summerCampRequirements),
}))

export const summerCampLocationsRelations = relations(summerCampLocations, ({ one }) => ({
  config: one(summerCampConfig, {
    fields: [summerCampLocations.configId],
    references: [summerCampConfig.id],
  }),
}))

export const summerCampRequirementsRelations = relations(summerCampRequirements, ({ one }) => ({
  config: one(summerCampConfig, {
    fields: [summerCampRequirements.configId],
    references: [summerCampConfig.id],
  }),
}))
