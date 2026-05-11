import { useFieldArray, useFormContext } from 'react-hook-form'
import { Users, Plus, Trash2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '#/components/ui/form'
import type { EliteClinicFormValues } from '../schema'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

const ROLE_OPTIONS = [
  { value: 'Head Coach', label: 'Head Coach' },
  { value: 'Assistant Coach', label: 'Assistant Coach' },
]

export function CoachesList() {
  const { control } = useFormContext<EliteClinicFormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'coaches',
  })

  return (
    <div className={cardCls}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cardTitle.replace('mb-4', '')}>
          <Users size={13} className="text-[#0A0A67]" />
          Coaches
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: '', role: 'Assistant Coach' })}
        >
          <Plus size={13} /> Add Coach
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, i) => (
          <div
            key={field.id}
            className="flex items-start gap-3 border border-border rounded-[8px] p-3"
          >
            <div className="grid grid-cols-[1fr_180px] gap-2 flex-1">
              <FormField
                name={`coaches.${i}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelCls}>Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Tammy Mcgregor" className="text-[13px]" />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
              <FormField
                name={`coaches.${i}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelCls}>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-[13px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_OPTIONS.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-destructive hover:opacity-70 mt-6 shrink-0"
              aria-label="Remove coach"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {fields.length === 0 && (
          <p className="text-[13px] text-muted-foreground">No coaches yet.</p>
        )}
      </div>
    </div>
  )
}
