import { Plus, FileText } from 'lucide-react'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'

export function BlogsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Blogs"
        description="Manage your published articles and drafts"
        action={
          <button className="flex items-center gap-2 bg-[#0A0A67] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors">
            <Plus size={14} strokeWidth={2.5} />
            New Post
          </button>
        }
      />
      <div className="p-8">
        <div className="bg-white rounded-[10px] border border-black/[0.06]">
          <AdminEmptyState
            icon={FileText}
            title="No blog posts yet"
            description="Create your first post to start sharing content with your audience."
            action={
              <button className="flex items-center gap-2 bg-[#0A0A67] text-white px-4 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors">
                <Plus size={14} strokeWidth={2.5} />
                New Post
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}
