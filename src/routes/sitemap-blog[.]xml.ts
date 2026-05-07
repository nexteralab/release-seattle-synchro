import { createFileRoute } from '@tanstack/react-router'
import { getPublishedPosts } from '#/features/team/blog/services/blog.service'

const BASE_URL = import.meta.env.VITE_SITE_URL ?? 'https://seattlesynchro.com'

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `<url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export const Route = createFileRoute('/sitemap-blog.xml')({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split('T')[0]

        const result = await getPublishedPosts().catch(() => [])

        const entries = result.map((post) => {
          const lastmod = post.published_at
            ? new Date(post.published_at).toISOString().split('T')[0]
            : today
          return urlEntry(`${BASE_URL}/team/blog/${post.slug}`, lastmod, 'weekly', '0.7')
        })

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=1800, s-maxage=1800',
          },
        })
      },
    },
  },
})
