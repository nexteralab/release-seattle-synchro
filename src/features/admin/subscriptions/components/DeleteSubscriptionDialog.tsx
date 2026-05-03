import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '#/components/ui/alert-dialog'
import { useDeleteSubscription } from '../hooks/use-subscriptions'
import type { Subscription } from '../services/subscriptions.service'

interface Props {
  subscription: Subscription | null
  onClose: () => void
}

export function DeleteSubscriptionDialog({ subscription, onClose }: Props) {
  const del = useDeleteSubscription()

  async function handleDelete() {
    if (!subscription) return
    try {
      await del.mutateAsync(subscription.id)
      toast.success('Subscription deleted')
    } catch {
      toast.error('Could not delete subscription')
    } finally {
      onClose()
    }
  }

  return (
    <AlertDialog open={!!subscription} onOpenChange={v => { if (!v) onClose() }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-foreground">{subscription?.email}</span>
            {' '}will be permanently removed from the{' '}
            <span className="font-medium text-foreground capitalize">{subscription?.source}</span>
            {' '}list. This cannot be undone.
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
