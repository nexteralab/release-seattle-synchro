import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getSummerCampData } from '../services/summer-camp.service'

export const summerCampQueryOptions = queryOptions({
  queryKey: ['summer-camp'],
  queryFn: getSummerCampData,
  staleTime: 1000 * 60 * 60, // 1 hour — static data, no need to refetch often
})

export function useSummerCamp() {
  return useSuspenseQuery(summerCampQueryOptions)
}
