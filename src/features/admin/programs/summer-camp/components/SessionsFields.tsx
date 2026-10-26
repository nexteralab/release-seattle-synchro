import { useFieldArray, useFormContext } from 'react-hook-form'
import { CalendarDays, Plus, Trash2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import type { SummerCampFormValues } from '../schema'
import { cardCls, cardTitle, TextField } from './fields'

export function SessionsFields() {
  const { control } = useFormContext<SummerCampFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: 'sessions' })

  return (
    <div className={cardCls}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cardTitle.replace('mb-4', '')}>
          <CalendarDays size={13} className="text-primary" />
          Sessions & Pricing
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: '', dates: '', address: '', register_url: '' })}
        >
          <Plus size={13} /> Add Session
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField name="dates.kicker" label="Kicker" placeholder="Mark Your Calendar" />
          <TextField name="dates.registerLabel" label="Session button" placeholder="Register" />
        </div>
        <TextField
          name="dates.heading"
          label="Heading"
          rows={2}
          hint="Cada línea nueva corta el título en desktop."
        />

        {fields.map((f, i) => (
          <div key={f.id} className="border border-border rounded-[8px] p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[1px] uppercase text-muted-foreground">
                Session {i + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-destructive hover:opacity-70"
                aria-label="Remove session"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <TextField name={`sessions.${i}.name`} label="Name" placeholder="July in Bellevue…" />
              <TextField
                name={`sessions.${i}.dates`}
                label="Dates"
                placeholder="July 27 – July 31, 2026"
                hint="La primera palabra (el mes) se muestra aparte."
              />
            </div>
            <TextField name={`sessions.${i}.address`} label="Address" rows={2} placeholder={'Club name\nAddress'} />
            <TextField name={`sessions.${i}.register_url`} label="Register link" placeholder="https://…" />
          </div>
        ))}
        {fields.length === 0 && <p className="text-[13px] text-muted-foreground">No sessions yet.</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField name="dates.investmentLabel" label="Price label" placeholder="Investment" />
          <TextField name="price_per_week" label="Price" placeholder="$330 per week" />
        </div>
      </div>
    </div>
  )
}
