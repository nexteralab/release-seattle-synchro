import { queryOptions, useQuery } from '@tanstack/react-query'
import { getCoaches } from '#/features/admin/coaches/services/coaches.service'

export const publicCoachesQueryOptions = queryOptions({
  queryKey: ['public-coaches'],
  queryFn: async () => {
    const coaches = await getCoaches()
    return coaches.filter((c) => c.active)
  },
  staleTime: 5 * 60 * 1000,
})

export function usePublicCoaches() {
  return useQuery(publicCoachesQueryOptions)
}
