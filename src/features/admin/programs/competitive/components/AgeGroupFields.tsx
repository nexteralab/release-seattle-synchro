import { Users, Calendar } from 'lucide-react'
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

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

interface Props {
  index: number
}

export function AgeGroupFields({ index }: Props) {
  const basePath = `age_groups.${index}` as const

  return (
    <>
      {/* Card 1: Coaches */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <Users size={13} className="text-[#0A0A67]" />
          Coaches
        </h3>
        <FormField
          name={`${basePath}.coaches`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Coach Names</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={Math.max(3, ((field.value as string)?.match(/\n/g)?.length ?? 0) + 1)}
                  className="text-[13px] leading-relaxed resize-y font-mono"
                  placeholder={'Name 1\nName 2\nA Team: Name 3'}
                />
              </FormControl>
              <FormDescription className="text-[11px]">
                One name per line. Use "A Team: …" format for sub-teams.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>

      {/* Card 2: Workout days */}
      <div className={cardCls}>
        <h3 className={cardTitle}>
          <Calendar size={13} className="text-[#0A0A67]" />
          Schedule
        </h3>
        <FormField
          name={`${basePath}.workout_days`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Workout Days</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Monday, Wednesday & Saturday morning"
                  className="text-[13px]"
                />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
