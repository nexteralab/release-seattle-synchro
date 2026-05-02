import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '#/components/ui/alert-dialog'
import { useDeletePost } from '../hooks/use-posts'
import type { Post } from '../services/posts.service'

interface Props {
  post: Post | null
  onClose: () => void
}

export function DeletePostDialog({ post, onClose }: Props) {
  const del = useDeletePost()

  async function handleDelete() {
    if (!post) return
    try {
      await del.mutateAsync(post.id)
      toast.success('Post deleted')
    } catch {
      toast.error('Could not delete post')
    } finally {
      onClose()
    }
  }

  return (
    <AlertDialog open={!!post} onOpenChange={(v) => { if (!v) onClose() }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete post?</AlertDialogTitle>
          <AlertDialogDescription>
            "<span className="font-medium text-foreground">{post?.title}</span>" will be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={del.isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {del.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
