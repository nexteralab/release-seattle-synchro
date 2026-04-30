import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { supabase } from '#/utils/supabase'
import { AdminLayout } from '#/features/admin/layout/AdminLayout'
import NotFoundError from '#/components/errors/not-found-error'
import { AdminHeader } from '#/features/admin/components/AdminHeader'
import { ThemeProvider } from '#/context/theme-context'
import { ThemeSwitch } from '#/components/theme-switch'

export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    // Server: skip (admin is client-only)
    if (typeof window === 'undefined') return
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw redirect({ to: '/login' })
  },
  component: AuthGuard,
  notFoundComponent: NotFoundError,
})

// beforeLoad already verified the session before this component mounts.
// This component only watches for sign-out events during the session.
function AuthGuard() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate({ to: '/login' })
      }
    })
    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
