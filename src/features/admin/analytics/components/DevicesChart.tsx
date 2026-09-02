import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '#/components/ui/card'
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from '#/components/ui/chart'
import type { DeviceDay } from '../services/reports.service'

const chartConfig = {
  sessions: { label: 'Sessions' },
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  tablet: { label: 'Tablet', color: 'var(--chart-3)' },
} satisfies ChartConfig

type DeviceKey = 'desktop' | 'mobile' | 'tablet'
const DEVICES: DeviceKey[] = ['desktop', 'mobile', 'tablet']

const fmtDay = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

export function DevicesChart({ series }: { series: DeviceDay[] }) {
  const [active, setActive] = useState<DeviceKey>('desktop')

  const totals = useMemo(
    () =>
      series.reduce(
        (acc, d) => ({
          desktop: acc.desktop + Number(d.desktop),
          mobile: acc.mobile + Number(d.mobile),
          tablet: acc.tablet + Number(d.tablet),
        }),
        { desktop: 0, mobile: 0, tablet: 0 },
      ),
    [series],
  )

  // Tablet suele venir en cero: no vale una pestaña muerta ocupando espacio.
  const shown = DEVICES.filter((d) => d !== 'tablet' || totals.tablet > 0)

  return (
    <Card className="border-border py-0">
      <CardHeader className="flex flex-col items-stretch border-b border-border p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-5 pb-3 pt-4 sm:py-0!">
          <CardTitle className="text-[13px] font-bold tracking-[0.3px]">Devices</CardTitle>
          <CardDescription className="text-[12px]">
            Sessions per day by device type
          </CardDescription>
        </div>
        <div className="flex">
          {shown.map((key) => (
            <button
              key={key}
              type="button"
              data-active={active === key}
              onClick={() => setActive(key)}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-border px-5 py-3 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-6 sm:py-4"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="tabular text-lg font-bold leading-none sm:text-2xl">
                {totals[key].toLocaleString('en-US')}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 py-4 sm:px-5">
        {series.length ? (
          <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
            <BarChart accessibilityLayer data={series} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={fmtDay}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[160px]"
                    nameKey="sessions"
                    labelFormatter={(value) =>
                      new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    }
                  />
                }
              />
              <Bar dataKey={active} fill={`var(--color-${active})`} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="py-16 text-center text-[13px] text-muted-foreground">
            No sessions yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
