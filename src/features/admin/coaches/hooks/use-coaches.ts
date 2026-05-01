import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createCoach, deleteCoach, getCoaches, toggleCoachActive, updateCoach, reorderCoaches,
  type CoachInsert, type CoachUpdate,
} from '../services/coaches.service'

const QK = ['coaches']

export function useCoaches() {
  return useQuery({ queryKey: QK, queryFn: getCoaches })
}

export function useCreateCoach() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CoachInsert) => createCoach(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useUpdateCoach() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CoachUpdate }) =>
      updateCoach(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useDeleteCoach() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCoach(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useToggleCoach() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      toggleCoachActive(id, active),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}

export function useReorderCoaches() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (ordered: { id: string; sort_order: number }[]) =>
      reorderCoaches(ordered),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  })
}
