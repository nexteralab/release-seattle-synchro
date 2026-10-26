import { z } from 'zod'
import { DEFAULT_CONTENT } from './recreational-admin.service'

const required = z.string().min(1, 'Required')
const lines = z.array(z.string())
const leadItems = z.array(z.object({ lead: required, rest: z.string() }))

export const recreationalFormSchema = z.object({
  hero: z.object({
    image: z.string(),
    alt: required,
  }),
  overview: z.object({
    // El H1 de la página.
    title: required.max(70, 'Over 70 characters gets truncated in search results'),
    subtitle: required,
    body: required,
  }),
  program: z.object({
    name: required,
    ages: required,
    coach: required,
    workout_days_times: required,
    schedule_note: z.string(),
    duration: z.string(),
    cost: required,
    cost_note: z.string(),
    description: required,
    register_label: required.max(30, 'Keep it short — it is a button'),
    register_url: required.url('Must be a valid URL'),
    skills_title: required,
    skills: lines,
  }),
  classLook: z.object({
    title: required,
    pills: lines,
    intro: required,
    items: leadItems,
    callout: z.string(),
  }),
  whoFor: z.object({
    title: required,
    items: leadItems,
  }),
  gymnasticsFit: z.object({
    kicker: z.string(),
    title: required,
    inputs: lines,
    result: z.string(),
    body: required,
    items: leadItems,
  }),
  comparison: z.object({
    title: required,
    intro: z.string(),
    recreationalLabel: required,
    competitiveLabel: required,
    rows: z.array(z.object({ label: required, recreational: z.string(), competitive: z.string() })),
    footerLabel: z.string(),
    footerText: z.string(),
  }),
  summerCampFit: z.object({
    title: required,
    intro: required,
    highlights: lines,
    outro: z.string(),
    ctaLabel: required.max(30, 'Keep it short — it is a button'),
  }),
  faq: z.object({
    title: required,
    items: z.array(z.object({ question: required, answer: required })),
    blogLead: z.string(),
    blogLabel: z.string(),
  }),
  banner: z.object({
    heading: required.max(60, 'Too long for a banner heading'),
    description: required.max(200, 'Too long for a banner'),
    contactLabel: required.max(30, 'Keep it short — it is a button'),
    image: z.enum(['1', '2', '3', '4']),
  }),
})

export type RecreationalFormValues = z.infer<typeof recreationalFormSchema>

export const FORM_DEFAULTS: RecreationalFormValues = DEFAULT_CONTENT
