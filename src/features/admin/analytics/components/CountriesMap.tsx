import { Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Map, MapControls, MapMarker, MarkerContent, MarkerTooltip } from '#/components/ui/map'
import type { DimPoint } from '../services/reports.service'
import { COUNTRY_CENTROIDS, countryFlag, countryName } from './country-centroids'

const fmtNum = (n: number) => n.toLocaleString('en-US')

/**
 * Radio del punto proporcional a la raíz del conteo: el área queda proporcional
 * al valor, que es como el ojo compara círculos.
 */
const dotSize = (count: number, max: number) =>
  10 + Math.round(Math.sqrt(count / max) * 26)

export function CountriesMap({ countries }: { countries: DimPoint[] }) {
  const located = countries.filter((c) => COUNTRY_CENTROIDS[c.value.toUpperCase()])
  const max = Math.max(1, ...located.map((c) => c.count))
  const total = countries.reduce((sum, c) => sum + c.count, 0)

  return (
    <Card className="border-border overflow-hidden py-0">
      <CardHeader className="px-5 pb-2 pt-4">
        <CardTitle className="flex items-center gap-1.5 text-[13px] font-bold tracking-[0.3px]">
          <Globe className="size-3.5" />
          Sessions by country
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-0 px-0 pb-0 lg:grid-cols-[1.4fr_1fr]">
        <div className="h-[320px] w-full border-b border-border lg:border-b-0 lg:border-r">
          <Map
            className="h-full w-full"
            center={[10, 25]}
            zoom={0.6}
            minZoom={0}
            maxZoom={6}
            dragRotate={false}
            attributionControl={false}
          >
            <MapControls />
            {located.map((c) => {
              const [lng, lat] = COUNTRY_CENTROIDS[c.value.toUpperCase()]
              const size = dotSize(c.count, max)
              return (
                <MapMarker key={c.value} longitude={lng} latitude={lat}>
                  <MarkerContent>
                    <div
                      className="flex items-center justify-center rounded-full bg-primary/30 ring-1 ring-primary/60"
                      style={{ width: size, height: size }}
                    >
                      <span className="size-1.5 rounded-full bg-primary" />
                    </div>
                  </MarkerContent>
                  <MarkerTooltip>
                    <span className="text-[12px] font-medium">
                      {countryFlag(c.value)} {countryName(c.value)} · {fmtNum(c.count)}
                    </span>
                  </MarkerTooltip>
                </MapMarker>
              )
            })}
          </Map>
        </div>

        <div className="max-h-[320px] overflow-y-auto">
          {countries.length ? (
            <div className="divide-y divide-border">
              {countries.map((c) => (
                <div key={c.value} className="flex items-center gap-2.5 px-5 py-2.5">
                  <span className="text-[15px] leading-none">{countryFlag(c.value)}</span>
                  <span className="truncate text-[13px] text-foreground">
                    {countryName(c.value)}
                  </span>
                  <span className="tabular ml-auto shrink-0 text-[13px] font-bold text-foreground">
                    {fmtNum(c.count)}
                  </span>
                  <span className="tabular w-10 shrink-0 text-right text-[12px] text-muted-foreground">
                    {total ? `${Math.round((c.count / total) * 100)}%` : '—'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-5 py-8 text-center text-[13px] text-muted-foreground">
              No sessions yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
