import { createFileRoute, notFound } from '@tanstack/react-router'
import { getLocation, LocationCampPage } from '#/features/programs/summer-camp'

const SITE_URL = 'https://seattlesynchro.com'

// ponytail: piscinas fijas (mismas para todas las ciudades); coords reales para
// las señales locales de "near me" en el JSON-LD.
const POOLS = [
  { name: 'Newport Swim & Tennis Club', street: '5464 119th Ave SE', lat: 47.5532877, lng: -122.1778828 },
  { name: 'Somerset Recreation Club', street: '4445 Somerset Blvd SE', lat: 47.5658127, lng: -122.1592734 },
]

export const Route = createFileRoute('/_public/programs/summer-camp/$id')({
  loader: ({ params }) => {
    const location = getLocation(params.id)
    if (!location) throw notFound()
    return location
  },
  head: ({ loaderData }) => {
    const loc = loaderData
    if (!loc) return {}
    const url = `${SITE_URL}/programs/summer-camp/${loc.slug}`
    const title = `${loc.metaTitle} | Seattle Synchro`
    const description = loc.heroSubtitle
    // Datos estructurados: le dicen a Google qué es, dónde queda y sus coordenadas
    // (señal local para búsquedas "near me").
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: loc.metaTitle,
      description,
      url,
      provider: { '@type': 'Organization', name: 'Seattle Synchro', url: SITE_URL },
      location: POOLS.map((p) => ({
        '@type': 'Place',
        name: p.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: p.street,
          addressLocality: 'Bellevue',
          addressRegion: 'WA',
          postalCode: '98006',
          addressCountry: 'US',
        },
        geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng },
      })),
    }
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url },
        { property: 'og:site_name', content: 'Seattle Synchro' },
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd) }],
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const location = Route.useLoaderData()
  return <LocationCampPage content={location} />
}
