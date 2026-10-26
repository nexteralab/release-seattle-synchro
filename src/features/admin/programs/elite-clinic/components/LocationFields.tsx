import { MapPin } from 'lucide-react'
import { Input } from '#/components/ui/input'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '#/components/ui/form'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

const FIELDS = [
  { name: 'location.venue', label: 'Venue', placeholder: 'Newport Hills Swim and Tennis Club', hint: 'Se muestra en el hero.' },
  { name: 'location.city', label: 'City', placeholder: 'Seattle, Washington', hint: 'Se muestra en el hero junto al venue.' },
  { name: 'location.poolAddress', label: 'Pool', placeholder: '5464 119th Ave SE, Bellevue, WA 98006', hint: 'Dirección de la piscina en Camp Details.' },
  { name: 'location.crossfitAddress', label: 'Special Activities', placeholder: 'Grey Coast Crossfit · 5620 119th Ave SE B, Bellevue', hint: 'Opcional. Si queda vacío, no se muestra.' },
] as const

export function LocationFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <MapPin size={13} className="text-primary" />
        Location
      </h3>
      <div className="space-y-4">
        {FIELDS.map(f => (
          <FormField
            key={f.name}
            name={f.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>{f.label}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={f.placeholder} className="text-[13px]" />
                </FormControl>
                <FormDescription className="text-[11px]">{f.hint}</FormDescription>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  )
}
