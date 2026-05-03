import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export * from './schema/blogs/posts.schema'
export * from './schema/news/news.schema'
export * from './schema/subscriptions/subscriptions.schema'
