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

// Estilos y campo de texto compartidos por las tarjetas del form de Summer Camp.
export const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
export const cardCls = 'rounded-[10px] border border-border bg-card p-5'
export const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

interface TextFieldProps {
  name: string
  label: string
  placeholder?: string
  hint?: string
  /** Filas > 0 = textarea. */
  rows?: number
  className?: string
}

export function TextField({ name, label, placeholder, hint, rows, className }: TextFieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
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
