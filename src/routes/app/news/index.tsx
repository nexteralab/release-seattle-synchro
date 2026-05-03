import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '#/components/Layout/Main'
import { NewsPage } from '#/features/admin/news/NewsPage'

export const Route = createFileRoute('/app/news/')({
  component: () => (
    <MainLayout>
      <NewsPage />
    </MainLayout>
  ),
})
