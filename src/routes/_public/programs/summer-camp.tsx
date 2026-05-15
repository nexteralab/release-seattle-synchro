import { createFileRoute } from '@tanstack/react-router'
import { getSummerCampContent, SummerCampPage } from '#/features/programs/summer-camp'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/programs/summer-camp`
const OG_IMAGE = `${SITE_URL}/images/hero_summer.webp`
const TITLE = 'Summer Camp 2026 | Seattle Synchro'
const DESCRIPTION =
  'Artistic swimming summer camp for kids 6–11 in Bellevue, WA. Fun, creative and skill-building sessions with experienced coaches. Limited spots — register now.'
const KEYWORDS =
  'summer camp, artistic swimming camp, kids summer camp 2026, Bellevue WA camp, synchronized swimming camp, ages 6-11, Seattle summer activities'

const CAMP_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Seattle Synchro Summer Camp 2026',
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  sport: 'Artistic Swimming',
  startDate: '2026-07-27T09:00:00-07:00',
  endDate: '2026-08-07T11:00:00-07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Bellevue, WA',
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
    suggestedMinAge: 6,
    suggestedMaxAge: 11,
  },
  subEvent: [
    {
      '@type': 'SportsEvent',
      name: 'July in Bellevue (Newport Hills)',
      startDate: '2026-07-27T09:00:00-07:00',
      endDate: '2026-07-31T11:00:00-07:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Newport Swim and Tennis Club',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '5464 119th Ave SE',
          addressLocality: 'Bellevue',
          addressRegion: 'WA',
          postalCode: '98006',
          addressCountry: 'US',
        },
      },
    },
    {
      '@type': 'SportsEvent',
      name: 'August in Somerset',
      startDate: '2026-08-03T09:00:00-07:00',
      endDate: '2026-08-07T11:00:00-07:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Somerset',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4445 Somerset Blvd SE',
          addressLocality: 'Bellevue',
          addressRegion: 'WA',
          postalCode: '98006',
          addressCountry: 'US',
        },
      },
    },
  ],
})

// Cuando conectes la DB, el loader también traerá el SEO:
// import { getProgramSeo } from '#/features/programs/seo'
//
// loader: async () => {
//   const [data, seo] = await Promise.all([
//     getSummerCampData(),
//     getProgramSeo('summer-camp'),
//   ])
//   return { data, seo }
// },

export const Route = createFileRoute('/_public/programs/summer-camp')({
  loader: () => getSummerCampContent(),
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
    scripts: [{ type: 'application/ld+json', children: CAMP_JSONLD }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <SummerCampPage content={data} />
}
