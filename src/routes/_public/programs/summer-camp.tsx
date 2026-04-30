import { createFileRoute } from '@tanstack/react-router'
import { getSummerCampData, SummerCampPage } from '#/features/programs/summer-camp'

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
//
// head: ({ loaderData }) => ({
//   meta: [
//     { title: loaderData.seo.metaTitle },
//     { name: 'description', content: loaderData.seo.metaDescription },
//     { name: 'keywords',    content: loaderData.seo.keywords ?? '' },
//     { name: 'robots',      content: loaderData.seo.robots },
//     { property: 'og:title',       content: loaderData.seo.ogTitle ?? loaderData.seo.metaTitle },
//     { property: 'og:description', content: loaderData.seo.ogDescription ?? loaderData.seo.metaDescription },
//     { property: 'og:image',       content: loaderData.seo.ogImageUrl ?? '' },
//     { property: 'og:type',        content: loaderData.seo.ogType },
//     { name: 'twitter:card',        content: loaderData.seo.twitterCard },
//     { name: 'twitter:title',       content: loaderData.seo.twitterTitle ?? loaderData.seo.metaTitle },
//     { name: 'twitter:description', content: loaderData.seo.twitterDescription ?? loaderData.seo.metaDescription },
//   ],
//   links: loaderData.seo.canonicalUrl
//     ? [{ rel: 'canonical', href: loaderData.seo.canonicalUrl }]
//     : [],
//   scripts: loaderData.seo.schemaJson
//     ? [{ type: 'application/ld+json', children: loaderData.seo.schemaJson }]
//     : [],
// }),

export const Route = createFileRoute('/_public/programs/summer-camp')({
  loader: () => getSummerCampData(),
  head: () => ({
    meta: [
      { title: 'Summer Camp 2026 | Seattle Synchro' },
      { name: 'description', content: 'Artistic swimming summer camp for kids 6–11 in Bellevue, WA. Fun, creative, and skill-building. Limited spots — register now.' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title',       content: 'Summer Camp 2026 | Seattle Synchro' },
      { property: 'og:description', content: 'Artistic swimming summer camp for kids 6–11 in Bellevue, WA.' },
      { property: 'og:type',        content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <SummerCampPage data={data} />
}
