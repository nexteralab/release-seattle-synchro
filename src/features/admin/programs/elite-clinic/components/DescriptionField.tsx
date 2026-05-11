import { FileText } from 'lucide-react'
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

export function DescriptionField() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <FileText size={13} className="text-[#0A0A67]" />
        Description
      </h3>
      <FormField
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={labelCls}>About the Clinic</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={4}
                placeholder="Join us for an exciting clinic led by top-level coaches…"
                className="text-[13px] resize-y"
              />
            </FormControl>
            <FormDescription className="text-[11px]">
              Texto descriptivo mostrado en la sección "About the Clinic". Incluye detalles de discounts.
            </FormDescription>
            <FormMessage className="text-[11px]" />
          </FormItem>
        )}
      />
    </div>
  )
}
