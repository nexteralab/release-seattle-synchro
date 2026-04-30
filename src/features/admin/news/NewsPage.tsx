import { Plus, Newspaper } from 'lucide-react'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'

export function NewsPage() {
  return (
    <div>
      <AdminPageHeader
        title="News"
        description="Manage announcements and club updates"
        action={
          <button className="flex items-center gap-2 bg-[#0A0A67] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors">
            <Plus size={14} strokeWidth={2.5} />
            New Announcement
          </button>
        }
      />
      <div className="p-8">
        <div className="bg-white rounded-[10px] border border-black/[0.06]">
          <AdminEmptyState
            icon={Newspaper}
            title="No announcements yet"
            description="Share news and updates with your community."
            action={
              <button className="flex items-center gap-2 bg-[#0A0A67] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors">
                <Plus size={14} strokeWidth={2.5} />
                New Announcement
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}
