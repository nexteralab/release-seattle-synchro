import { createFileRoute } from '@tanstack/react-router'
import { BlogListPage } from '#/features/blog/BlogListPage'

export const Route = createFileRoute('/_public/blog/')({
  component: BlogListPage,
})
