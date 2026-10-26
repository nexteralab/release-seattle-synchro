import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getRecreationalData } from '../services/recreational.service'

export const recreationalQueryOptions = queryOptions({
  queryKey: ['recreational'],
  queryFn: getRecreationalData,
  staleTime: 1000 * 60 * 60,
})

export function useRecreational() {
  return useSuspenseQuery(recreationalQueryOptions)
}
