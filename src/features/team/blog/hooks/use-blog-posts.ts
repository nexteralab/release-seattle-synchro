import { useQuery } from '@tanstack/react-query'
import { getPublishedPosts, getPostBySlug } from '../services/blog.service'

export function usePublishedPosts() {
  return useQuery({
    queryKey: ['public-posts'],
    queryFn: getPublishedPosts,
    staleTime: 5 * 60 * 1000,
  })
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ['public-post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}
