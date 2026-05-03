import { createFileRoute } from '@tanstack/react-router'
import { CompetitiveAdminPage } from '#/features/admin/programs/competitive/CompetitiveAdminPage'

export const Route = createFileRoute('/app/programs/competitive')({
  component: CompetitiveAdminPage,
})
