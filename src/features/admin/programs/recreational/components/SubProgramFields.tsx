import { Users, Calendar, DollarSign } from 'lucide-react'
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
import type { RecreationalSubProgram } from '#/features/programs/recreational/types'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

type FieldKey = Exclude<keyof RecreationalSubProgram, 'id' | 'name'>

interface Props {
  index: number
  showScheduleNote: boolean
  showDuration: boolean
  showCostNote: boolean
}

export function SubProgramFields({
  index,
  showScheduleNote,
  showDuration,
  showCostNote,
}: Props) {
  return (
    <>
      {/* Card 1: Basics */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <Users size={13} className="text-[#0A0A67]" />
          Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
          <TextField index={index} field="ages" label="Ages" placeholder="5–10" />
          <TextField index={index} field="coach" label="Coach" placeholder="Sophie Lin & Daniela Garmendia" />
        </div>
      </div>

      {/* Card 2: Schedule */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <Calendar size={13} className="text-[#0A0A67]" />
          Schedule
        </h3>
        <div className="space-y-4">
          <TextField
            index={index}
            field="workout_days_times"
            label="Workout Days / Times"
            placeholder="Fridays 4:00-5:00pm"
          />
          {showScheduleNote && (
            <TextField
              index={index}
              field="schedule_note"
              label="Schedule Note"
              placeholder="No class Friday May 15th. Last class June 5th."
              description="Optional — déjalo vacío si no aplica."
            />
          )}
          {showDuration && (
            <TextField
              index={index}
              field="duration"
              label="Duration"
              placeholder="8-week session"
              description="Optional — déjalo vacío si no aplica."
            />
          )}
        </div>
      </div>

      {/* Card 3: Cost */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <DollarSign size={13} className="text-[#0A0A67]" />
          Cost
        </h3>
        <div className="space-y-4">
          <TextField
            index={index}
            field="cost"
            label="Cost"
            placeholder="$50 registration fee + $60 March dues"
          />
          {showCostNote && (
            <TextAreaField
              index={index}
              field="cost_note"
              label="Cost Note"
              placeholder="Pool fees should be covered through one payment to the booster club (approximately $280)"
              description="Optional — déjalo vacío si no aplica."
              rows={2}
            />
          )}
        </div>
      </div>
    </>
  )
}

// ── Field helpers ────────────────────────────────────────

interface BaseProps {
  index: number
  field: FieldKey
  label: string
  placeholder?: string
  description?: string
}

function TextField({ index, field, label, placeholder, description }: BaseProps) {
  return (
    <FormField
      name={`sub_programs.${index}.${field}` as const}
      render={({ field: rhfField }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <FormControl>
            <Input {...rhfField} placeholder={placeholder} className="text-[13px]" />
          </FormControl>
          {description && (
            <FormDescription className="text-[11px]">{description}</FormDescription>
          )}
          <FormMessage className="text-[11px]" />
        </FormItem>
      )}
    />
  )
}

interface TextAreaProps extends BaseProps {
  rows?: number
}

function TextAreaField({ index, field, label, placeholder, description, rows = 2 }: TextAreaProps) {
  return (
    <FormField
      name={`sub_programs.${index}.${field}` as const}
      render={({ field: rhfField }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...rhfField}
              rows={rows}
              placeholder={placeholder}
              className="text-[13px] resize-y"
            />
          </FormControl>
          {description && (
            <FormDescription className="text-[11px]">{description}</FormDescription>
          )}
          <FormMessage className="text-[11px]" />
        </FormItem>
      )}
    />
  )
}
