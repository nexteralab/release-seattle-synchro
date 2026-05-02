import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '#/components/Layout/Main'
import { BlogsPage } from '#/features/admin/blogs/BlogsPage'

export const Route = createFileRoute('/app/blogs/')({
  component: () => (
    <MainLayout>
      <BlogsPage />
    </MainLayout>
  ),
})
