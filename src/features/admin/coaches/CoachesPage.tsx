import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'
import { useCoaches } from './hooks/use-coaches'
import { CoachList, CoachListSkeleton } from './components/CoachList'
import { DeleteCoachDialog } from './components/DeleteCoachDialog'
import type { Coach } from './services/coaches.service'

export function CoachesPage() {
  const navigate = useNavigate()
  const { data: coaches, isLoading, isError } = useCoaches()
  const [deleting, setDeleting] = useState<Coach | null>(null)

  function openCreate() {
    navigate({ to: '/app/coaches/new' })
  }

  function openEdit(coach: Coach) {
    navigate({ to: '/app/coaches/$coachId', params: { coachId: coach.id } })
  }

  const AddButton = (
    <button
      onClick={openCreate}
      className="flex items-center gap-2 bg-[#0A0A67] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors"
    >
      <Plus size={14} strokeWidth={2.5} />
      Add Coach
    </button>
  )

  return (
    <div className='space-y-6'>
      <AdminPageHeader
        title="Coaches"
        description="Manage your coaching staff profiles"
        action={AddButton}
      />

      <div className="bg-white rounded-[10px] border border-black/[0.06] overflow-hidden">
        {isLoading ? (
          <CoachListSkeleton />
        ) : isError ? (
          <AdminEmptyState
            icon={Users}
            title="Error loading coaches"
            description="Please try again later."
          />
        ) : coaches?.length ? (
          <CoachList onEdit={openEdit} onDelete={setDeleting} />
        ) : (
          <AdminEmptyState
            icon={Users}
            title="No coaches yet"
            description="Add your coaching staff to display them on the public site."
            action={AddButton}
          />
        )}
      </div>

      <DeleteCoachDialog
        coach={deleting}
        onClose={() => setDeleting(null)}
      />
    </div>
  )
}
