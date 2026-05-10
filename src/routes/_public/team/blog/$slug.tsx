import { createFileRoute } from '@tanstack/react-router'
import { postBySlugQueryOptions, usePostBySlug } from '#/features/team/blog/hooks/use-blog-posts'
import { BlogPostPage } from '#/features/team/blog/BlogPostPage'

const SITE_URL = 'https://seattlesynchro.com'
const FALLBACK_IMAGE = `${SITE_URL}/images/header.png`
const FALLBACK_DESCRIPTION =
  'Read the latest article from Seattle Synchro — insights and stories from artistic swimming in the Pacific Northwest.'
const BASE_KEYWORDS = 'Seattle Synchro blog, artistic swimming articles, synchronized swimming, swim training, swim community'

export const Route = createFileRoute('/_public/team/blog/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) =>
    queryClient.ensureQueryData(postBySlugQueryOptions(slug)),
  head: ({ loaderData, params }) => {
    const post = loaderData
    const url = `${SITE_URL}/team/blog/${params.slug}`
    const title = post?.meta_title || post?.title || 'Blog Post'
    const description = post?.meta_description || post?.excerpt || FALLBACK_DESCRIPTION
    const image = post?.cover_url || FALLBACK_IMAGE
    const fullTitle = post ? `${title} | Seattle Synchro` : 'Post Not Found | Seattle Synchro'
    const tagKeywords = Array.isArray(post?.tags) && post.tags.length
      ? post.tags.join(', ')
      : ''
    const keywords = tagKeywords ? `${tagKeywords}, ${BASE_KEYWORDS}` : BASE_KEYWORDS

    const articleJsonLd = post
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description,
          url,
          image,
          inLanguage: 'en-US',
          datePublished: post.published_at ?? undefined,
          dateModified: post.updated_at ?? post.published_at ?? undefined,
          author: post.author
            ? { '@type': 'Person', name: post.author }
            : { '@type': 'SportsOrganization', name: 'Seattle Synchro' },
          publisher: {
            '@type': 'SportsOrganization',
            name: 'Seattle Synchro',
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          keywords: tagKeywords || undefined,
        })
      : null

    return {
      meta: [
        { title: fullTitle },
        { name: 'description', content: description },
        { name: 'robots', content: post ? 'index, follow' : 'noindex, follow' },
        { name: 'keywords', content: keywords },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:site_name', content: 'Seattle Synchro' },
        { property: 'og:locale', content: 'en_US' },
        ...(post?.author ? [{ property: 'article:author', content: post.author }] : []),
        ...(post?.published_at
          ? [{ property: 'article:published_time', content: post.published_at }]
          : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: articleJsonLd
        ? [{ type: 'application/ld+json', children: articleJsonLd }]
        : [],
    }
  },
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
        <p className="font-bold text-[#0A0A67] text-[28px] tracking-[-0.8px] uppercase mb-3">
          Post Not Found
        </p>
        <p className="text-[#737373] text-[16px]">
          This post doesn't exist or has been removed.
        </p>
      </div>
    )
  }

  return <BlogPostPage post={post} />
}
