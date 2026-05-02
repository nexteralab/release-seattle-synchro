import { useState } from 'react'
import { Eye, Users, Clock, CheckCircle2, BarChart2, Smartphone, Tablet, Monitor } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { EvilAreaChart } from '#/components/evilcharts/charts/area-chart'
import { EvilPieChart } from '#/components/evilcharts/charts/pie-chart'
import { type ChartConfig } from '#/components/evilcharts/ui/chart'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Skeleton } from '#/components/ui/skeleton'
import { Badge } from '#/components/ui/badge'
import {
  useAnalyticsOverview,
  useAnalyticsTimeseries,
  useAnalyticsTopPosts,
  useAnalyticsBreakdown,
} from '../hooks/use-analytics'

interface Props {
  postType: 'blog' | 'news'
}

const RANGES = [
  { label: '7d',  value: 7  },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: 'All', value: 0  },
]

const viewsConfig = {
  views: {
    label: 'Views',
    colors: { light: ['#0A0A67'], dark: ['#6666cc'] },
  },
  uniqueVisitors: {
    label: 'Unique Visitors',
    colors: { light: ['#a1a1a1'], dark: ['#737373'] },
  },
} satisfies ChartConfig

const deviceColors: Record<string, { light: string; dark: string }> = {
  desktop: { light: '#0A0A67', dark: '#6666cc' },
  mobile:  { light: '#737373', dark: '#a1a1a1' },
  tablet:  { light: '#ececf0', dark: '#333' },
  unknown: { light: '#d4d4d4', dark: '#555' },
}

const DEVICE_ICON: Record<string, React.ElementType> = {
  mobile:  Smartphone,
  tablet:  Tablet,
  desktop: Monitor,
}

