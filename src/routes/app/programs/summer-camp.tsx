import { MainLayout } from '#/components/Layout/Main'
import { SummerCampAdminPage } from '#/features/admin/programs/summer-camp/SummerCampAdminPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/programs/summer-camp')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <MainLayout>
            <SummerCampAdminPage />
        </MainLayout>
    )
}
