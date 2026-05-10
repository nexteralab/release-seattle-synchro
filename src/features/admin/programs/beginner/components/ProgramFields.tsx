import { Users, MapPin, Calendar, DollarSign, Sparkles } from 'lucide-react'
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
import type { BeginnerSubProgram } from '#/features/programs/beginner/types'
import type { ProgramPath } from '../schema'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

type FieldKey = Exclude<keyof BeginnerSubProgram, 'id' | 'name'>

interface Props {
  path: ProgramPath
  showFirstPractice: boolean
}

export function ProgramFields({ path, showFirstPractice }: Props) {
  return (
    <>
      {/* Card 1: Team & ages */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <Users size={13} className="text-[#0A0A67]" />
          Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
          <TextField path={path} field="ages" label="Ages" placeholder="5–10" />
          <TextAreaField
            path={path}
            field="coaches"
            label="Coaches"
            rows={3}
            mono
            placeholder={'Coach 1\nCoach 2\nCoach 3'}
            description="One per line."
          />
        </div>
      </div>

      {/* Card 2: Schedule & location */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <MapPin size={13} className="text-[#0A0A67]" />
          Schedule & Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextAreaField
            path={path}
            field="workout_days_times"
            label="Workout Days / Times"
            rows={3}
            placeholder={'Wednesday and Fridays\n5:00-7:00pm'}
          />
          <TextAreaField
            path={path}
            field="location"
            label="Location"
            rows={3}
            placeholder={'Bellevue Aquatic Center\n(Outdoor pool…)'}
          />
        </div>
      </div>

      {/* Card 3: Session info */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <Calendar size={13} className="text-[#0A0A67]" />
          Session Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextAreaField
            path={path}
            field="dates"
            label="Session Dates"
            rows={4}
            placeholder={'March 28th\nApril 4th, 11th…'}
          />
          <TextAreaField
            path={path}
            field="registration"
            label="Registration Note"
            rows={4}
            placeholder="We will open registration soon during the first week of September."
            description="Optional — déjalo vacío si no aplica."
          />
        </div>
      </div>

      {/* Card 4: Cost */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <DollarSign size={13} className="text-[#0A0A67]" />
          Cost
        </h3>
        <TextAreaField
          path={path}
          field="cost"
          label="Cost Lines"
          rows={4}
          placeholder={'$TBD monthly fee\nOne time registration fee\n…'}
          description="One line per item."
        />
      </div>

      {/* Card 5: First practice (Novice only) */}
      {showFirstPractice && (
        <div className={cardCls}>
          <h3 className={cardTitle}>
            <Sparkles size={13} className="text-[#0A0A67]" />
            First Practice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextAreaField
              path={path}
              field="first_practice_date_time"
              label="Date & Time"
              rows={2}
              placeholder={'Wednesday, September 3rd\n6:00pm – 7:30pm'}
            />
            <TextAreaField
              path={path}
              field="first_practice_address"
              label="Address"
              rows={2}
              placeholder={'Bellevue Aquatic Center\n601 143rd Ave NE, Bellevue, WA, 98007'}
            />
          </div>
        </div>
      )}
    </>
  )
}

// ── Field helpers ──────────────────────────────────────────

interface TextFieldProps {
  path: ProgramPath
  field: FieldKey
  label: string
  placeholder?: string
  description?: string
}

function TextField({ path, field, label, placeholder, description }: TextFieldProps) {
  return (
    <FormField
      name={`${path}.${field}` as const}
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

interface TextAreaFieldProps extends TextFieldProps {
  rows?: number
  mono?: boolean
}

function TextAreaField({
  path,
  field,
  label,
  placeholder,
  description,
  rows = 3,
  mono = false,
}: TextAreaFieldProps) {
  return (
    <FormField
      name={`${path}.${field}` as const}
      render={({ field: rhfField }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...rhfField}
              rows={rows}
              placeholder={placeholder}
              className={`text-[13px] resize-y${mono ? ' font-mono' : ''}`}
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
