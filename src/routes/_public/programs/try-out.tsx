import { createFileRoute } from '@tanstack/react-router'
import { getTryOutData, TryOutPage } from '#/features/programs/try-out'

const SITE_URL = 'https://seattlesynchro.com'
const PAGE_URL = `${SITE_URL}/programs/try-out`
const OG_IMAGE = `${SITE_URL}/images/programs/try-out/hero.webp`
const TITLE = 'Try Out for Synchronized Swimming | Seattle Synchro'
const DESCRIPTION =
  "Try out for Seattle Synchro's Novice Team at Triangle Pool in Bellevue, WA. Free to attend, ages 6–11. Register in advance — results the same day."

export const Route = createFileRoute('/_public/programs/try-out')({
  loader: () => getTryOutData(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'keywords',
        content:
          'artistic swimming tryout, synchronized swimming tryout, Seattle, Bellevue, Triangle Pool, Novice team, kids swimming, ages 6-11',
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
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <TryOutPage data={data} />
}
