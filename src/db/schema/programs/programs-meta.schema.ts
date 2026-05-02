import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMS SEO METADATA
//
// Una fila por página de programa. Se consume en createFileRoute({ head }) para
// inyectar <title>, <meta description>, og:tags y el JSON-LD de schema.org.
//
// Slugs disponibles:
//   'summer-camp' | 'free-try-2026' | 'competitive' |
//   'beginner'    | 'recreational'  | 'shows'
// ─────────────────────────────────────────────────────────────────────────────
export const programsSeo = sqliteTable('programs_seo', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

    // Identificador único de la página — coincide con el path de la ruta
    programSlug: text('program_slug').notNull().unique(), // ej: 'summer-camp'

    // ── SEO básico ──────────────────────────────────────────────────────────
    metaTitle: text('meta_title').notNull(),
    // Aparece en <title> y en las SERPs. Máximo 60 caracteres recomendado.
    // Ej: 'Summer Camp 2026 | Seattle Synchro'

    metaDescription: text('meta_description').notNull(),
    // Aparece en <meta name="description">. Máximo 160 caracteres.
    // Ej: 'Join our 2026 Summer Camp in Bellevue. Fun artistic swimming for kids 6–11.'

    focusKeyword: text('focus_keyword').notNull(),
    // Keyword principal para la que se quiere rankear.
    // Ej: 'artistic swimming summer camp Seattle'

    keywords: text('keywords'),
    // Keywords secundarias separadas por coma.
    // Ej: 'synchro camp, kids swimming camp Bellevue, artistic swimming kids'

    canonicalUrl: text('canonical_url'),
    // URL canónica completa. Previene duplicate content.
    // Ej: 'https://seattlesynchro.com/programs/summer-camp'

    robots: text('robots').notNull().default('index, follow'),
    // Directiva para crawlers. Valores: 'index, follow' | 'noindex, nofollow'
    // Free Try puede ser 'noindex' una vez que el evento pase.

    // ── Open Graph (Facebook, LinkedIn, WhatsApp) ───────────────────────────
    ogTitle: text('og_title'),
    // Si es null se usa metaTitle. Ej: 'Free Try 2026 — Come Try Artistic Swimming!'

    ogDescription: text('og_description'),
    // Si es null se usa metaDescription.

    ogImageUrl: text('og_image_url'),
    // URL absoluta de la imagen de preview social. Tamaño recomendado: 1200×630.

    ogType: text('og_type').notNull().default('website'),
    // 'website' | 'article'. Los eventos pueden usar 'website'.

    // ── Twitter / X Card ────────────────────────────────────────────────────
    twitterCard: text('twitter_card').notNull().default('summary_large_image'),
    // 'summary' | 'summary_large_image'

    twitterTitle: text('twitter_title'),
    // Si es null se usa ogTitle o metaTitle.

    twitterDescription: text('twitter_description'),
    // Si es null se usa ogDescription o metaDescription.

    // ── JSON-LD Schema.org ───────────────────────────────────────────────────
    schemaType: text('schema_type').notNull().default('SportsOrganization'),
    // Tipo principal del schema. Valores usados en este sitio:
    //   'SportsOrganization' — para páginas de programa general
    //   'Event'              — para Free Try (evento con fecha)
    //   'Course'             — para Summer Camp (programa educativo)

    schemaJson: text('schema_json'),
    // JSON-LD completo como texto. Se inyecta en <script type="application/ld+json">.
    // Si es null, se genera automáticamente desde schemaType + datos del programa.

    // ── Auditoría ────────────────────────────────────────────────────────────
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    createdBy: text('created_by').notNull(),          // nombre o email del admin
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
    updatedBy: text('updated_by').notNull(),          // nombre o email del admin
    version: integer('version').notNull().default(1),
    // Incrementa +1 en cada guardado. Útil para caché busting.
})

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAM EDIT LOG
//
// Historial inmutable de cada cambio realizado en CUALQUIER tabla de programa.
// El admin escribe aquí en cada save. Nunca se borran filas.
// ─────────────────────────────────────────────────────────────────────────────
export const programEditLog = sqliteTable('program_edit_log', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

    // Qué programa fue editado
    programSlug: text('program_slug').notNull(),          // ej: 'summer-camp'

    // Qué tabla y registro específico fue modificado
    tableName: text('table_name').notNull(),            // ej: 'summer_camp_config'
    recordId: text('record_id').notNull(),             // UUID del registro modificado

    // Tipo de operación
    action: text('action', {
        enum: ['create', 'update', 'delete'],
    }).notNull(),

    // Snapshot del cambio — JSON con los campos antes y después
    previousValues: text('previous_values'),                 // JSON | null (null en 'create')
    newValues: text('new_values'),                      // JSON | null (null en 'delete')

    // Quién y cuándo
    editedBy: text('edited_by').notNull(),             // nombre o email del admin
    editedAt: text('edited_at').notNull().default(sql`(datetime('now'))`),

    // Contexto adicional
    notes: text('notes'),                           // nota opcional del admin sobre el cambio
    ipAddress: text('ip_address'),                      // IP del admin (para auditoría de seguridad)
    userAgent: text('user_agent'),                      // navegador/dispositivo del admin
})

// ─────────────────────────────────────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const programsSeoRelations = relations(programsSeo, ({ many }) => ({
    editLog: many(programEditLog),
}))