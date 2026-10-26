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

export const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
export const cardCls = 'rounded-[10px] border border-border bg-card p-5'
export const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

interface FieldProps {
  name: string
  label: string
  placeholder?: string
  hint?: string
  /** Filas > 0 = textarea. */
  rows?: number
}

export function TextField({ name, label, placeholder, hint, rows }: FieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <FormControl>
            {rows ? (
              <Textarea {...field} rows={rows} placeholder={placeholder} className="text-[13px] resize-y" />
            ) : (
              <Input {...field} placeholder={placeholder} className="text-[13px]" />
            )}
          </FormControl>
          {hint && <FormDescription className="text-[11px]">{hint}</FormDescription>}
          <FormMessage className="text-[11px]" />
        </FormItem>
      )}
    />
  )
}

/** string[] editado como textarea, un ítem por línea. */
export function LinesField({ name, label, placeholder, rows = 5 }: FieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <FormControl>
            <Textarea
              value={(field.value as string[]).join('\n')}
              onChange={e => field.onChange(e.target.value.split('\n'))}
              onBlur={() => field.onChange((field.value as string[]).map(s => s.trim()).filter(Boolean))}
              rows={rows}
              placeholder={placeholder}
              className="text-[13px] resize-y"
            />
          </FormControl>
          <FormDescription className="text-[11px]">Un ítem por línea.</FormDescription>
          <FormMessage className="text-[11px]" />
        </FormItem>
      )}
    />
  )
}
