import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSubscriptions, deleteSubscription, unsubscribe } from '../services/subscriptions.service'

const QK = ['subscriptions']

export function useSubscriptions() {
  return useQuery({ queryKey: QK, queryFn: getSubscriptions })
}

export function useDeleteSubscription() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteSubscription(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useUnsubscribe() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => unsubscribe(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}
