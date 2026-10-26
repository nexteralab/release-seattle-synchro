import { ClipboardList } from 'lucide-react'
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

/** Bloques que solo se muestran dentro de la sección Novice. */
export function NoviceExtrasFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <ClipboardList size={13} className="text-primary" />
        Novice — Tryouts & First Practice
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinesField name="tryouts.swimming_skills" label="Swimming Skills" />
          <LinesField name="tryouts.personal_qualities" label="Personal Qualities" />
        </div>
        <TextField name="tryouts.before_you_join" label="Before You Join" rows={3} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinesField name="first_practice.what_to_bring" label="What to Bring" />
          <TextField
            name="first_practice.what_to_expect"
            label="What to Expect"
            rows={8}
            hint="Cada línea es un salto de línea."
          />
        </div>
        <TextField
          name="note"
          label="Note"
          rows={2}
          hint="Aviso amarillo al final de Novice. Vacío = no se muestra."
        />
      </div>
    </div>
  )
}

function TextField({ name, label, rows, hint }: { name: string; label: string; rows: number; hint?: string }) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} rows={rows} className="text-[13px] resize-y" />
          </FormControl>
          {hint && <FormDescription className="text-[11px]">{hint}</FormDescription>}
          <FormMessage className="text-[11px]" />
        </FormItem>
      )}
    />
  )
}

// ponytail: textarea de una línea por ítem en vez de lista con add/remove.
function LinesField({ name, label }: { name: string; label: string }) {
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
              rows={8}
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
