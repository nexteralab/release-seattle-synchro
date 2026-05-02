import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// RECREATIONAL — tiene dos subprogramas: Sharks & Mermaids y Dolphins
// ─────────────────────────────────────────────

// ─── OVERVIEW GENERAL ─────────────────────────
export const recreationalOverview = sqliteTable('recreational_overview', {
  id:           text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Párrafo intro de la página (sección de overview)
  introText:    text('intro_text').notNull(),   // descripción general del programa recreational

  isActive:     integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:    text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ─── SHARKS & MERMAIDS ────────────────────────
export const recreationalSeaStarConfig = sqliteTable('recreational_sea_star_config', {
  id:                 text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  programName:        text('program_name').notNull().default('Sharks & Mermaids'),

  // Descripción del programa (dos párrafos)
  descriptionPrimary: text('description_primary').notNull(), // párrafo principal del programa
  descriptionSafety:  text('description_safety').notNull(),  // párrafo sobre requisito de seguridad

  // Detalles del programa
  ages:               text('ages').notNull(),                // ej: '5–10'
  coaches:            text('coaches').notNull(),             // ej: 'Sophie Lin & Daniela Garmendia'
  workoutDaysTimes:   text('workout_days_times').notNull(),  // ej: 'Saturdays 11:00am – 11:50am'
  workoutNote:        text('workout_note'),                  // ej: 'No class May 15th. Last class June 5th.'

  // Costo
  costMain:           text('cost_main').notNull(),           // ej: '$50 registration + $60 March dues'
  costNote:           text('cost_note'),                     // ej: 'Pool fees ~$280 paid to booster club'

  isActive:           integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:          text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// Habilidades de natación requeridas para Sharks & Mermaids
export const recreationalSeaStarSwimmingSkills = sqliteTable('recreational_sea_star_swimming_skills', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => recreationalSeaStarConfig.id, { onDelete: 'cascade' }),

  skill:      text('skill').notNull(),  // ej: '2 laps of crawl'
  sortOrder:  integer('sort_order').notNull().default(0),
})

// Lista de oportunidades únicas (checkmarks verdes)
export const recreationalSeaStarOpportunities = sqliteTable('recreational_sea_star_opportunities', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => recreationalSeaStarConfig.id, { onDelete: 'cascade' }),

  text:       text('text').notNull(),   // ej: 'Performance opportunity'
  sortOrder:  integer('sort_order').notNull().default(0),
})

// ─── DOLPHINS ─────────────────────────────────
export const recreationalDolphinsConfig = sqliteTable('recreational_dolphins_config', {
  id:                   text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Descripción (dos párrafos)
  descriptionPrimary:   text('description_primary').notNull(), // párrafo principal
  descriptionProgram:   text('description_program').notNull(), // párrafo sobre el formato del programa

  // Detalles del programa
  ages:                 text('ages').notNull(),                // ej: '6–12'
  coaches:              text('coaches').notNull(),             // ej: 'TBD'
  workoutDaysTimes:     text('workout_days_times').notNull(),  // ej: 'Not available - TBD'

  // Información de sesión
  sessionDuration:      text('session_duration').notNull(),    // ej: '8-week session'
  cost:                 text('cost').notNull(),                 // ej: '$150 + $15 registration fee'

  isActive:             integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:            text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ─────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────
export const recreationalSeaStarConfigRelations = relations(recreationalSeaStarConfig, ({ many }) => ({
  swimmingSkills: many(recreationalSeaStarSwimmingSkills),
  opportunities:  many(recreationalSeaStarOpportunities),
}))

export const recreationalSeaStarSwimmingSkillsRelations = relations(recreationalSeaStarSwimmingSkills, ({ one }) => ({
  config: one(recreationalSeaStarConfig, { fields: [recreationalSeaStarSwimmingSkills.configId], references: [recreationalSeaStarConfig.id] }),
}))

export const recreationalSeaStarOpportunitiesRelations = relations(recreationalSeaStarOpportunities, ({ one }) => ({
  config: one(recreationalSeaStarConfig, { fields: [recreationalSeaStarOpportunities.configId], references: [recreationalSeaStarConfig.id] }),
}))
