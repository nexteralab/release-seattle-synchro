import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { auth } from './auth'

/**
 * Middleware para server functions del admin. Antes esto lo cubría RLS de
 * Supabase; con D1 la autorización es nuestra, así que TODA mutación del admin
 * debe llevar `.middleware([adminOnly])`.
 */
export const adminOnly = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const session = await auth.api.getSession({ headers: getRequest().headers })
  if (!session) throw new Error('Unauthorized')
  if (session.user.role !== 'admin') throw new Error('Forbidden')
  return next({ context: { user: session.user } })
})
