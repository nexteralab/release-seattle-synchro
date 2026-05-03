import { createFileRoute } from '@tanstack/react-router'
import { BlogListPage } from '#/features/team/blog/BlogListPage'

export const Route = createFileRoute('/_public/team/blog/')({
  component: BlogListPage,
})
