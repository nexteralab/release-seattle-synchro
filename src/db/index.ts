import { drizzle } from 'drizzle-orm/d1'
import { env } from 'cloudflare:workers'
import * as appSchema from './schema'
import * as authSchema from './auth.schema'

export const schema = { ...appSchema, ...authSchema }
export const db = drizzle(env.DB, { schema })
