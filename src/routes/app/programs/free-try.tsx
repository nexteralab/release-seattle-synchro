import { createFileRoute } from '@tanstack/react-router'
import { FreeTryAdminPage } from '#/features/admin/programs/free-try/FreeTryAdminPage'

export const Route = createFileRoute('/app/programs/free-try')({
  component: FreeTryAdminPage,
})
