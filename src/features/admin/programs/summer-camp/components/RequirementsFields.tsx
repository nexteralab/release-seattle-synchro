import { useFieldArray, useFormContext } from 'react-hook-form'
import { ListChecks, Plus, Trash2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import type { SummerCampFormValues } from '../schema'
import { cardCls, cardTitle, TextField } from './fields'

export function RequirementsFields() {
  const { control } = useFormContext<SummerCampFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: 'requirements.items' })

  return (
    <div className={cardCls}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cardTitle.replace('mb-4', '')}>
          <ListChecks size={13} className="text-primary" />
          What Do You Need?
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: '', note: '', link: '', linkLabel: '' })}
        >
          <Plus size={13} /> Add Item
        </Button>
      </div>

      <div className="space-y-3">
        <TextField name="requirements.heading" label="Heading" placeholder="What Do You Need?" />
        {fields.map((f, i) => (
          <div key={f.id} className="flex items-start gap-3 border border-border rounded-[8px] p-3">
            <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
              <TextField name={`requirements.items.${i}.name`} label="Item" placeholder="Swim Cap" />
              <TextField name={`requirements.items.${i}.note`} label="Note (optional)" placeholder="Recommendations" />
              <TextField name={`requirements.items.${i}.link`} label="Link (optional)" placeholder="https://…" />
              <TextField name={`requirements.items.${i}.linkLabel`} label="Link text" placeholder="View on Amazon" />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-destructive hover:opacity-70 mt-6 shrink-0"
              aria-label="Remove item"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
