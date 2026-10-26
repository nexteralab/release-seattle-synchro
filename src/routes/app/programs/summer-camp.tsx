import { createFileRoute } from '@tanstack/react-router'
import { SummerCampAdminPage } from '#/features/admin/programs/summer-camp/SummerCampAdminPage'

export const Route = createFileRoute('/app/programs/summer-camp')({
  component: SummerCampAdminPage,
})
