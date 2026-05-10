import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getFreeTryData } from '../services/free-try.service'

export const freeTryQueryOptions = queryOptions({
  queryKey: ['free-try'],
  queryFn: getFreeTryData,
  staleTime: 1000 * 60 * 60,
})

export function useFreeTry() {
  return useSuspenseQuery(freeTryQueryOptions)
}
