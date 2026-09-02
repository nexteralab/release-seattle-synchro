import {
  Eye, Users, Clock, Target, Repeat, Bot, ArrowRight,
} from 'lucide-react'
import { EvilAreaChart } from '#/components/evilcharts/charts/area-chart'
import { type ChartConfig } from '#/components/evilcharts/ui/chart'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Skeleton } from '#/components/ui/skeleton'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { CountriesMap } from './components/CountriesMap'
import { DevicesChart } from './components/DevicesChart'
import { SourceIcon } from './components/SourceIcon'
import { sourceLabel } from './components/source-icons'
import { parseAsInteger, useQueryState } from 'nuqs'
import { TODAY } from './services/reports.service'
import {
  useAcquisition, useAudience, useConversions, useFunnel,
  useOverview, useTimeseries, useTopPages,
} from './hooks/use-reports'

const RANGES = [
  { label: 'Today', value: TODAY },
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: 'All', value: 0 },
]

const trafficConfig = {
  pageviews: { label: 'Pageviews', colors: { light: ['#0A0A67'], dark: ['#6666cc'] } },
  sessions: { label: 'Sessions', colors: { light: ['#a1a1a1'], dark: ['#737373'] } },
} satisfies ChartConfig

const CHANNEL_LABELS: Record<string, string> = {
  direct: 'Direct',
  organic: 'Search',
  social: 'Social',
  referral: 'Referral',
}

const CONVERSION_LABELS: Record<string, string> = {
  contact: 'Contact form',
  subscribe: 'Newsletter',
  register_click: 'Register clicks',
}

const fmtNum = (n: number) => n.toLocaleString('en-US')

function fmtTime(seconds: number) {
  if (!seconds) return '0s'
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return m ? `${m}m ${s}s` : `${s}s`
}

