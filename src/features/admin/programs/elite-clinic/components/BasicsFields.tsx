import { Calendar, Target } from 'lucide-react'
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

export function BasicsFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Calendar size={13} className="text-[#0A0A67]" />
        Event Basics
      </h3>
      <div className="space-y-4">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Elite Clinic 2026" className="text-[13px]" />
              </FormControl>
              <FormDescription className="text-[11px]">
                Usado en el hero y en SEO. Incluye el año.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="dates"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Dates</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="July 27th – 30th, 2026" className="text-[13px]" />
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
                  <Input {...field} placeholder="8:00 AM – 1:30 PM" className="text-[13px]" />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="minimumLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>
                <span className="inline-flex items-center gap-1.5">
                  <Target size={11} /> Minimum Level
                </span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Level Testing 3" className="text-[13px]" />
              </FormControl>
              <FormDescription className="text-[11px]">
                Requisito de nivel mínimo para participar.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
