import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { LayoutDashboard, FileText, Newspaper, BookOpen, Users, LogOut, Mail, Home, Shield, ChartLine } from 'lucide-react'
import { useAdminAuth } from '#/features/admin/auth/use-admin-auth'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '#/components/ui/sidebar'
import logo from '/images/logo_white.png'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/app', exact: true },
  { label: 'Blogs', icon: FileText, to: '/app/blogs', exact: false },
  { label: 'News', icon: Newspaper, to: '/app/news', exact: false },
  { label: 'Programs', icon: BookOpen, to: '/app/programs', exact: false },
  { label: 'Coaches', icon: Users, to: '/app/coaches', exact: false },
  { label: 'Subscriptions', icon: Mail, to: '/app/subscriptions', exact: false },
] as const

// Solo para role === 'admin'. Ocultarlo es cosmético: la ruta y las server
// functions de /app/users hacen su propia verificación.
const adminNavItems = [
  { label: 'Analytics', icon: ChartLine, to: '/app/analytics', exact: false },
  { label: 'Users', icon: Shield, to: '/app/users', exact: false },
] as const

interface AppSidebarProps {
  session: ReturnType<typeof useAdminAuth>['session']
  pathname: string
  onLogout: () => void
}

interface NavItem {
  readonly label: string
  readonly icon: LucideIcon
  readonly to: string
  readonly exact: boolean
}

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string
  items: readonly NavItem[]
  pathname: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/45 text-[10px] font-bold uppercase tracking-[0.12em]">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ label: itemLabel, icon: Icon, to, exact }) => {
            const isActive = exact ? pathname === to : pathname.startsWith(to)
            return (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={itemLabel}
                  className="text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground data-[active=true]:hover:bg-sidebar-primary"
                >
                  <Link to={to}>
                    <Icon strokeWidth={isActive ? 2.5 : 2} />
                    <span>{itemLabel}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar({ session, pathname, onLogout, ...props }: AppSidebarProps) {
  const isAdmin = session?.user.role === 'admin'
  return (
    <Sidebar collapsible="icon" variant='floating' {...props}>

      {/* Logo */}
      <SidebarHeader>
        {/* El rail es navy en claro y en oscuro, así que el logo va siempre
            en su versión sobre fondo oscuro. */}
        <img
          src={logo}
          alt="Seattle Synchro"
          className="h-auto w-full shrink-0 px-1 py-1 group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent>
        <NavGroup label="Content" items={navItems} pathname={pathname} />
        {isAdmin && <NavGroup label="Administration" items={adminNavItems} pathname={pathname} />}
      </SidebarContent>

      {/* User + logout */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <div className="px-2 py-1.5">
              <p className="truncate text-[12px] font-semibold text-sidebar-foreground">
                {session?.user.email ?? '—'}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-sidebar-foreground/45">
                {isAdmin ? 'Administrator' : 'User'}
              </p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Go to website"
              className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <Link to="/">
                <Home />
                <span>Go to website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip="Sign out"
              className="text-sidebar-foreground/70 hover:bg-destructive/15 hover:text-destructive-foreground"
            >
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
