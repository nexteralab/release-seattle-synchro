import { createFileRoute } from '@tanstack/react-router'
import { EliteClinicPage, getEliteClinicData } from '#/features/programs/elite-clinic'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/programs/elite-clinic`
const OG_IMAGE = `${SITE_URL}/images/header.png`
const TITLE = 'International Elite Clinic 2026 | Seattle Synchro'
const DESCRIPTION =
  'International artistic swimming Elite Clinic July 27–30, 2026 in Bellevue, WA. Led by top-level coaches — Tammy Mcgregor, Paula Klamburg and more. Limited spots. Early-bird discounts available.'
const KEYWORDS =
  'elite clinic, artistic swimming, synchronized swimming clinic 2026, advanced swim training, Tammy Mcgregor, Paula Klamburg, Newport Hills, Bellevue WA, Seattle Synchro'

const EVENT_DATE = '2026-07-27T08:00:00-07:00'
const EVENT_END = '2026-07-30T13:30:00-07:00'

const SCHEMA_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Seattle Synchro International Elite Clinic 2026',
  description: DESCRIPTION,
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
      streetAddress: '5464 119th Ave SE',
      addressLocality: 'Bellevue',
      addressRegion: 'WA',
      postalCode: '98006',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'SportsOrganization',
    name: 'Seattle Synchro',
    url: SITE_URL,
  },
  performer: [
    { '@type': 'Person', name: 'Tammy Mcgregor' },
    { '@type': 'Person', name: 'Paula Klamburg' },
    { '@type': 'Person', name: 'Patricia Camaran' },
    { '@type': 'Person', name: 'Maria Romero' },
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/LimitedAvailability',
    url: 'https://www.seattlesynchrosst.com/page/system/classreg-shopping',
  },
})

export const Route = createFileRoute('/_public/programs/elite-clinic')({
  loader: () => getEliteClinicData(),
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
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <EliteClinicPage data={data} />
}
