import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getPosts, createPost, updatePost, deletePost,
  type PostInsert, type PostUpdate,
} from '../services/posts.service'

const QK = ['posts']

export function usePosts() {
  return useQuery({ queryKey: QK, queryFn: getPosts })
}

export function useCreatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: PostInsert) => createPost(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useUpdatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PostUpdate }) => updatePost(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useDeletePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}
