import { useQuery } from '@tanstack/react-query'
import {
  getOverview,
  getTimeseries,
  getTopPosts,
  getBreakdown,
} from '../services/analytics.service'

const STALE = 5 * 60 * 1000 // 5 min

export function useAnalyticsOverview(postType: string, days: number) {
  return useQuery({
    queryKey: ['analytics', 'overview', postType, days],
    queryFn:  () => getOverview(postType, days),
    staleTime: STALE,
  })
}

export function useAnalyticsTimeseries(postType: string, days: number) {
  return useQuery({
    queryKey: ['analytics', 'timeseries', postType, days],
    queryFn:  () => getTimeseries(postType, days),
    staleTime: STALE,
  })
}

export function useAnalyticsTopPosts(postType: string, days: number) {
  return useQuery({
    queryKey: ['analytics', 'top-posts', postType, days],
    queryFn:  () => getTopPosts(postType, days),
    staleTime: STALE,
  })
}

export function useAnalyticsBreakdown(postType: string, days: number) {
  return useQuery({
    queryKey: ['analytics', 'breakdown', postType, days],
    queryFn:  () => getBreakdown(postType, days),
    staleTime: STALE,
  })
}
