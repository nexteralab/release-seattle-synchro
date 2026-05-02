import { createFileRoute } from '@tanstack/react-router'
import { useCoaches } from '#/features/admin/coaches/hooks/use-coaches'
import { CoachFormPage } from '#/features/admin/coaches/CoachFormPage'

export const Route = createFileRoute('/app/coaches/$coachId')({
  component: EditCoachRoute,
})

function EditCoachRoute() {
  const { coachId } = Route.useParams()
  const { data: coaches, isLoading } = useCoaches()
  const coach = coaches?.find(c => c.id === coachId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#aaa] text-[14px]">
        Loading...
      </div>
    )
  }

  if (!coach) {
    return (
      <div className="flex items-center justify-center py-24 text-[#aaa] text-[14px]">
        Coach not found.
      </div>
    )
  }

  return <CoachFormPage coach={coach} />
}
