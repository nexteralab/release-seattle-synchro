import { Link2 } from 'lucide-react'
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

export function RegisterField() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Link2 size={13} className="text-[#0A0A67]" />
        Registration
      </h3>
      <FormField
        name="registerUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={labelCls}>Register URL</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
                className="text-[13px]"
              />
            </FormControl>
            <FormDescription className="text-[11px]">
              Link externo del formulario de registro (botones "Register Now").
            </FormDescription>
            <FormMessage className="text-[11px]" />
          </FormItem>
        )}
      />
    </div>
  )
}
