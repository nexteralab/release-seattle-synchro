import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getUsers, createUser, updateUser, deleteUser,
  type UserInsert, type UserUpdate,
} from '../services/users.service'

const QK = ['admin-users']

export function useUsers() {
  return useQuery({ queryKey: QK, queryFn: getUsers })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: UserInsert) => createUser(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UserUpdate }) => updateUser(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}
