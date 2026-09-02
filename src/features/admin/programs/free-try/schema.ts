import { z } from 'zod'
import { DEFAULT_CONTENT } from './free-try-admin.service'

export const freeTryLocationSchema = z.object({
  name: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
})

const url = z.string().min(1, 'Required').url('Must be a valid URL')

export const freeTryHeroSchema = z.object({
  badge: z.string().min(1, 'Required').max(40, 'Keep it short — it is a pill'),
  // El H1 de la página: es el objetivo SEO principal, de ahí el tope.
  title: z.string().min(1, 'Required').max(70, 'Over 70 characters gets truncated in search results'),
  description: z.string().min(1, 'Required').max(200, 'Too long for a hero subtitle'),
  ctaLabel: z.string().min(1, 'Required').max(30, 'Keep it short — it is a button'),
  ctaUrl: url,
  image: z.string(),
})

export const freeTryBannerSchema = z.object({
  heading: z.string().min(1, 'Required').max(60, 'Too long for a banner heading'),
  description: z.string().min(1, 'Required').max(200, 'Too long for a banner'),
  registerLabel: z.string().min(1, 'Required').max(30, 'Keep it short — it is a button'),
  registerUrl: url,
  contactLabel: z.string().min(1, 'Required').max(30, 'Keep it short — it is a button'),
  image: z.enum(['1', '2', '3', '4']),
})

export const freeTrySafetySchema = z.object({
  requirementTitle: z.string().min(1, 'Required').max(60),
  requirement: z.string().min(1, 'Required').max(400, 'Too long — parents skim this'),
  contactTitle: z.string().min(1, 'Required').max(60),
  contactHeading: z.string().min(1, 'Required').max(200),
  contactBody: z.string().min(1, 'Required').max(200),
  contactLabel: z.string().min(1, 'Required').max(30, 'Keep it short — it is a button'),
})

export const freeTryFaqItemSchema = z.object({
  question: z.string().min(1, 'Required').max(140, 'Too long for a question'),
  answer: z.string().min(1, 'Required').max(800, 'Too long — split it in two questions'),
})

export const freeTryFormSchema = z.object({
  date: z.string().min(1, 'Required'),
  time: z.string().min(1, 'Required'),
  ages: z.string().min(1, 'Required'),
  location: freeTryLocationSchema,
  hero: freeTryHeroSchema,
  safety: freeTrySafetySchema,
  faq: z.array(freeTryFaqItemSchema),
  banner: freeTryBannerSchema,
})

export type FreeTryFormValues = z.infer<typeof freeTryFormSchema>

export const FORM_DEFAULTS: FreeTryFormValues = DEFAULT_CONTENT
