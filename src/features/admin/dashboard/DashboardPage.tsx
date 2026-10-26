import { Link, type LinkProps } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  FileText, Newspaper, Users, Mail, ArrowRight, Plus, PenLine, AlertCircle, BarChart3,
} from 'lucide-react'
import { EvilAreaChart } from '#/components/evilcharts/charts/area-chart'
import { type ChartConfig } from '#/components/evilcharts/ui/chart'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Skeleton } from '#/components/ui/skeleton'
import { useAdminAuth } from '#/features/admin/auth/use-admin-auth'
import { useOverview, useTimeseries } from '#/features/admin/analytics/hooks/use-reports'
import { getDashboard, type ContentItem } from './dashboard.service'

// Un programa sin tocar en más de 60 días probablemente tiene fechas o precios viejos.
const STALE_DAYS = 60

const PROGRAMS: { key: string; name: string; to: LinkProps['to'] }[] = [
  { key: 'summer-camp', name: 'Summer Camp', to: '/app/programs/summer-camp' },
  { key: 'free-try', name: 'Free Try', to: '/app/programs/free-try' },
  { key: 'elite-clinic', name: 'Elite Clinic', to: '/app/programs/elite-clinic' },
  { key: 'competitive', name: 'Competitive', to: '/app/programs/competitive' },
  { key: 'recreational', name: 'Recreational', to: '/app/programs/recreational' },
  { key: 'beginner', name: 'Beginner', to: '/app/programs/beginner' },
]

const trafficConfig = {
  pageviews: { label: 'Pageviews', colors: { light: ['#0A0A67'], dark: ['#6666cc'] } },
  sessions: { label: 'Sessions', colors: { light: ['#a1a1a1'], dark: ['#737373'] } },
} satisfies ChartConfig

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

/** "3 days ago", "yesterday", "just now". */
function ago(iso: string) {
  const sec = (new Date(iso).getTime() - Date.now()) / 1000
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000], ['month', 2592000], ['week', 604800],
    ['day', 86400], ['hour', 3600], ['minute', 60],
  ]
  for (const [unit, s] of steps) {
    if (Math.abs(sec) >= s) return rtf.format(Math.round(sec / s), unit)
  }
  return 'just now'
}

const daysSince = (iso: string) => (Date.now() - new Date(iso).getTime()) / 86400_000

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

const editLink = (item: ContentItem) =>
  item.kind === 'blog'
    ? ({ to: '/app/blogs/$postId', params: { postId: item.id } } as const)
    : ({ to: '/app/news/$newsId', params: { newsId: item.id } } as const)

