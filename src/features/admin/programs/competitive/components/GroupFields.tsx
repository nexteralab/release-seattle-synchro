import { Users } from 'lucide-react'
import { LinesField, TextField, cardCls, cardTitle } from './fields'

interface Props {
  name: 'under12' | 'teen' | 'junior'
  label: string
}

export function GroupFields({ name, label }: Props) {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Users size={13} className="text-primary" />
        {label}
      </h3>
      <div className="space-y-4">
        <TextField name={`${name}.title`} label="Title" />
        <TextField
          name={`${name}.description`}
          label="Description (optional)"
          rows={3}
          hint="Vacío = no se muestra."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name={`${name}.coaches`}
            label="Coaches"
            rows={4}
            placeholder={'Name 1\nA Team: Name 2'}
            hint='Uno por línea. Usa "A Team: …" para sub-equipos.'
          />
          <TextField
            name={`${name}.workoutDays`}
            label="Workout Days"
            placeholder="Monday, Wednesday & Saturday morning"
          />
        </div>
        {name === 'junior' && (
          <>
            <TextField name="junior.highlightsTitle" label="Highlights title" placeholder="Program Highlights" />
            <LinesField name="junior.highlights" label="Highlights" placeholder={'10 months of training per year\nMinimum of 8 meets per year'} />
          </>
        )}
      </div>
    </div>
  )
}
