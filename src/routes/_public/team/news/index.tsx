import { createFileRoute } from '@tanstack/react-router'
import { NewsListPage } from '#/features/team/news/NewsListPage'

export const Route = createFileRoute('/_public/team/news/')({
  component: NewsListPage,
})