function fmtTime(s: number): string {
  if (!s) return '—'
  const m = Math.floor(s / 60)
  const sec = Math.round(s % 60)
  return m === 0 ? `${sec}s` : `${m}m ${sec}s`
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function AnalyticsDashboard({ postType }: Props) {
  const [days, setDays] = useState(30)

  const { data: overview,   isLoading: loadingOv } = useAnalyticsOverview(postType, days)
  const { data: timeseries, isLoading: loadingTs } = useAnalyticsTimeseries(postType, days)
  const { data: topPosts,   isLoading: loadingTop } = useAnalyticsTopPosts(postType, days)
  const { data: breakdown,  isLoading: loadingBd } = useAnalyticsBreakdown(postType, days)

  // Format timeseries for EvilAreaChart
  const chartData = (timeseries ?? []).map(d => ({
    day:            fmtDate(d.day),
    views:          d.views,
    uniqueVisitors: d.uniqueVisitors,
  }))

  // Format devices for EvilPieChart
  const devices = (breakdown ?? []).filter(b => b.dimension === 'device')
  const pieDeviceData = devices.map(d => ({ name: d.value, count: d.count }))
  const pieDeviceConfig = Object.fromEntries(
    devices.map(d => [
      d.value,
      {
        label: d.value.charAt(0).toUpperCase() + d.value.slice(1),
        colors: {
          light: [deviceColors[d.value]?.light ?? '#d4d4d4'],
          dark:  [deviceColors[d.value]?.dark  ?? '#555'],
        },
      },
    ])
  ) as ChartConfig

  const referrers = (breakdown ?? []).filter(b => b.dimension === 'referrer').slice(0, 8)
  const totalReferrers = referrers.reduce((s, r) => s + r.count, 0)

  const scrollDep = (breakdown ?? [])
    .filter(b => b.dimension === 'scroll')
    .sort((a, b) => Number(a.value) - Number(b.value))
    .map(d => ({ label: `${d.value}%`, count: d.count }))

  const isEmpty = !loadingOv && (overview?.totalViews ?? 0) === 0

  return (
    <div className="space-y-5 pb-8">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-[1.2px] uppercase text-muted-foreground">
          {postType === 'blog' ? 'Blog' : 'News'} Analytics
        </p>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {RANGES.map(r => (
            <button
              key={r.value}
              type="button"
              onClick={() => setDays(r.value)}
              className={[
                'px-3 py-1 rounded-md text-[12px] font-medium transition-all',
                days === r.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <BarChart2 className="size-10 opacity-30" />
          <p className="text-[14px] font-medium">No data yet</p>
          <p className="text-[12px] opacity-60">Analytics appear once readers visit published posts</p>
        </div>
      )}

      {!isEmpty && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard icon={Eye}          label="Total Views"      value={loadingOv ? null : fmtNum(overview?.totalViews ?? 0)} />
            <KpiCard icon={Users}        label="Unique Visitors"  value={loadingOv ? null : fmtNum(overview?.uniqueVisitors ?? 0)} />
            <KpiCard icon={Clock}        label="Avg Read Time"    value={loadingOv ? null : fmtTime(overview?.avgTimeSpent ?? 0)} />
            <KpiCard icon={CheckCircle2} label="Completion Rate"  value={loadingOv ? null : `${(overview?.completionRate ?? 0).toFixed(1)}%`} />
          </div>

          {/* Views over time — EvilAreaChart */}
          <Card className="border-border">
            <CardHeader className="pb-0 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Views Over Time</CardTitle>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-0.5 rounded bg-[#0A0A67]" /> Views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-0.5 rounded bg-[#a1a1a1]" /> Unique
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-2">
              <EvilAreaChart
                data={chartData}
                chartConfig={viewsConfig}
                xDataKey="day"
                areaVariant="gradient"
                strokeVariant="solid"
                curveType="monotone"
                showBrush={chartData.length > 14}
                isLoading={loadingTs}
                loadingPoints={14}
                hideLegend
                className="h-[280px] w-full"
                tickGap={28}
              />
            </CardContent>
          </Card>

          {/* Top posts + Scroll depth */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            {/* Top posts */}
            <Card className="md:col-span-3 border-border">
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Top Posts</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-2">
                {loadingTop ? (
                  <div className="px-5 space-y-2 pt-1">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-9 w-full" />)}
                  </div>
                ) : (
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b border-border">
                        {['Post', 'Views', 'Unique', 'Avg Time', 'Done'].map(h => (
                          <th key={h} className="text-left px-5 py-2 text-[10px] font-bold tracking-[0.8px] uppercase text-muted-foreground first:w-[40%]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(topPosts ?? []).map((p, i) => (
                        <tr key={p.postId} className={i % 2 === 1 ? 'bg-muted/40' : ''}>
                          <td className="px-5 py-2.5 font-medium text-foreground">
                            <span className="truncate block max-w-[160px]">Post {p.postId.slice(0, 8)}…</span>
                          </td>
                          <td className="px-5 py-2.5 tabular-nums font-semibold">{fmtNum(p.views)}</td>
                          <td className="px-5 py-2.5 tabular-nums text-muted-foreground">{fmtNum(p.uniqueVisitors)}</td>
                          <td className="px-5 py-2.5 text-muted-foreground">{fmtTime(p.avgTimeSpent)}</td>
                          <td className="px-5 py-2.5">
                            <Badge variant="secondary" className="text-[10px] tabular-nums">
                              {p.completionRate.toFixed(0)}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {!topPosts?.length && (
                        <tr>
                          <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-[12px]">
                            No post data yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>

            {/* Scroll depth */}
            <Card className="md:col-span-2 border-border">
              <CardHeader className="pb-1 pt-4 px-5">
                <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Scroll Depth</CardTitle>
                <p className="text-[11px] text-muted-foreground">Sessions reaching each milestone</p>
              </CardHeader>
              <CardContent className="px-3 pb-4">
                {loadingBd ? (
                  <Skeleton className="h-[200px] w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={scrollDep} layout="vertical" margin={{ top: 4, right: 48, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="label"
                        tick={{ fontSize: 12, fill: '#737373' }}
                        tickLine={false}
                        axisLine={false}
                        width={36}
                      />
                      <Tooltip
                        formatter={(v: unknown) => [fmtNum(Number(v)), 'Sessions']}
                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #ececf0' }}
                      />
                      <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={22} label={{ position: 'right', fontSize: 11, fill: '#a1a1a1' }}>
                        {scrollDep.map((_, i) => (
                          <Cell key={i} fill={`rgba(10,10,103,${1 - i * 0.2})`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Devices (EvilPieChart) + Referrers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Devices — EvilPieChart donut */}
            <Card className="border-border">
              <CardHeader className="pb-0 pt-4 px-5">
                <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Devices</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                {devices.length === 0 && !loadingBd ? (
                  <div className="flex items-center justify-center h-[220px] text-muted-foreground text-[12px]">No data</div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <EvilPieChart
                        data={pieDeviceData}
                        dataKey="count"
                        nameKey="name"
                        chartConfig={pieDeviceConfig}
                        innerRadius="55%"
                        outerRadius="80%"
                        isLoading={loadingBd}
                        isClickable
                        className="h-[200px]"
                      />
                    </div>
                    <div className="space-y-3 shrink-0 pr-2">
                      {devices.map(d => {
                        const Icon = DEVICE_ICON[d.value] ?? Monitor
                        const total = devices.reduce((s, x) => s + x.count, 0)
                        const pct = total ? Math.round(d.count / total * 100) : 0
                        return (
                          <div key={d.value} className="flex items-center gap-2 text-[12px]">
                            <div
                              className="size-2.5 rounded-full shrink-0"
                              style={{ background: deviceColors[d.value]?.light ?? '#d4d4d4' }}
                            />
                            <Icon className="size-3 text-muted-foreground" />
                            <span className="text-foreground capitalize">{d.value}</span>
                            <span className="text-muted-foreground ml-1 tabular-nums">{pct}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Referrers */}
            <Card className="border-border">
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-4 space-y-3">
                {loadingBd
                  ? [...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)
                  : referrers.length === 0
                    ? <p className="text-[12px] text-muted-foreground py-6 text-center">No referrer data</p>
                    : referrers.map(r => {
                        const pct = totalReferrers ? Math.round(r.count / totalReferrers * 100) : 0
                        return (
                          <div key={r.value} className="space-y-1">
                            <div className="flex items-center justify-between text-[12px]">
                              <span className="text-foreground truncate max-w-[200px]">{r.value}</span>
                              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                                <span className="tabular-nums">{fmtNum(r.count)}</span>
                                <span className="tabular-nums font-medium text-foreground w-8 text-right">{pct}%</span>
                              </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-[#0A0A67]/8 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#0A0A67] transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        )
                      })
                }
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

function KpiCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null }) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-1 pt-4 px-5 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-[10px] font-bold tracking-[1px] uppercase text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className="size-3.5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-5 pb-4">
        {value === null
          ? <Skeleton className="h-8 w-24 mt-1" />
          : <p className="text-[28px] font-bold tracking-[-1px] text-foreground tabular-nums">{value}</p>
        }
      </CardContent>
    </Card>
  )
}
