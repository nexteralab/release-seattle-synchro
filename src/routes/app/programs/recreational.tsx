import { createFileRoute } from '@tanstack/react-router'
import { RecreationalAdminPage } from '#/features/admin/programs/recreational/RecreationalAdminPage'

export const Route = createFileRoute('/app/programs/recreational')({
  component: RecreationalAdminPage,
})
