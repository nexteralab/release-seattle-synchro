import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// FREE TRY — configuración del evento (1 fila activa)
// ─────────────────────────────────────────────
export const freeTryConfig = sqliteTable('free_try_config', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

    // Información del evento
    eventDate: text('event_date').notNull(),          // ej: 'June 7th, 2026'
    eventTime: text('event_time').notNull(),          // ej: '11:30 am – 12:00 pm'
    ages: text('ages').notNull(),                // ej: '7 – 11 years old'

    // Seguridad — texto que aparece en la caja azul
    safetyNote: text('safety_note').notNull(),         // requisito de seguridad completo

    // Ubicación
    locationName: text('location_name').notNull(),       // ej: 'Newport Hills'
    locationAddress: text('location_address').notNull(),    // dirección completa
    locationImageUrl: text('location_image_url'),            // URL de imagen del lugar

    // CTA
    registrationUrl: text('registration_url'),              // URL para registro

    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ─────────────────────────────────────────────
// FREE TRY — lista de qué traer
// ─────────────────────────────────────────────
export const freeTryRequirements = sqliteTable('free_try_requirements', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    configId: text('config_id').notNull().references(() => freeTryConfig.id, { onDelete: 'cascade' }),

    name: text('name').notNull(),    // ej: 'Swim Cap'
    note: text('note'),              // nota opcional
    link: text('link'),              // URL opcional
    sortOrder: integer('sort_order').notNull().default(0),
})

// ─────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────
export const freeTryConfigRelations = relations(freeTryConfig, ({ many }) => ({
    requirements: many(freeTryRequirements),
}))

export const freeTryRequirementsRelations = relations(freeTryRequirements, ({ one }) => ({
    config: one(freeTryConfig, {
        fields: [freeTryRequirements.configId],
        references: [freeTryConfig.id],
    }),
}))