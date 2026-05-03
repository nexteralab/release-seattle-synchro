import { useQuery } from '@tanstack/react-query'
import { getPublishedNews, getNewsBySlug } from '../services/news.service'

export function usePublishedNews() {
  return useQuery({
    queryKey: ['public-news'],
    queryFn: getPublishedNews,
    staleTime: 5 * 60 * 1000,
  })
}

export function useNewsBySlug(slug: string) {
  return useQuery({
    queryKey: ['public-news', slug],
    queryFn: () => getNewsBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}
