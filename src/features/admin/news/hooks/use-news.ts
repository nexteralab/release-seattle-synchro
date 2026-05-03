import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getNews, createNewsItem, updateNewsItem, deleteNewsItem,
  type NewsInsert, type NewsUpdate,
} from '../services/news.service'

const QK = ['news']

export function useNews() {
  return useQuery({ queryKey: QK, queryFn: getNews })
}

export function useCreateNews() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: NewsInsert) => createNewsItem(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useUpdateNews() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NewsUpdate }) => updateNewsItem(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useDeleteNews() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteNewsItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}
