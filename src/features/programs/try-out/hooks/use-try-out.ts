import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getTryOutData } from '../services/try-out.service'

export const tryOutQueryOptions = queryOptions({
  queryKey: ['try-out'],
  queryFn: getTryOutData,
  staleTime: 1000 * 60 * 60,
})

export function useTryOut() {
  return useSuspenseQuery(tryOutQueryOptions)
}
