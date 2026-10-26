import { z } from 'zod'
import { DEFAULT_CONTENT } from './competitive-admin.service'

const required = z.string().min(1, 'Required')

const groupSchema = z.object({
  title: required,
  description: z.string(),
  coaches: required,
  workoutDays: required,
})

export const competitiveFormSchema = z.object({
  hero: z.object({
    image: z.string(),
    alt: required,
  }),
  overview: z.object({
    title: required.max(70, 'Over 70 characters gets truncated in search results'),
    heading: required,
    body: required,
  }),
  under12: groupSchema,
  teen: groupSchema,
  junior: groupSchema.extend({
    highlightsTitle: required,
    highlights: z.array(z.string()),
  }),
  senior: z.object({
    title: required,
    description: required,
  }),
  banner: z.object({
    heading: required.max(60, 'Too long for a banner heading'),
    description: required.max(200, 'Too long for a banner'),
    contactLabel: required.max(30, 'Keep it short — it is a button'),
    image: z.enum(['1', '2', '3', '4']),
  }),
})

export type CompetitiveFormValues = z.infer<typeof competitiveFormSchema>

export const FORM_DEFAULTS: CompetitiveFormValues = DEFAULT_CONTENT
