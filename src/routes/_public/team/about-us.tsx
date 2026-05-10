import { createFileRoute } from '@tanstack/react-router'
import { AboutUsPage } from '#/features/team/about-us/AboutUsPage'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/team/about-us`
const OG_IMAGE = `${SITE_URL}/images/about_us_hero.webp`
const TITLE = 'About Us | Seattle Synchro'
const DESCRIPTION =
  'Learn about Seattle Synchro — the Pacific Northwest\'s premier artistic swimming team. Our story, mission and the values that drive our athletes and community since 2001.'
const KEYWORDS =
  'about Seattle Synchro, artistic swimming team history, synchronized swimming Seattle, swim team mission, swim club Pacific Northwest, Seattle Synchro values'

const SCHEMA_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: 'en-US',
  mainEntity: {
    '@type': 'SportsOrganization',
    name: 'Seattle Synchro',
    alternateName: 'Seattle Synchronized Swim Team',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: '2001',
    sport: 'Artistic Swimming',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
  },
})

export const Route = createFileRoute('/_public/team/about-us')({
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
  component: AboutUsPage,
})
