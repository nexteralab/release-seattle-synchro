import { createFileRoute } from '@tanstack/react-router'
import { CoachFormPage } from '#/features/admin/coaches/CoachFormPage'

export const Route = createFileRoute('/app/coaches/new')({
  component: CoachFormPage,
})
