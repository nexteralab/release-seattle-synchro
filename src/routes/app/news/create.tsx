import { createFileRoute } from '@tanstack/react-router'
import { NewsFormPage } from '#/features/admin/news/NewsFormPage'

export const Route = createFileRoute('/app/news/create')({
  component: NewsFormPage,
})
