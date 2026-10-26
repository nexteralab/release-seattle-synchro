import { Package } from 'lucide-react'
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

export function PackingListField() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Package size={13} className="text-primary" />
        Packing List
      </h3>
      {/* ponytail: textarea de una línea por ítem en vez de lista con add/remove. */}
      <FormField
        name="packingList"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={labelCls}>Items</FormLabel>
            <FormControl>
              <Textarea
                value={(field.value as string[]).join('\n')}
                onChange={e => field.onChange(e.target.value.split('\n'))}
                onBlur={() => field.onChange((field.value as string[]).map(s => s.trim()).filter(Boolean))}
                rows={6}
                placeholder={'Water Bottle\nTennis Shoes'}
                className="text-[13px] resize-y"
              />
            </FormControl>
            <FormDescription className="text-[11px]">Un ítem por línea.</FormDescription>
            <FormMessage className="text-[11px]" />
          </FormItem>
        )}
      />
    </div>
  )
}
