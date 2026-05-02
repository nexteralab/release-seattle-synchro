import { ProgramsPage } from '#/features/admin/programs/ProgramsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/programs/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ProgramsPage />
}
