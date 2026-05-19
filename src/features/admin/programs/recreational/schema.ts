import { z } from 'zod'
import type { RecreationalSubProgramId } from '#/features/programs/recreational/types'
import { DEFAULT_CONFIG } from './recreational-admin.service'

export const subProgramSchema = z.object({
  id: z.enum(['sharks-mermaids']),
  name: z.string().min(1),
  ages: z.string().min(1, 'Required'),
  coach: z.string().min(1, 'Required'),
  workout_days_times: z.string().min(1, 'Required'),
  schedule_note: z.string(),
  duration: z.string(),
  cost: z.string().min(1, 'Required'),
  cost_note: z.string(),
})

export const recreationalFormSchema = z.object({
  sub_programs: z.array(subProgramSchema),
})

export type RecreationalFormValues = z.infer<typeof recreationalFormSchema>

export const TABS: { id: RecreationalSubProgramId; label: string }[] = [
  { id: 'sharks-mermaids', label: 'Sharks & Mermaids' },
]

export const TAB_INDEX: Record<RecreationalSubProgramId, number> = {
  'sharks-mermaids': 0,
}

export const FORM_DEFAULTS: RecreationalFormValues = {
  sub_programs: DEFAULT_CONFIG.sub_programs,
}
