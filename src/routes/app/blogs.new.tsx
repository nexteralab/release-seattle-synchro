import { createFileRoute } from '@tanstack/react-router'
import { PostFormPage } from '#/features/admin/blogs/PostFormPage'

export const Route = createFileRoute('/app/blogs/new')({
  component: PostFormPage,
})
