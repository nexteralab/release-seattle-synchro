import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getCompetitiveConfig } from '../services/competitive.service'

export const competitiveQueryOptions = queryOptions({
  queryKey: ['competitive'],
  queryFn: getCompetitiveConfig,
  staleTime: 1000 * 60 * 60,
})

export function useCompetitive() {
  return useSuspenseQuery(competitiveQueryOptions)
}
