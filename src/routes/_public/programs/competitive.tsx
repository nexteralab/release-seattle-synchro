import { createFileRoute } from '@tanstack/react-router'
import { CompetitivePage } from '#/features/programs/competitive'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/programs/competitive`
const OG_IMAGE = `${SITE_URL}/images/competitive_hero.jpg`
const TITLE = 'Competitive Artistic Swimming | Seattle Synchro'
const DESCRIPTION =
  'High-performance artistic swimming for athletes ready to compete at regional and national levels. Train with experienced coaches in the Pacific Northwest.'
const KEYWORDS =
  'competitive artistic swimming, synchronized swimming competition, Seattle swim team, national competition, regional competition, elite swim training, Bellevue WA'

const SCHEMA_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Competitive Artistic Swimming',
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: 'en-US',
  educationalLevel: 'Advanced',
  provider: {
    '@type': 'SportsOrganization',
    name: 'Seattle Synchro',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  about: { '@type': 'Thing', name: 'Artistic Swimming' },
  audience: { '@type': 'Audience', audienceType: 'Competitive athletes' },
})

export const Route = createFileRoute('/_public/programs/competitive')({
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
  component: CompetitivePage,
})
