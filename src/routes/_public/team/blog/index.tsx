import { createFileRoute } from '@tanstack/react-router'
import { BlogListPage } from '#/features/team/blog/BlogListPage'
import { publishedPostsQueryOptions } from '#/features/team/blog/hooks/use-blog-posts'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/team/blog`
const OG_IMAGE = `${SITE_URL}/images/header.png`
const TITLE = 'Blog | Seattle Synchro'
const DESCRIPTION =
  'Insights, training tips and stories from Seattle Synchro — articles for artistic swimming athletes, coaches and parents in the Pacific Northwest.'
const KEYWORDS =
  'Seattle Synchro blog, artistic swimming articles, synchronized swimming tips, swim training advice, swim community stories, Pacific Northwest swimming'

const SCHEMA_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'SportsOrganization',
    name: 'Seattle Synchro',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
})

export const Route = createFileRoute('/_public/team/blog/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(publishedPostsQueryOptions),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'robots', content: 'index, follow' },
      { name: 'keywords', content: KEYWORDS },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: PAGE_URL },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:site_name', content: 'Seattle Synchro' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITLE },
      { name: 'twitter:description', content: DESCRIPTION },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    links: [{ rel: 'canonical', href: PAGE_URL }],
    scripts: [{ type: 'application/ld+json', children: SCHEMA_JSONLD }],
  }),
  component: BlogListPage,
})
