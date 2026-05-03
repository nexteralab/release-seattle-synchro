import { Link } from '@tanstack/react-router'
import { LayoutDashboard, FileText, Newspaper, BookOpen, Users, LogOut, Mail } from 'lucide-react'
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
import logoDark from '/images/logo.png'
import { useTheme } from '#/context/theme-context'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/app', exact: true },
  { label: 'Blogs', icon: FileText, to: '/app/blogs', exact: false },
  { label: 'News', icon: Newspaper, to: '/app/news', exact: false },
  { label: 'Programs', icon: BookOpen, to: '/app/programs', exact: false },
  { label: 'Coaches', icon: Users, to: '/app/coaches', exact: false },
  { label: 'Subscriptions', icon: Mail, to: '/app/subscriptions', exact: false },
] as const

interface AppSidebarProps {
  session: ReturnType<typeof useAdminAuth>['session']
  pathname: string
  onLogout: () => void
}

export function AppSidebar({ session, pathname, onLogout, ...props }: AppSidebarProps) {
  const { theme } = useTheme()
  return (
    <Sidebar collapsible="icon" variant='floating' {...props}>

      {/* Logo */}
      <SidebarHeader>
        <img
          src={theme === 'light' ? logoDark : logo}
          alt="Seattle Synchro"
          className="h-auto w-full shrink-0 group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ label, icon: Icon, to, exact }) => {
                const isActive = exact ? pathname === to : pathname.startsWith(to)
                return (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                      className="data-[active=true]:bg-[#0A0A67] data-[active=true]:text-white data-[active=true]:hover:bg-[#0A0A67]/90"
                    >
                      <Link to={to}>
                        <Icon strokeWidth={isActive ? 2.5 : 2} />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User + logout */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <div className="px-2 py-1.5">
              <p className="text-[12px] font-semibold text-sidebar-foreground truncate">
                {session?.user.email ?? '—'}
              </p>
              <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wide mt-0.5 font-medium">
                Administrator
              </p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip="Sign out"
              className="text-sidebar-foreground/70 hover:bg-red-50 hover:text-[#d4183d]"
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
