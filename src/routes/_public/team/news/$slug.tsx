import { createFileRoute } from '@tanstack/react-router'
import { useNewsBySlug } from '#/features/team/news/hooks/use-news-posts'
import { NewsPostPage } from '#/features/team/news/NewsPostPage'

export const Route = createFileRoute('/_public/team/news/$slug')({
  component: NewsSlugRoute,
})

function NewsSlugRoute() {
  const { slug } = Route.useParams()
  const { data: news, isLoading, isError } = useNewsBySlug(slug)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#0A0A67]/20 border-t-[#0A0A67] rounded-full animate-spin" />
      </div>
    )
  }

  if (isError || !news) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67] text-[24px] tracking-[-0.6px] uppercase">
          Not Found
        </p>
        <p className="font-['Inter',sans-serif] text-[#737373] text-[15px]">
          This announcement doesn't exist or has been removed.
        </p>
      </div>
    )
  }

  return <NewsPostPage news={news} />
}
