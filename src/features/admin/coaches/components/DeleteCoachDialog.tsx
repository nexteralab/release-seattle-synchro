import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from '#/components/ui/alert-dialog'
import { useDeleteCoach } from '../hooks/use-coaches'
import type { Coach } from '../services/coaches.service'

interface Props {
  coach: Coach | null
  onClose: () => void
}

export function DeleteCoachDialog({ coach, onClose }: Props) {
  const del = useDeleteCoach()

  async function handleDelete() {
    if (!coach) return
    try {
      await del.mutateAsync(coach.id)
      toast.success('Coach deleted')
      onClose()
    } catch {
      toast.error('Could not delete coach')
    }
  }

  return (
    <AlertDialog open={!!coach} onOpenChange={(v) => { if (!v) onClose() }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {coach?.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The coach profile will be permanently removed.
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
