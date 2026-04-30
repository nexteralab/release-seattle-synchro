import { createFileRoute } from '@tanstack/react-router'
import { BlogsPage } from '#/features/admin/blogs/BlogsPage'
import { MainLayout } from '#/components/Layout/Main'

export const Route = createFileRoute('/app/blogs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>
    <BlogsPage />
  </MainLayout>
}