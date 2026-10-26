import { useFieldArray, useFormContext } from 'react-hook-form'
import { ChevronDown, ChevronUp, Plus, Trash2, type LucideIcon } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription,
} from '#/components/ui/form'

// Piezas de formulario que repiten todas las secciones de Recreational.

export const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase'

export function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={cardCls}>
      <h3 className={`${cardTitle} mb-4`}>
        <Icon size={13} className="text-primary" />
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

interface TextFieldProps {
  name: string
  label: string
  placeholder?: string
  hint?: string
  /** Filas del textarea; sin esto es un Input. */
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

/** Lista de textos simples: un ítem por línea. */
export function LinesField({ name, label, rows = 4 }: { name: string; label: string; rows?: number }) {
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

interface ObjectListProps {
  name: string
  label: string
  addLabel: string
  newItem: Record<string, string>
  /** Campos de un ítem; `prefix` es `${name}.${i}`. */
  renderItem: (prefix: string) => React.ReactNode
  emptyText?: string
}

/** Lista de objetos con agregar, reordenar y borrar (FAQ, filas, tarjetas). */
export function ObjectList({ name, label, addLabel, newItem, renderItem, emptyText }: ObjectListProps) {
  const { control } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className={labelCls}>
          {label}
          <span className="ml-1.5 font-normal normal-case tracking-normal text-muted-foreground">
            {fields.length}
          </span>
        </p>
        <Button type="button" variant="outline" size="sm" onClick={() => append(newItem)}>
          <Plus className="mr-1.5 size-3.5" />
          {addLabel}
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="rounded-[8px] border border-dashed border-border px-4 py-6 text-center text-[12px] text-muted-foreground">
          {emptyText ?? 'Nothing here yet.'}
        </p>
      )}

      {fields.map((item, i) => (
        <div key={item.id} className="rounded-[8px] border border-border bg-background p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <Button
                type="button" variant="ghost" size="icon" className="size-7"
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
                aria-label={`Move item ${i + 1} up`}
              >
                <ChevronUp className="size-3.5" />
              </Button>
              <Button
                type="button" variant="ghost" size="icon" className="size-7"
                disabled={i === fields.length - 1}
                onClick={() => move(i, i + 1)}
                aria-label={`Move item ${i + 1} down`}
              >
                <ChevronDown className="size-3.5" />
              </Button>
              <Button
                type="button" variant="ghost" size="icon"
                className="size-7 text-muted-foreground hover:text-destructive"
                onClick={() => remove(i)}
                aria-label={`Delete item ${i + 1}`}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <div className="space-y-3">{renderItem(`${name}.${i}`)}</div>
        </div>
      ))}
    </div>
  )
}

/** Ítems "lead en negrita + resto" de las listas con check. */
export function LeadItemsField({ name, label }: { name: string; label: string }) {
  return (
    <ObjectList
      name={name}
      label={label}
      addLabel="Add item"
      newItem={{ lead: '', rest: '' }}
      renderItem={(p) => (
        <>
          <TextField name={`${p}.lead`} label="Bold lead" />
          <TextField name={`${p}.rest`} label="Rest of the sentence" />
        </>
      )}
    />
  )
}
