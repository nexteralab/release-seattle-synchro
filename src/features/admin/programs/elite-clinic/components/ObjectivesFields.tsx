import { Sparkles } from 'lucide-react'
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

export function ObjectivesFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Sparkles size={13} className="text-primary" />
        Camp Objectives
      </h3>
      {/* La página pinta 3 objetivos fijos, cada uno con su ícono. */}
      <div className="space-y-4">
        {[0, 1, 2].map(i => (
          <FormField
            key={i}
            name={`objectives.${i}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Objective {i + 1}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Refine basic technique" className="text-[13px]" />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  )
}
