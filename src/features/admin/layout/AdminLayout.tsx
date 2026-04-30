import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { supabase } from '#/utils/supabase'
import { useAdminAuth } from '#/features/admin/auth/use-admin-auth'
import { AppSidebar } from '#/features/admin/layout/AppSidebar'
import { cn } from '#/lib/utils'
import { SidebarProvider } from '#/components/ui/sidebar'
import { getCookie } from '#/lib/cookies'

export function AdminLayout({ children }: { children?: React.ReactNode }) {
  const { session } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const defaultOpen = typeof document !== 'undefined'
    ? getCookie('sidebar_state') !== 'false'
    : true

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        session={session}
        pathname={location.pathname}
        onLogout={handleLogout}
      />

      <div
        id="content"
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'sm:transition-[width] sm:duration-200 sm:ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
        )}
      >
        {children ? children : <Outlet />}
      </div>
    </SidebarProvider>
  )
}

