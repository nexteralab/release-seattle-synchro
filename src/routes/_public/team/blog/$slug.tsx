import { createFileRoute } from '@tanstack/react-router'
import { usePostBySlug } from '#/features/team/blog/hooks/use-blog-posts'
import { BlogPostPage } from '#/features/team/blog/BlogPostPage'

export const Route = createFileRoute('/_public/team/blog/$slug')({
  component: BlogPostRoute,
})

function BlogPostRoute() {
  const { slug } = Route.useParams()
  const { data: post, isLoading, isError } = usePostBySlug(slug)

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

  if (isError || !post) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-12">
        <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67] text-[28px] tracking-[-0.8px] uppercase mb-3">
          Post Not Found
        </p>
        <p className="font-['Inter',sans-serif] text-[#737373] text-[16px]">
          This post doesn't exist or has been removed.
        </p>
      </div>
    )
  }

  return <BlogPostPage post={post} />
}
