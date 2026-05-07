import { createFileRoute } from '@tanstack/react-router'

const BASE_URL = import.meta.env.VITE_SITE_URL ?? 'https://seattlesynchro.com'

const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: '/',                             priority: '1.0', changefreq: 'weekly'  },
  { path: '/contact-us',                   priority: '0.8', changefreq: 'monthly' },
  // Programs
  { path: '/programs/competitive',         priority: '0.9', changefreq: 'monthly' },
  { path: '/programs/recreational',        priority: '0.9', changefreq: 'monthly' },
  { path: '/programs/beginner',            priority: '0.9', changefreq: 'monthly' },
  { path: '/programs/summer-camp',         priority: '0.8', changefreq: 'monthly' },
  { path: '/programs/shows',              priority: '0.7', changefreq: 'monthly' },
  // Team
  { path: '/team/about-us',               priority: '0.8', changefreq: 'monthly' },
  { path: '/team/coaches',                priority: '0.8', changefreq: 'monthly' },
  { path: '/team/blog',                   priority: '0.8', changefreq: 'weekly'  },
  { path: '/team/news',                   priority: '0.8', changefreq: 'weekly'  },
  // Athletes
  { path: '/athletes/hall-of-fame',       priority: '0.7', changefreq: 'monthly' },
  { path: '/athletes/safety',             priority: '0.6', changefreq: 'yearly'  },
  { path: '/athletes/health',             priority: '0.6', changefreq: 'yearly'  },
  { path: '/athletes/knoxing',            priority: '0.6', changefreq: 'yearly'  },
  { path: '/athletes/sport-psychology',   priority: '0.6', changefreq: 'yearly'  },
  // Booster
  { path: '/booster/donate',              priority: '0.7', changefreq: 'monthly' },
  { path: '/booster/fundraising',         priority: '0.6', changefreq: 'monthly' }
]

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `<url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split('T')[0]

        const entries = STATIC_ROUTES.map(({ path, priority, changefreq }) =>
          urlEntry(`${BASE_URL}${path}`, today, changefreq, priority),
        )

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          },
        })
      },
    },
  },
})
