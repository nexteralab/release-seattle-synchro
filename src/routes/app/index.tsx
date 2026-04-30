import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '#/features/admin/dashboard/DashboardPage'
import { MainLayout } from '#/components/Layout/Main'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})



function RouteComponent() {
  return <MainLayout>
    <DashboardPage />
  </MainLayout>
}