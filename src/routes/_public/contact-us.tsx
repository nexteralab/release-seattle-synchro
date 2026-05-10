import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '#/features/contact-us'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/contact-us`
const OG_IMAGE = `${SITE_URL}/images/contact-us.jpg`
const TITLE = 'Contact Us | Seattle Synchro'
const DESCRIPTION =
  'Get in touch with Seattle Synchro. Reach out about programs, registration, fundraising, or partnership opportunities — we typically reply within one business day.'
const KEYWORDS =
  'contact Seattle Synchro, artistic swimming Seattle, synchronized swimming contact, Seattle swim team contact, Bellevue swim program inquiry'

const SCHEMA_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Seattle Synchro',
    url: SITE_URL,
  },
  about: {
    '@type': 'SportsOrganization',
    name: 'Seattle Synchro',
    url: SITE_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  },
})

export const Route = createFileRoute('/_public/contact-us')({
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
  component: () => <ContactPage />,
})
