import { createFileRoute } from '@tanstack/react-router'
import { CoachesPage } from '#/features/admin/coaches/CoachesPage'

export const Route = createFileRoute('/app/coaches/')({
  component: CoachesPage,
})
