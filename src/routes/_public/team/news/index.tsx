import { createFileRoute } from '@tanstack/react-router'
import { NewsListPage } from '#/features/team/news/NewsListPage'
import { publishedNewsQueryOptions } from '#/features/team/news/hooks/use-news-posts'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/team/news`
const OG_IMAGE = `${SITE_URL}/images/header.png`
const TITLE = 'News & Announcements | Seattle Synchro'
const DESCRIPTION =
  'Latest news, results and announcements from Seattle Synchro — competition recaps, team updates and program highlights from the Pacific Northwest.'
const KEYWORDS =
  'Seattle Synchro news, swim team announcements, competition recaps, artistic swimming results, synchronized swimming news, swim updates, Pacific Northwest swimming'

const SCHEMA_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: 'en-US',
  about: { '@type': 'Thing', name: 'Seattle Synchro News and Announcements' },
  publisher: {
    '@type': 'SportsOrganization',
    name: 'Seattle Synchro',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
})

export const Route = createFileRoute('/_public/team/news/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(publishedNewsQueryOptions),
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
  component: NewsListPage,
})
