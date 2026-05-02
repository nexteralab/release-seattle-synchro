import { useState } from 'react'
import { Plus, FileText, BarChart2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'
import { usePosts } from './hooks/use-posts'
import { PostList } from './components/PostList'
import { DeletePostDialog } from './components/DeletePostDialog'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'
import type { Post } from './services/posts.service'

export function BlogsPage() {
  const navigate = useNavigate()
  const { data: posts, isLoading } = usePosts()
  const [deleting, setDeleting] = useState<Post | null>(null)
  const [tab, setTab] = useState<'posts' | 'analytics'>('posts')

  const AddButton = (
    <Button onClick={() => navigate({ to: '/app/blogs/new' })}>
      <Plus size={14} strokeWidth={2.5} />
      New Post
    </Button>
  )

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Blog"
        description="Manage your published articles and drafts"
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
          <div className="bg-card rounded-[10px] border border-border overflow-hidden">
            {isLoading || posts?.length ? (
              <PostList
                onEdit={p => navigate({ to: '/app/blogs/$postId', params: { postId: p.id } })}
                onDelete={setDeleting}
              />
            ) : (
              <AdminEmptyState
                icon={FileText}
                title="No posts yet"
                description="Create your first post to start sharing content with your audience."
                action={AddButton}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard postType="blog" />
        </TabsContent>
      </Tabs>

      <DeletePostDialog post={deleting} onClose={() => setDeleting(null)} />
    </div>
  )
}
