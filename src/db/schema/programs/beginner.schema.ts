import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// BEGINNER — tiene dos niveles: Novice e Intermediate
// Cada nivel tiene su propia tabla de config
// ─────────────────────────────────────────────

// ─── NOVICE ───────────────────────────────────
export const beginnerNoviceConfig = sqliteTable('beginner_novice_config', {
  id:                       text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Detalles del programa
  ages:                     text('ages').notNull(),                    // ej: '5–10'
  coaches:                  text('coaches').notNull(),                 // lista separada por comas o saltos
  workoutDays:              text('workout_days').notNull(),            // ej: 'Wednesday and Fridays'
  workoutTimes:             text('workout_times').notNull(),           // ej: '5:00–7:00pm'
  locationName:             text('location_name').notNull(),           // ej: 'Bellevue Aquatic Center'
  locationNote:             text('location_note'),                     // nota extra del lugar (clima, wetsuit, etc.)

  // Descripción del nivel
  description:              text('description').notNull(),             // párrafo principal que describe Novice

  // Información de sesión
  costMonthly:              text('cost_monthly').notNull(),            // ej: '$TBD monthly fee'
  costRegistration:         text('cost_registration'),                 // ej: 'One time registration fee'
  costBooster:              text('cost_booster'),                      // ej: 'Three quarterly pledges (~$250)'
  costOutfitting:           text('cost_outfitting'),                   // ej: 'Outfitting costs during season'
  registrationInfo:         text('registration_info'),                 // ej: 'Registration opens first week of September'

  // Primera práctica
  firstPracticeDate:        text('first_practice_date'),               // ej: 'Wednesday, September 3rd'
  firstPracticeTime:        text('first_practice_time'),               // ej: '6:00pm – 7:30pm'
  firstPracticeLocation:    text('first_practice_location'),           // ej: 'Bellevue Aquatic Center'
  firstPracticeAddress:     text('first_practice_address'),            // dirección completa
  firstPracticeWhatToExpect: text('first_practice_what_to_expect'),   // descripción larga del qué esperar

  // Nota de alerta (caja amarilla)
  scheduleNote:             text('schedule_note'),                     // ej: 'Schedule might change...'

  isActive:                 integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:                text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// Fechas de sesión del Novice (múltiples filas)
export const beginnerNoviceSessionDates = sqliteTable('beginner_novice_session_dates', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => beginnerNoviceConfig.id, { onDelete: 'cascade' }),

  dateLabel:  text('date_label').notNull(), // ej: 'March 28th', 'April 4th, 11th, 18th, 25th'
  sortOrder:  integer('sort_order').notNull().default(0),
})

// Qué traer a la primera práctica
export const beginnerNoviceFirstPracticeItems = sqliteTable('beginner_novice_first_practice_items', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => beginnerNoviceConfig.id, { onDelete: 'cascade' }),

  item:       text('item').notNull(),   // ej: 'Swim cap & goggles'
  sortOrder:  integer('sort_order').notNull().default(0),
})

// Requisitos de natación para tryouts
export const beginnerNoviceSwimmingSkills = sqliteTable('beginner_novice_swimming_skills', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => beginnerNoviceConfig.id, { onDelete: 'cascade' }),

  skill:      text('skill').notNull(),  // ej: '4 laps of crawl'
  sortOrder:  integer('sort_order').notNull().default(0),
})

// Cualidades personales para tryouts
export const beginnerNovicePersonalQualities = sqliteTable('beginner_novice_personal_qualities', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  configId:   text('config_id').notNull().references(() => beginnerNoviceConfig.id, { onDelete: 'cascade' }),

  quality:    text('quality').notNull(), // ej: 'Coachability — openness to feedback...'
  sortOrder:  integer('sort_order').notNull().default(0),
})

// ─── INTERMEDIATE ─────────────────────────────
export const beginnerIntermediateConfig = sqliteTable('beginner_intermediate_config', {
  id:               text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // Descripción del nivel
  description:      text('description').notNull(),       // párrafo principal que describe Intermediate

  // Detalles del programa
  ages:             text('ages').notNull(),               // ej: '7-12 years old'
  coaches:          text('coaches').notNull(),            // lista de coaches
  workoutDays:      text('workout_days').notNull(),       // ej: 'Mondays 7:00-9:00pm\nFridays 5:00-7:00pm'
  locationName:     text('location_name').notNull(),      // ej: 'Bellevue Aquatic Center'
  locationNote:     text('location_note'),                // nota extra del lugar

  // Información de sesión
  sessionDates:     text('session_dates').notNull(),      // texto libre con las fechas (multiline)
  costMonthly:      text('cost_monthly').notNull(),       // ej: '$265 Per Month'
  costRegistration: text('cost_registration'),            // ej: '$275 registration fee'
  costExtra:        text('cost_extra'),                   // ej: 'outfitting & traveling costs'

  isActive:         integer('is_active', { mode: 'boolean' }).notNull().default(true),
  updatedAt:        text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ─────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────
export const beginnerNoviceConfigRelations = relations(beginnerNoviceConfig, ({ many }) => ({
  sessionDates:       many(beginnerNoviceSessionDates),
  firstPracticeItems: many(beginnerNoviceFirstPracticeItems),
  swimmingSkills:     many(beginnerNoviceSwimmingSkills),
  personalQualities:  many(beginnerNovicePersonalQualities),
}))

export const beginnerNoviceSessionDatesRelations = relations(beginnerNoviceSessionDates, ({ one }) => ({
  config: one(beginnerNoviceConfig, { fields: [beginnerNoviceSessionDates.configId], references: [beginnerNoviceConfig.id] }),
}))

export const beginnerNoviceFirstPracticeItemsRelations = relations(beginnerNoviceFirstPracticeItems, ({ one }) => ({
  config: one(beginnerNoviceConfig, { fields: [beginnerNoviceFirstPracticeItems.configId], references: [beginnerNoviceConfig.id] }),
}))

export const beginnerNoviceSwimmingSkillsRelations = relations(beginnerNoviceSwimmingSkills, ({ one }) => ({
  config: one(beginnerNoviceConfig, { fields: [beginnerNoviceSwimmingSkills.configId], references: [beginnerNoviceConfig.id] }),
}))

export const beginnerNovicePersonalQualitiesRelations = relations(beginnerNovicePersonalQualities, ({ one }) => ({
  config: one(beginnerNoviceConfig, { fields: [beginnerNovicePersonalQualities.configId], references: [beginnerNoviceConfig.id] }),
}))
