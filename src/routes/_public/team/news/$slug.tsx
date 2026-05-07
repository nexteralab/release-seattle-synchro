import { createFileRoute } from '@tanstack/react-router'
import { newsBySlugQueryOptions, useNewsBySlug } from '#/features/team/news/hooks/use-news-posts'
import { NewsPostPage } from '#/features/team/news/NewsPostPage'

export const Route = createFileRoute('/_public/team/news/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) =>
    queryClient.ensureQueryData(newsBySlugQueryOptions(slug)),
  component: NewsSlugRoute,
})

function NewsSlugRoute() {
  const { slug } = Route.useParams()
  const { data: news, isLoading, isError } = useNewsBySlug(slug)

  if (isLoading) {
    return (
      <div className="w-full bg-white">
        <div className="h-[480px] bg-[#ececf0] animate-pulse" />
        <div className="px-12 md:px-48 max-w-screen-2xl mx-auto py-16">
          <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
            <div className="h-3 w-20 bg-[#ececf0] rounded" />
            <div className="h-12 w-full bg-[#ececf0] rounded" />
            <div className="h-12 w-3/4 bg-[#ececf0] rounded" />
            <div className="h-5 w-full bg-[#ececf0] rounded mt-6" />
            <div className="h-5 w-2/3 bg-[#ececf0] rounded" />
            <div className="space-y-3 mt-8">
              {[...Array(8)].map((_, i) => <div key={i} className="h-4 bg-[#ececf0] rounded" />)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !news) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-12">
        <p className="font-bold text-[#0A0A67] text-[28px] tracking-[-0.8px] uppercase mb-3">
          Not Found
        </p>
        <p className="text-[#737373] text-[16px]">
          This announcement doesn't exist or has been removed.
        </p>
      </div>
    )
  }

  return <NewsPostPage news={news} />
}
