import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '#/components/Layout/Main'
import { BoosterAdminPage } from '#/features/admin/booster/BoosterAdminPage'

export const Route = createFileRoute('/app/booster/')({
  component: () => (
    <MainLayout>
      <BoosterAdminPage />
    </MainLayout>
  ),
})
