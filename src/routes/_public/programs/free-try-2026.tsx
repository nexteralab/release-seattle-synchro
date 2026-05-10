import { createFileRoute } from '@tanstack/react-router'
import { getFreeTryData, FreeTryPage } from '#/features/programs/free-try'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/programs/free-try-2026`
const OG_IMAGE = `${SITE_URL}/images/image_free_try.png`
const TITLE = 'Free Artistic Swimming Trial 2026 | Seattle Synchro'
const DESCRIPTION =
  'Try artistic swimming for free in Bellevue, WA. Saturday June 7, 2026, 11:30am at Newport Hills Swim & Tennis Club. Ages 7–11. Limited spots — register now.'
const EVENT_DATE = '2026-06-07T11:30:00-07:00'
const EVENT_END = '2026-06-07T12:00:00-07:00'

const EVENT_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Free Artistic Swimming Trial',
  description:
    'Free trial session designed for future champions ages 7–11. Come try artistic swimming with Seattle Synchro coaches.',
  startDate: EVENT_DATE,
  endDate: EVENT_END,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  sport: 'Artistic Swimming',
  url: PAGE_URL,
  image: OG_IMAGE,
  location: {
    '@type': 'Place',
    name: 'Newport Hills Swim and Tennis Club',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bellevue',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'SportsOrganization',
    name: 'Seattle Synchro',
    url: SITE_URL,
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: 7,
    suggestedMaxAge: 11,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/LimitedAvailability',
    url: PAGE_URL,
  },
})

export const Route = createFileRoute('/_public/programs/free-try-2026')({
  loader: () => getFreeTryData(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'keywords',
        content:
          'artistic swimming, synchronized swimming, free trial, Seattle, Bellevue, Newport Hills, kids swimming, ages 7-11, June 2026',
      },
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
    scripts: [
      {
        type: 'application/ld+json',
        children: EVENT_JSONLD,
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <FreeTryPage data={data} />
}
