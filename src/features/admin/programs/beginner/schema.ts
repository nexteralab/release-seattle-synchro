import { z } from 'zod'
import { DEFAULT_CONFIG } from './beginner-admin.service'

export const subProgramSchema = z.object({
  id: z.enum(['novice', 'intermediate']),
  name: z.string().min(1),
  ages: z.string().min(1, 'Required'),
  coaches: z.string().min(1, 'Required'),
  workout_days_times: z.string().min(1, 'Required'),
  location: z.string(),
  dates: z.string(),
  cost: z.string(),
  registration: z.string(),
  first_practice_date_time: z.string(),
  first_practice_address: z.string(),
})

export const beginnerFormSchema = z.object({
  novice: subProgramSchema,
  intermediate: subProgramSchema,
})

export type BeginnerFormValues = z.infer<typeof beginnerFormSchema>
export type ProgramPath = 'novice' | 'intermediate'

export const FORM_DEFAULTS: BeginnerFormValues = {
  novice: DEFAULT_CONFIG.sub_programs.find(p => p.id === 'novice')!,
  intermediate: DEFAULT_CONFIG.sub_programs.find(p => p.id === 'intermediate')!,
}
