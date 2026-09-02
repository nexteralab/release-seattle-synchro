import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '#/components/Layout/Main'
import { requireAdmin } from '#/features/admin/auth/session'
import { NotAuthorized } from '#/features/admin/components/NotAuthorized'
import { SiteAnalyticsPage } from '#/features/admin/analytics/SiteAnalyticsPage'

export const Route = createFileRoute('/app/analytics/')({
  beforeLoad: requireAdmin,
  component: RouteComponent,
})

function RouteComponent() {
  const { isAdmin } = Route.useRouteContext()
  return (
    <MainLayout>
      {isAdmin ? (
        <SiteAnalyticsPage />
      ) : (
        <NotAuthorized description="Site analytics are restricted to administrators." />
      )}
    </MainLayout>
  )
}
