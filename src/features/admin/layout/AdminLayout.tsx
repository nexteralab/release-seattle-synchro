'use client'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { supabase } from '#/utils/supabase'
import { useAdminAuth } from '#/features/admin/auth/use-admin-auth'
import { AppSidebar } from '#/features/admin/layout/AppSidebar'
import { cn } from '#/lib/utils'
import { SidebarProvider } from '#/components/ui/sidebar'
import Cookies from 'js-cookie'

export function AdminLayout({ children }: { children?: React.ReactNode }) {
  const { session } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // false = valor consistente en SSR y primer render cliente
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Solo se ejecuta en el cliente, después de la hidratación
    setSidebarOpen(Cookies.get('sidebar_state') !== 'false')
  }, [])

  function handleSidebarChange(open: boolean) {
    setSidebarOpen(open)
    Cookies.set('sidebar_state', String(open), { expires: 7 })
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={handleSidebarChange}>
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

