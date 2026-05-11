import { createFileRoute } from '@tanstack/react-router'
import { EliteClinicAdminPage } from '#/features/admin/programs/elite-clinic/EliteClinicAdminPage'

export const Route = createFileRoute('/app/programs/elite-clinic')({
  component: EliteClinicAdminPage,
})
