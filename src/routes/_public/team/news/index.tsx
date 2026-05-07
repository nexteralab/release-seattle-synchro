import { createFileRoute } from '@tanstack/react-router'
import { NewsListPage } from '#/features/team/news/NewsListPage'
import { publishedNewsQueryOptions } from '#/features/team/news/hooks/use-news-posts'

export const Route = createFileRoute('/_public/team/news/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(publishedNewsQueryOptions),
  component: NewsListPage,
})
