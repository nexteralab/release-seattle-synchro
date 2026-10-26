import { z } from 'zod'
import { DEFAULT_CONTENT } from './beginner-admin.service'

const required = z.string().min(1, 'Required')

export const subProgramSchema = z.object({
  id: z.enum(['novice', 'intermediate']),
  name: required,
  description: required,
  ages: required,
  coaches: required,
  workout_days_times: required,
  location: z.string(),
  dates: z.string(),
  cost: z.string(),
  registration: z.string(),
  first_practice_date_time: z.string(),
  first_practice_address: z.string(),
})

export const beginnerFormSchema = z.object({
  hero: z.object({ image: z.string() }),
  overview: z.object({
    title: required,
    description: required,
  }),
  novice: subProgramSchema,
  intermediate: subProgramSchema,
  tryouts: z.object({
    swimming_skills: z.array(z.string()),
    personal_qualities: z.array(z.string()),
    before_you_join: required,
  }),
  first_practice: z.object({
    what_to_bring: z.array(z.string()),
    what_to_expect: z.string(),
  }),
  note: z.string(),
  banner: z.object({
    heading: required.max(60, 'Too long for a banner heading'),
    description: required.max(200, 'Too long for a banner'),
    contactLabel: required.max(30, 'Keep it short — it is a button'),
    image: z.enum(['1', '2', '3', '4']),
  }),
})

export type BeginnerFormValues = z.infer<typeof beginnerFormSchema>
export type ProgramPath = 'novice' | 'intermediate'

export const FORM_DEFAULTS: BeginnerFormValues = DEFAULT_CONTENT
