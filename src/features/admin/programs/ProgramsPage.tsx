import { Plus, BookOpen } from 'lucide-react'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'

export function ProgramsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Programs"
        description="Manage competitive, recreational, and camp programs"
        action={
          <button className="flex items-center gap-2 bg-[#0A0A67] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors">
            <Plus size={14} strokeWidth={2.5} />
            New Program
          </button>
        }
      />
      <div className="p-8">
        <div className="bg-white rounded-[10px] border border-black/[0.06]">
          <AdminEmptyState
            icon={BookOpen}
            title="No programs yet"
            description="Add your first program to display it on the public site."
            action={
              <button className="flex items-center gap-2 bg-[#0A0A67] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors">
                <Plus size={14} strokeWidth={2.5} />
                New Program
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}
