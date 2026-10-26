import { Type } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
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

export function OverviewFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Type size={13} className="text-primary" />
        Overview
      </h3>
      <div className="space-y-4">
        <FormField
          name="overview.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Title (H1)</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} placeholder={'Beginner Competitive\nPrograms'} className="text-[13px] resize-y" />
              </FormControl>
              <FormDescription className="text-[11px]">
                Título principal de la página (SEO). Cada línea es un salto de línea.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
        <FormField
          name="overview.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Description</FormLabel>
              <FormControl>
                <Input {...field} className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