function KpiCard({
  icon: Icon, label, value, hint,
}: {
  icon: typeof Eye
  label: string
  value: string | null
  hint?: string
}) {
  return (
    <Card className="border-border">
      <CardContent className="px-5 py-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-3.5" />
          <span className="text-[11px] font-bold uppercase tracking-[0.8px]">{label}</span>
        </div>
        {value === null ? (
          <Skeleton className="mt-2 h-7 w-20" />
        ) : (
          <p className="font-display tabular mt-1.5 text-[26px] font-bold text-foreground">{value}</p>
        )}
        {hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  )
}

/** Lista horizontal con barra proporcional. Se usa en canales, países y páginas. */
function RankedList({
  rows, empty, formatLabel,
}: {
  rows: { label: string; count: number; sub?: string; source?: string }[]
  empty: string
  formatLabel?: (s: string) => string
}) {
  if (!rows.length) {
    return <p className="px-5 py-8 text-center text-[13px] text-muted-foreground">{empty}</p>
  }
  const max = Math.max(...rows.map((r) => r.count))
  return (
    <div className="divide-y divide-border">
      {rows.map((r) => (
        <div key={r.label} className="relative px-5 py-2.5">
          <div
            className="absolute inset-y-0 left-0 bg-primary/[0.07]"
            style={{ width: `${(r.count / max) * 100}%` }}
          />
          <div className="relative flex items-center justify-between gap-4">
            <span className="flex min-w-0 items-center gap-2 text-[13px] text-foreground">
              {r.source !== undefined && <SourceIcon source={r.source} />}
              <span className="truncate">{formatLabel ? formatLabel(r.label) : r.label}</span>
            </span>
            <span className="tabular shrink-0 text-[13px] font-bold text-foreground">
              {fmtNum(r.count)}
              {r.sub && (
                <span className="ml-1.5 font-normal text-muted-foreground">{r.sub}</span>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SiteAnalyticsPage() {
  // El rango vive en la URL (?range=…): sobrevive al refresco y el enlace se
  // puede compartir. Por defecto, hoy.
  const [days, setDays] = useQueryState(
    'range',
    parseAsInteger.withDefault(TODAY).withOptions({ history: 'replace' }),
  )

  const { data: overview, isLoading: loadingOv } = useOverview(days)
  const { data: series } = useTimeseries(days)
  const { data: pages } = useTopPages(days)
  const { data: acq } = useAcquisition(days)
  const { data: audience } = useAudience(days)
  const { data: conversions } = useConversions(days)
  const { data: funnel } = useFunnel(days)

  const totalConversions = overview?.conversions ?? 0
  const conversionRate =
    overview?.sessions ? (totalConversions / overview.sessions) * 100 : 0

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site analytics"
        description="Traffic, acquisition and conversions across the whole site"
        action={
          <div className="flex gap-1 rounded-lg border border-border p-0.5">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setDays(r.value)}
                className={`rounded-md px-3 py-1 text-[12px] font-bold transition-colors ${
                  days === r.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard
          icon={Eye}
          label="Pageviews"
          value={loadingOv ? null : fmtNum(overview?.pageviews ?? 0)}
        />
        <KpiCard
          icon={Users}
          label="Sessions"
          value={loadingOv ? null : fmtNum(overview?.sessions ?? 0)}
        />
        <KpiCard
          icon={Repeat}
          label="Visitors"
          value={loadingOv ? null : fmtNum(overview?.visitors ?? 0)}
          hint={
            overview
              ? `${fmtNum(overview.newVisitors)} new · ${fmtNum(overview.returningVisitors)} returning`
              : undefined
          }
        />
        <KpiCard
          icon={Clock}
          label="Avg session"
          value={loadingOv ? null : fmtTime(overview?.avgSessionSeconds ?? 0)}
        />
        <KpiCard
          icon={Target}
          label="Conversions"
          value={loadingOv ? null : fmtNum(totalConversions)}
          hint={overview?.sessions ? `${conversionRate.toFixed(1)}% of sessions` : undefined}
        />
      </div>

      {/* Tráfico en el tiempo */}
      <Card className="border-border">
        <CardHeader className="px-5 pb-0 pt-5">
          <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Traffic over time</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-2 pt-2">
          {series?.length ? (
            <EvilAreaChart
              data={series.map((d) => ({
                day: d.day.slice(5),
                pageviews: d.pageviews,
                sessions: d.sessions,
              }))}
              chartConfig={trafficConfig}
              xDataKey="day"
              areaVariant="gradient"
              strokeVariant="solid"
              curveType="monotone"
              showBrush={series.length > 14}
              hideLegend
              tickGap={28}
              // Sin altura explícita el contenedor cae en aspect-video (16:9) y
              // en pantalla ancha se dispara.
              className="h-[200px] w-full"
            />
          ) : (
            <p className="py-16 text-center text-[13px] text-muted-foreground">
              No traffic recorded in this range yet.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Páginas */}
        <Card className="border-border">
          <CardHeader className="px-5 pb-2 pt-4">
            <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Top pages</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            <RankedList
              rows={(pages ?? []).map((p) => ({
                label: p.path,
                count: p.pageviews,
                sub: `· ${fmtNum(p.sessions)} ses.`,
              }))}
              empty="No pageviews yet."
            />
          </CardContent>
        </Card>

        {/* Canales de adquisición */}
        <Card className="border-border">
          <CardHeader className="px-5 pb-2 pt-4">
            <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Channels</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            <RankedList
              rows={(acq?.channels ?? []).map((c) => ({ label: c.value, count: c.count }))}
              empty="No sessions yet."
              formatLabel={(s) => CHANNEL_LABELS[s] ?? s}
            />
          </CardContent>
        </Card>

        {/* Fuentes */}
        <Card className="border-border">
          <CardHeader className="px-5 pb-2 pt-4">
            <CardTitle className="text-[13px] font-bold tracking-[0.3px]">
              Sources &amp; campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            <RankedList
              rows={[
                ...(acq?.sources ?? []).map((s) => ({
                  label: sourceLabel(s.value),
                  count: s.count,
                  source: s.value,
                })),
                // El icono de una campaña sale de su utm_source: el nombre de
                // campaña no es un dominio y nunca resolvería a un favicon.
                ...(acq?.campaigns ?? []).map((c) => ({
                  label: `utm: ${c.value}`,
                  count: c.count,
                  source: c.source ?? '',
                })),
              ]}
              empty="No referrers or UTM campaigns yet."
            />
          </CardContent>
        </Card>
      </div>

      {/* Audiencia: mapa de países + dispositivos en el tiempo */}
      <CountriesMap countries={audience?.countries ?? []} />
      <DevicesChart series={audience?.deviceSeries ?? []} />

      {/* Conversiones */}
      <Card className="border-border">
        <CardHeader className="px-5 pb-2 pt-4">
          <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Conversions</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <RankedList
            rows={(conversions ?? []).map((c) => ({
              label: c.conversion,
              count: c.count,
              sub: `· ${fmtNum(c.sessions)} ses.`,
            }))}
            empty="No conversions recorded yet."
            formatLabel={(s) => CONVERSION_LABELS[s] ?? s}
          />
        </CardContent>
      </Card>

      {/* Embudo: de dónde vienen los que convierten */}
      <Card className="border-border">
        <CardHeader className="px-5 pb-2 pt-4">
          <CardTitle className="text-[13px] font-bold tracking-[0.3px]">
            Where conversions come from
          </CardTitle>
          <p className="text-[12px] text-muted-foreground">
            Channel and landing page of every session that converted
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          {funnel?.length ? (
            <div className="divide-y divide-border">
              {funnel.map((f) => (
                <div
                  key={`${f.conversion}-${f.referrerType}-${f.entryPath}`}
                  className="flex items-center gap-3 px-5 py-2.5"
                >
                  <Badge variant="secondary" className="shrink-0">
                    {CHANNEL_LABELS[f.referrerType] ?? f.referrerType}
                  </Badge>
                  <span className="truncate text-[13px] text-muted-foreground">{f.entryPath}</span>
                  <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/50" />
                  <span className="shrink-0 text-[13px] font-medium text-foreground">
                    {CONVERSION_LABELS[f.conversion] ?? f.conversion}
                  </span>
                  <span className="tabular ml-auto shrink-0 text-[13px] font-bold">
                    {fmtNum(f.count)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-5 py-8 text-center text-[13px] text-muted-foreground">
              No conversions to attribute yet.
            </p>
          )}
        </CardContent>
      </Card>

      {overview && overview.botsFiltered > 0 && (
        <p className="flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground">
          <Bot className="size-3.5" />
          {fmtNum(overview.botsFiltered)} bot events excluded from every number above
        </p>
      )}
    </div>
  )
}
