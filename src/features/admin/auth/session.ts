import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { redirect } from '@tanstack/react-router'
import { auth } from '#/lib/auth'

// SOLO servidor. No importar `authClient` aquí: si este módulo mezcla cliente y
// servidor, el splitter de server functions (?tss-serverfn-split) arrastra
// `cloudflare:workers` al bundle del cliente y rompe el worker entry en cada HMR.

/** Sirve tanto en SSR (beforeLoad del router) como en navegación de cliente. */
export const getAdminSession = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequest().headers })
  return session ?? null
})

/**
 * Guard reutilizable para el `beforeLoad` de rutas del admin.
 *
 * - Sin sesión → redirige a /login.
 * - Con sesión pero sin rol admin → deja pasar con `isAdmin: false`, para que
 *   la ruta pinte <NotAuthorized /> en vez de un redirect mudo.
 *
 * Esto es UX. La seguridad real está en el middleware `adminOnly` que llevan
 * todas las server functions del admin.
 */
export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) throw redirect({ to: '/login' })
  return { user: session.user, isAdmin: session.user.role === 'admin' }
}
