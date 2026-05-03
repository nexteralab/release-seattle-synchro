import { useState } from 'react'
import { Plus, Newspaper, FileText, BarChart2 } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'
import { AnalyticsDashboard } from '#/features/admin/blogs/components/AnalyticsDashboard'
import { useNews } from './hooks/use-news'
import { NewsList, NewsListSkeleton } from './components/NewsList'
import { DeleteNewsDialog } from './components/DeleteNewsDialog'
import type { NewsItem } from './services/news.service'

export function NewsPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useNews()
  const [deleting, setDeleting] = useState<NewsItem | null>(null)
  const [tab, setTab] = useState<'posts' | 'analytics'>('posts')

  function openEdit(item: NewsItem) {
    navigate({ to: '/app/news/$newsId', params: { newsId: item.id } })
  }

  const AddButton = (
    <Button asChild size="sm">
      <Link to="/app/news/create">
        <Plus size={14} strokeWidth={2.5} />
        New Announcement
      </Link>
    </Button>
  )

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="News"
        description="Manage announcements and club updates"
        action={tab === 'posts' ? AddButton : undefined}
      />

      <Tabs value={tab} onValueChange={v => setTab(v as 'posts' | 'analytics')}>
        <TabsList className="mb-4">
          <TabsTrigger value="posts" className="flex items-center gap-1.5">
            <FileText size={13} />
            Posts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1.5">
            <BarChart2 size={13} />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="bg-white rounded-[10px] border border-black/[0.06] overflow-hidden">
            {isLoading ? (
              <NewsListSkeleton />
            ) : isError ? (
              <AdminEmptyState
                icon={Newspaper}
                title="Error loading news"
                description="Please try again later."
              />
            ) : data?.length ? (
              <NewsList onEdit={openEdit} onDelete={setDeleting} />
            ) : (
              <AdminEmptyState
                icon={Newspaper}
                title="No announcements yet"
                description="Share news and updates with your community."
                action={AddButton}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard postType="news" />
        </TabsContent>
      </Tabs>

      <DeleteNewsDialog item={deleting} onClose={() => setDeleting(null)} />
    </div>
  )
}
