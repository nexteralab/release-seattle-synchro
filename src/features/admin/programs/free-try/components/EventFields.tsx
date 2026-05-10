import { Calendar } from 'lucide-react'
import { Input } from '#/components/ui/input'
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

export function EventFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Calendar size={13} className="text-[#0A0A67]" />
        Event Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Date</FormLabel>
              <FormControl>
                <Input {...field} placeholder="June 7th, 2026" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
        <FormField
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Time</FormLabel>
              <FormControl>
                <Input {...field} placeholder="11:30 am – 12:00 pm" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
        <FormField
          name="ages"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Ages</FormLabel>
              <FormControl>
                <Input {...field} placeholder="7 – 11 years old" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
