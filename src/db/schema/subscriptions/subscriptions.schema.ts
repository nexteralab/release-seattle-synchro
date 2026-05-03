import {
  pgTable, uuid, text, timestamp,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// ─────────────────────────────────────────────
// SUBSCRIPTIONS — suscripciones a newsletter segmentadas por source
// ─────────────────────────────────────────────
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),

  email: text('email').notNull(),

  // 'blog' | 'news' | 'general'
  source: text('source').notNull().default('general'),

  // 'active' | 'unsubscribed'
  status: text('status').notNull().default('active'),

  unsubscribed_at: timestamp('unsubscribed_at', { withTimezone: true }),

  created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
})

export type Subscription = typeof subscriptions.$inferSelect
export type SubscriptionInsert = typeof subscriptions.$inferInsert
