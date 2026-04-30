import { createFileRoute } from '@tanstack/react-router'
import { NewsPage } from '#/features/admin/news/NewsPage'
import { MainLayout } from '#/components/Layout/Main'

export const Route = createFileRoute('/app/news')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>
    <NewsPage />
  </MainLayout>
}