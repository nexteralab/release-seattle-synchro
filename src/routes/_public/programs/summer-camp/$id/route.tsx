import { createFileRoute, notFound } from '@tanstack/react-router'
import { getLocation, LocationCampPage } from '#/features/programs/summer-camp'

const SITE_URL = 'https://seattlesynchro.com'

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
    const title = `${loc.heroTitle} | Seattle Synchro`
    const description = loc.heroSubtitle
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
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const location = Route.useLoaderData()
  return <LocationCampPage content={location} />
}
