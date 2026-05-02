import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// COMPETITIVE — configuración principal (1 fila activa)
// ─────────────────────────────────────────────
export const competitiveConfig = sqliteTable('competitive_config', {
  id:               text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Nota al pie que aplica a todos los grupos
  commitmentNote:   text('commitment_note').notNull(), // ej: 'All Age Group programs are year-round commitments'

  isActive:         integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:        text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ─────────────────────────────────────────────
// COMPETITIVE — párrafos del overview general
// ─────────────────────────────────────────────
export const competitiveOverviewParagraphs = sqliteTable('competitive_overview_paragraphs', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => competitiveConfig.id, { onDelete: 'cascade' }),

  content:    text('content').notNull(), // párrafo completo de texto
  sortOrder:  integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// COMPETITIVE — grupos de edad (12U, 13-15, Junior, Senior)
// ─────────────────────────────────────────────
export const competitiveAgeGroups = sqliteTable('competitive_age_groups', {
  id:           text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:     text('config_id').notNull().references(() => competitiveConfig.id, { onDelete: 'cascade' }),

  slug:         text('slug').notNull(),         // ej: '12u' | '13-15' | 'junior' | 'senior'
  name:         text('name').notNull(),          // ej: '12 & Under Age Group'
  description:  text('description'),            // descripción larga (opcional, para Junior/Senior)
  coaches:      text('coaches').notNull(),       // ej: 'Maria Romero & Daniela Garmendia'
  workoutDays:  text('workout_days').notNull(),  // ej: 'Monday, Wednesday & Saturday morning'
  sortOrder:    integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// COMPETITIVE — highlights por grupo de edad (bullets verdes en Junior)
// ─────────────────────────────────────────────
export const competitiveAgeGroupHighlights = sqliteTable('competitive_age_group_highlights', {
  id:           text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  ageGroupId:   text('age_group_id').notNull().references(() => competitiveAgeGroups.id, { onDelete: 'cascade' }),

  text:         text('text').notNull(),          // ej: '11 months of training per year'
  sortOrder:    integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────
export const competitiveConfigRelations = relations(competitiveConfig, ({ many }) => ({
  overviewParagraphs: many(competitiveOverviewParagraphs),
  ageGroups:          many(competitiveAgeGroups),
}))

export const competitiveOverviewParagraphsRelations = relations(competitiveOverviewParagraphs, ({ one }) => ({
  config: one(competitiveConfig, {
    fields: [competitiveOverviewParagraphs.configId],
    references: [competitiveConfig.id],
  }),
}))

export const competitiveAgeGroupsRelations = relations(competitiveAgeGroups, ({ one, many }) => ({
  config:     one(competitiveConfig, {
    fields: [competitiveAgeGroups.configId],
    references: [competitiveConfig.id],
  }),
  highlights: many(competitiveAgeGroupHighlights),
}))

export const competitiveAgeGroupHighlightsRelations = relations(competitiveAgeGroupHighlights, ({ one }) => ({
  ageGroup: one(competitiveAgeGroups, {
    fields: [competitiveAgeGroupHighlights.ageGroupId],
    references: [competitiveAgeGroups.id],
  }),
}))
