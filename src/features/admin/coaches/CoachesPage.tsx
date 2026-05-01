import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'
import { useCoaches } from './hooks/use-coaches'
import { CoachList } from './components/CoachList'
import { CoachFormModal } from './components/CoachFormModal'
import { DeleteCoachDialog } from './components/DeleteCoachDialog'
import type { Coach } from './services/coaches.service'

export function CoachesPage() {
  const { data: coaches } = useCoaches()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Coach | null>(null)
  const [deleting, setDeleting] = useState<Coach | null>(null)

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(coach: Coach) {
    setEditing(coach)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
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
    <div>
      <AdminPageHeader
        title="Coaches"
        description="Manage your coaching staff profiles"
        action={AddButton}
      />

      <div className="p-8">
        <div className="bg-white rounded-[10px] border border-black/[0.06] overflow-hidden">
          {coaches?.length ? (
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
      </div>

      <CoachFormModal
        open={formOpen}
        onClose={closeForm}
        coach={editing}
      />

      <DeleteCoachDialog
        coach={deleting}
        onClose={() => setDeleting(null)}
      />
    </div>
  )
}
