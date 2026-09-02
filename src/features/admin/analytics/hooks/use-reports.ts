import { useQuery } from '@tanstack/react-query'
import {
  getOverview, getTimeseries, getTopPages, getAcquisition, getAudience,
  getConversions, getFunnel,
} from '../services/reports.service'

const STALE = 5 * 60 * 1000

const opts = <T,>(key: string, days: number, fn: () => Promise<T>) => ({
  queryKey: ['site-analytics', key, days],
  queryFn: fn,
  staleTime: STALE,
})

export const useOverview = (days: number) =>
  useQuery(opts('overview', days, () => getOverview(days)))

export const useTimeseries = (days: number) =>
  useQuery(opts('timeseries', days, () => getTimeseries(days)))

export const useTopPages = (days: number) =>
  useQuery(opts('top-pages', days, () => getTopPages(days)))

export const useAcquisition = (days: number) =>
  useQuery(opts('acquisition', days, () => getAcquisition(days)))

export const useAudience = (days: number) =>
  useQuery(opts('audience', days, () => getAudience(days)))

export const useConversions = (days: number) =>
  useQuery(opts('conversions', days, () => getConversions(days)))

export const useFunnel = (days: number) =>
  useQuery(opts('funnel', days, () => getFunnel(days)))
