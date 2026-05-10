import { createFileRoute } from '@tanstack/react-router'
import { newsBySlugQueryOptions, useNewsBySlug } from '#/features/team/news/hooks/use-news-posts'
import { NewsPostPage } from '#/features/team/news/NewsPostPage'

const SITE_URL = 'https://seattlesynchro.com'
const FALLBACK_IMAGE = `${SITE_URL}/images/header.png`
const FALLBACK_DESCRIPTION =
  'Latest news and announcements from Seattle Synchro — competition recaps, team updates and program highlights from the Pacific Northwest.'
const BASE_KEYWORDS = 'Seattle Synchro news, swim team announcements, artistic swimming, synchronized swimming, swim updates'

export const Route = createFileRoute('/_public/team/news/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) =>
    queryClient.ensureQueryData(newsBySlugQueryOptions(slug)),
  head: ({ loaderData, params }) => {
    const news = loaderData
    const url = `${SITE_URL}/team/news/${params.slug}`
    const title = news?.meta_title || news?.title || 'News'
    const description = news?.meta_description || news?.excerpt || FALLBACK_DESCRIPTION
    const image = news?.cover_url || FALLBACK_IMAGE
    const fullTitle = news ? `${title} | Seattle Synchro` : 'News Not Found | Seattle Synchro'
    const tagKeywords = Array.isArray(news?.tags) && news.tags.length
      ? news.tags.join(', ')
      : ''
    const keywords = [news?.category, tagKeywords, BASE_KEYWORDS]
      .filter(Boolean)
      .join(', ')

    const articleJsonLd = news
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: news.title,
          description,
          url,
          image,
          inLanguage: 'en-US',
          datePublished: news.published_at ?? undefined,
          dateModified: news.updated_at ?? news.published_at ?? undefined,
          articleSection: news.category ?? undefined,
          author: news.author
            ? { '@type': 'Person', name: news.author }
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
        { name: 'robots', content: news ? 'index, follow' : 'noindex, follow' },
        { name: 'keywords', content: keywords },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:site_name', content: 'Seattle Synchro' },
        { property: 'og:locale', content: 'en_US' },
        ...(news?.author ? [{ property: 'article:author', content: news.author }] : []),
        ...(news?.published_at
          ? [{ property: 'article:published_time', content: news.published_at }]
          : []),
        ...(news?.category ? [{ property: 'article:section', content: news.category }] : []),
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
