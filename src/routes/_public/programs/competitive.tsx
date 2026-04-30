import { createFileRoute } from '@tanstack/react-router'
import { CompetitivePage } from '#/features/programs/competitive'

export const Route = createFileRoute('/_public/programs/competitive')({
  component: CompetitivePage,
})
