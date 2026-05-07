import { queryOptions, useQuery } from '@tanstack/react-query'
import { getPublishedPosts, getPostBySlug } from '../services/blog.service'

export const publishedPostsQueryOptions = queryOptions({
  queryKey: ['public-posts'],
  queryFn: getPublishedPosts,
  staleTime: 5 * 60 * 1000,
})

export function postBySlugQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ['public-post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

export function usePublishedPosts() {
  return useQuery(publishedPostsQueryOptions)
}

export function usePostBySlug(slug: string) {
  return useQuery(postBySlugQueryOptions(slug))
}
