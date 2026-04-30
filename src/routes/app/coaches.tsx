import { createFileRoute } from '@tanstack/react-router'
import { CoachesPage } from '#/features/admin/coaches/CoachesPage'
import { MainLayout } from '#/components/Layout/Main'

export const Route = createFileRoute('/app/coaches')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>
    <CoachesPage />
  </MainLayout>
}