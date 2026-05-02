import { BlogHero } from './components/BlogHero'
import { BlogCard } from './components/BlogCard'
import { usePublishedPosts } from './hooks/use-blog-posts'

function SkeletonCard() {
  return (
    <div className="bg-white overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-[#ececf0]" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-16 bg-[#ececf0] rounded" />
        <div className="h-5 w-full bg-[#ececf0] rounded" />
        <div className="h-5 w-3/4 bg-[#ececf0] rounded" />
        <div className="h-3 w-full bg-[#ececf0] rounded" />
        <div className="h-3 w-2/3 bg-[#ececf0] rounded" />
        <div className="h-px bg-[#ececf0] mt-4" />
        <div className="h-3 w-40 bg-[#ececf0] rounded" />
      </div>
    </div>
  )
}

export function BlogListPage() {
  const { data: posts, isLoading, isError } = usePublishedPosts()

  return (
    <div className="w-full bg-white">
      <BlogHero />

      <section className="px-12 md:px-48 max-w-screen-2xl mx-auto py-20 md:py-28">
        {isError && (
          <p className="text-center text-[#737373] py-16 font-['Inter',sans-serif]">
            Could not load posts. Please try again later.
          </p>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!isLoading && !isError && posts?.length === 0 && (
          <div className="text-center py-24">
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67] text-[28px] tracking-[-0.8px] uppercase mb-3">
              Coming Soon
            </p>
            <p className="font-['Inter',sans-serif] text-[#737373] text-[16px]">
              We're working on our first posts. Check back soon!
            </p>
          </div>
        )}

        {!isLoading && !isError && posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
