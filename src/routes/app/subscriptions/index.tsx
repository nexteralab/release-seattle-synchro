import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '#/components/Layout/Main'
import { SubscriptionsPage } from '#/features/admin/subscriptions/SubscriptionsPage'

export const Route = createFileRoute('/app/subscriptions/')({
  component: () => (
    <MainLayout>
      <SubscriptionsPage />
    </MainLayout>
  ),
})
