import { createFileRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from '#/components/Layout/Main'

export const Route = createFileRoute('/app/coaches')({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
})
