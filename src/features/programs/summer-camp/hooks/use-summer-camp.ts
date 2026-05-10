import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getSummerCampContent } from '../services/summer-camp.service'

export const summerCampQueryOptions = queryOptions({
  queryKey: ['summer-camp'],
  queryFn: getSummerCampContent,
  staleTime: 1000 * 60 * 60, // 1 hour
})

export function useSummerCamp() {
  return useSuspenseQuery(summerCampQueryOptions)
}