export function DashboardPage() {
  const { user } = useAdminAuth()
  const isAdmin = user?.role === 'admin'
  const { data, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: getDashboard,
    staleTime: 60_000,
  })

  const firstName = user?.name?.split(' ')[0]
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const stalePrograms = data
    ? PROGRAMS.filter((p) => !data.programs[p.key] || daysSince(data.programs[p.key]) > STALE_DAYS)
    : []

  return (
    <div className="space-y-6">
      {/* Saludo + acciones rápidas */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-[12px] text-muted-foreground">{today}</p>
          <h1 className="mt-1 text-[26px] font-bold leading-none text-foreground">
            {greeting()}{firstName ? `, ${firstName}` : ''}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/app/news/create"><Plus size={14} /> News</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app/blogs/new"><Plus size={14} /> Blog post</Link>
          </Button>
        </div>
      </div>

      {/* Números reales */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat
          to="/app/blogs" icon={FileText} label="Blog posts" loading={isLoading}
          value={data?.posts.published}
          hint={data && (data.posts.drafts ? `${data.posts.drafts} draft${data.posts.drafts > 1 ? 's' : ''}` : 'No drafts')}
        />
        <Stat
          to="/app/news" icon={Newspaper} label="News" loading={isLoading}
          value={data?.news.published}
          hint={data && (data.news.drafts ? `${data.news.drafts} draft${data.news.drafts > 1 ? 's' : ''}` : 'No drafts')}
        />
        <Stat
          to="/app/coaches" icon={Users} label="Active coaches" loading={isLoading}
          value={data?.coaches} hint="Shown on the Team page"
        />
        <Stat
          to="/app/subscriptions" icon={Mail} label="Subscribers" loading={isLoading}
          value={data?.subscribers.active}
          hint={data && `+${data.subscribers.last30} in the last 30 days`}
        />
      </div>

      {/* Tráfico: solo admin, igual que la página de Analytics */}
      {isAdmin && <TrafficCard />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pendientes */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle className="flex items-center gap-2 text-[13px] font-bold">
              <AlertCircle size={14} className="text-primary" /> Needs attention
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            {isLoading ? (
              <ListSkeleton />
            ) : !data?.drafts.length && !stalePrograms.length ? (
              <p className="px-3 py-8 text-center text-[13px] text-muted-foreground">
                All caught up. Nothing pending.
              </p>
            ) : (
              <ul>
                {data?.drafts.map((d) => (
                  <Row key={`${d.kind}-${d.id}`} link={editLink(d)}>
                    <Badge variant="outline" className="text-[10px]">Draft</Badge>
                    <span className="flex-1 truncate">{d.title || 'Untitled'}</span>
                    <span className="shrink-0 text-[12px] text-muted-foreground">{ago(d.updated_at)}</span>
                  </Row>
                ))}
                {stalePrograms.map((p) => (
                  <Row key={p.key} link={{ to: p.to }}>
                    <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-600 dark:text-amber-400">
                      Review
                    </Badge>
                    <span className="flex-1 truncate">{p.name}</span>
                    <span className="shrink-0 text-[12px] text-muted-foreground">
                      {data?.programs[p.key] ? `updated ${ago(data.programs[p.key])}` : 'never edited'}
                    </span>
                  </Row>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-5 pt-5 pb-3">
            <CardTitle className="flex items-center gap-2 text-[13px] font-bold">
              <PenLine size={14} className="text-primary" /> Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            {isLoading ? (
              <ListSkeleton />
            ) : !data?.recent.length && !data?.recentSubscribers.length ? (
              <p className="px-3 py-8 text-center text-[13px] text-muted-foreground">No activity yet.</p>
            ) : (
              <ul>
                {data.recent.map((r) => (
                  <Row key={`${r.kind}-${r.id}`} link={editLink(r)}>
                    {r.kind === 'blog'
                      ? <FileText size={14} className="shrink-0 text-muted-foreground" />
                      : <Newspaper size={14} className="shrink-0 text-muted-foreground" />}
                    <span className="flex-1 truncate">{r.title || 'Untitled'}</span>
                    <span className="shrink-0 text-[12px] text-muted-foreground">edited {ago(r.updated_at)}</span>
                  </Row>
                ))}
                {data.recentSubscribers.map((s) => (
                  <Row key={`${s.email}-${s.source}`} link={{ to: '/app/subscriptions' }}>
                    <Mail size={14} className="shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate">
                      {s.email} <span className="text-muted-foreground">subscribed to {s.source}</span>
                    </span>
                    <span className="shrink-0 text-[12px] text-muted-foreground">{ago(s.created_at)}</span>
                  </Row>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Programas: cuándo se tocó cada uno */}
      <Card className="gap-0 py-0">
        <CardHeader className="px-5 pt-5 pb-3">
          <CardTitle className="text-[13px] font-bold">Programs</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 px-3 pb-3">
          {PROGRAMS.map((p) => {
            const at = data?.programs[p.key]
            const stale = !at || daysSince(at) > STALE_DAYS
            return (
              <Link
                key={p.key}
                to={p.to}
                className="group flex items-center justify-between gap-3 rounded-[8px] px-3 py-2.5 hover:bg-accent transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-foreground">{p.name}</p>
                  {isLoading ? (
                    <Skeleton className="mt-1 h-3 w-24" />
                  ) : (
                    <p className={`text-[12px] ${stale ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>
                      {at ? `Updated ${ago(at)}` : 'Never edited'}
                    </p>
                  )}
                </div>
                <ArrowRight size={14} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

function Stat({
  to, icon: Icon, label, value, hint, loading,
}: {
  to: LinkProps['to']
  icon: React.ElementType
  label: string
  value?: number
  hint?: string | false
  loading: boolean
}) {
  return (
    <Link
      to={to}
      className="group rounded-[10px] border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon size={17} />
        </div>
        <ArrowRight size={14} className="mt-0.5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      {loading ? (
        <Skeleton className="mb-1 h-7 w-12" />
      ) : (
        <p className="mb-1 text-[26px] font-bold leading-none tracking-[-1px] text-foreground">{value ?? 0}</p>
      )}
      <p className="text-[13px] font-semibold text-foreground">{label}</p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">{hint || ' '}</p>
    </Link>
  )
}

function TrafficCard() {
  const { data: overview, isLoading } = useOverview(7)
  const { data: series } = useTimeseries(7)

  const kpis = [
    { label: 'Visitors', value: overview?.visitors },
    { label: 'Pageviews', value: overview?.pageviews },
    { label: 'Conversions', value: overview?.conversions },
  ]

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-row items-center justify-between px-5 pt-5 pb-0">
        <CardTitle className="flex items-center gap-2 text-[13px] font-bold">
          <BarChart3 size={14} className="text-primary" /> Website · last 7 days
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-[12px]">
          <Link to="/app/analytics">Full analytics <ArrowRight size={13} /></Link>
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 px-5 pb-3 pt-3">
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 content-start">
          {kpis.map((k) => (
            <div key={k.label}>
              <p className="text-[12px] text-muted-foreground">{k.label}</p>
              {isLoading
                ? <Skeleton className="mt-1 h-6 w-14" />
                : <p className="text-[22px] font-bold leading-tight text-foreground">{(k.value ?? 0).toLocaleString()}</p>}
            </div>
          ))}
        </div>
        {series?.length ? (
          <EvilAreaChart
            data={series.map((d) => ({ day: d.day.slice(5), pageviews: d.pageviews, sessions: d.sessions }))}
            chartConfig={trafficConfig}
            xDataKey="day"
            areaVariant="gradient"
            strokeVariant="solid"
            curveType="monotone"
            hideLegend
            // Sin altura explícita el contenedor cae en aspect-video.
            className="h-[180px] w-full"
          />
        ) : (
          <p className="flex h-[180px] items-center justify-center text-[13px] text-muted-foreground">
            {isLoading ? 'Loading…' : 'No traffic recorded this week yet.'}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function Row({ link, children }: { link: LinkProps; children: React.ReactNode }) {
  return (
    <li>
      <Link
        {...link}
        className="flex items-center gap-3 rounded-[8px] px-3 py-2 text-[13px] text-foreground hover:bg-accent transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

function ListSkeleton() {
  return (
    <div className="space-y-2 px-3 py-2">
      {[0, 1, 2].map((i) => <Skeleton key={i} className="h-5 w-full" />)}
    </div>
  )
}
