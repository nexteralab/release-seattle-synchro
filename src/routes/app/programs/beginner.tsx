import { createFileRoute } from '@tanstack/react-router'
import { BeginnerAdminPage } from '#/features/admin/programs/beginner/BeginnerAdminPage'

export const Route = createFileRoute('/app/programs/beginner')({
  component: BeginnerAdminPage,
})
