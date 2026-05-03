import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from '#/components/ui/alert-dialog'
import { useDeleteNews } from '../hooks/use-news'
import type { NewsItem } from '../services/news.service'

interface Props {
  item: NewsItem | null
  onClose: () => void
}

export function DeleteNewsDialog({ item, onClose }: Props) {
  const del = useDeleteNews()

  async function handleDelete() {
    if (!item) return
    try {
      await del.mutateAsync(item.id)
      toast.success('Announcement deleted')
      onClose()
    } catch {
      toast.error('Could not delete announcement')
    }
  }

  return (
    <AlertDialog open={!!item} onOpenChange={v => { if (!v) onClose() }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete announcement?</AlertDialogTitle>
          <AlertDialogDescription>
            "{item?.title}" will be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
