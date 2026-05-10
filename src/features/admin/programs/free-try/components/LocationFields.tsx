import { MapPin } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '#/components/ui/form'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

export function LocationFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <MapPin size={13} className="text-[#0A0A67]" />
        Location
      </h3>
      <div className="space-y-4">
        <FormField
          name="location.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Newport Hills" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
        <FormField
          name="location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Address</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={2}
                  placeholder={'Swim and Tennis Club\nAthletic Excellence Center'}
                  className="text-[13px] resize-y"
                />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
