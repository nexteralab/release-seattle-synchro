import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getRecreationalConfig } from '../services/recreational.service'

export const recreationalQueryOptions = queryOptions({
  queryKey: ['recreational'],
  queryFn: getRecreationalConfig,
  staleTime: 1000 * 60 * 60,
})

export function useRecreational() {
  return useSuspenseQuery(recreationalQueryOptions)
}
