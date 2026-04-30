import { createFileRoute } from '@tanstack/react-router'
import { ProgramsPage } from '#/features/admin/programs/ProgramsPage'
import { MainLayout } from '#/components/Layout/Main'

export const Route = createFileRoute('/app/programs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>
    <ProgramsPage />
  </MainLayout>
}