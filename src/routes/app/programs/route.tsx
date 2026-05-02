import { MainLayout } from '#/components/Layout/Main'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/programs')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}
