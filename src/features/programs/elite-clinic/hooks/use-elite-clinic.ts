import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getEliteClinicData } from '../services/elite-clinic.service'

export const eliteClinicQueryOptions = queryOptions({
  queryKey: ['elite-clinic'],
  queryFn: getEliteClinicData,
  staleTime: 1000 * 60 * 60,
})

export function useEliteClinic() {
  return useSuspenseQuery(eliteClinicQueryOptions)
}
