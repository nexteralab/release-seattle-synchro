import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getAdminSession } from '#/features/admin/auth/session'
import { AdminLayout } from '#/features/admin/layout/AdminLayout'
import NotFoundError from '#/components/errors/not-found-error'
import { AdminHeader } from '#/features/admin/components/AdminHeader'
import { ThemeProvider } from '#/context/theme-context'
import { ThemeSwitch } from '#/components/theme-switch'

export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    // Corre también en SSR: la sesión de Better Auth vive en una cookie httpOnly.
    const session = await getAdminSession()
    // Cualquier usuario autenticado entra al admin. Lo que es solo-admin
    // (Analytics, Users) lo filtra `requireAdmin` en su propia ruta.
    if (!session) throw redirect({ to: '/login' })
  },
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: AdminShell,
  notFoundComponent: NotFoundError,
})

function AdminShell() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme' >
      <AdminLayout>
        <AdminHeader fixed>
          <ThemeSwitch />
        </AdminHeader>
        <Outlet />
      </AdminLayout>
    </ThemeProvider>
  )
}
