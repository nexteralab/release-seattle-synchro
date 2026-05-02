import { createFileRoute } from '@tanstack/react-router'
import { usePosts } from '#/features/admin/blogs/hooks/use-posts'
import { PostFormPage } from '#/features/admin/blogs/PostFormPage'

export const Route = createFileRoute('/app/blogs/$postId')({
  component: EditPostRoute,
})

function EditPostRoute() {
  const { postId } = Route.useParams()
  const { data: posts, isLoading } = usePosts()
  const post = posts?.find(p => p.id === postId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground text-[14px]">
        Loading...
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground text-[14px]">
        Post not found.
      </div>
    )
  }

  return <PostFormPage post={post} />
}
