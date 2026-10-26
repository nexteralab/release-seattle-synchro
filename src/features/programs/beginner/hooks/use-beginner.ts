import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getBeginnerData } from '../services/beginner.service'

export const beginnerQueryOptions = queryOptions({
  queryKey: ['beginner'],
  queryFn: getBeginnerData,
  staleTime: 1000 * 60 * 60,
})

export function useBeginner() {
  return useSuspenseQuery(beginnerQueryOptions)
}
