import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '#/components/Layout/Main'
import { requireAdmin } from '#/features/admin/auth/session'
import { NotAuthorized } from '#/features/admin/components/NotAuthorized'
import { UsersPage } from '#/features/admin/users/UsersPage'

export const Route = createFileRoute('/app/users/')({
  beforeLoad: requireAdmin,
  component: RouteComponent,
})

function RouteComponent() {
  const { isAdmin } = Route.useRouteContext()
  return <MainLayout>{isAdmin ? <UsersPage /> : <NotAuthorized />}</MainLayout>
}
