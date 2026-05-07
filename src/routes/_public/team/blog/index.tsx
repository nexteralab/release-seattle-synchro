import { createFileRoute } from '@tanstack/react-router'
import { BlogListPage } from '#/features/team/blog/BlogListPage'
import { publishedPostsQueryOptions } from '#/features/team/blog/hooks/use-blog-posts'

export const Route = createFileRoute('/_public/team/blog/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(publishedPostsQueryOptions),
  component: BlogListPage,
})
