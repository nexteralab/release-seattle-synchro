import { queryOptions, useQuery } from '@tanstack/react-query'
import { getPublishedNews, getNewsBySlug } from '../services/news.service'

export const publishedNewsQueryOptions = queryOptions({
  queryKey: ['public-news'],
  queryFn: getPublishedNews,
  staleTime: 5 * 60 * 1000,
})

export function newsBySlugQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ['public-news', slug],
    queryFn: () => getNewsBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

export function usePublishedNews() {
  return useQuery(publishedNewsQueryOptions)
}

export function useNewsBySlug(slug: string) {
  return useQuery(newsBySlugQueryOptions(slug))
}
