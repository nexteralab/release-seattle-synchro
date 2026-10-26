import { z } from 'zod'
import { freeTryBannerSchema } from '#/features/admin/programs/free-try/schema'
import { DEFAULT_CONTENT } from './summer-camp-admin.service'

const required = z.string().min(1, 'Required')
const url = required.url('Must be a valid URL')
// Opcional, pero si viene tiene que ser una URL.
const optionalUrl = z.string().refine(v => !v || z.string().url().safeParse(v).success, 'Must be a valid URL')

export const summerCampFormSchema = z.object({
  hero: z.object({
    badge: required.max(40, 'Keep it short — it is a pill'),
    kicker: z.string(),
    // El H1 de la página: es el objetivo SEO principal.
    title: required.max(70, 'Over 70 characters gets truncated in search results'),
    subtitle: z.string(),
    ctaLabel: required.max(30, 'Keep it short — it is a button'),
    ctaUrl: url,
    image: z.string(),
  }),
  overview: z.object({
    heading: required,
    body: required,
    detailsHeading: required,
  }),
  details: z.object({
    ages: required,
    skill_level: required,
    schedule: required,
  }),
  sessions: z.array(
    z.object({
      name: required,
      dates: required,
      address: required,
      register_url: url,
    }),
  ),
  dates: z.object({
    kicker: z.string(),
    heading: required,
    registerLabel: required.max(30, 'Keep it short — it is a button'),
    investmentLabel: required,
  }),
  price_per_week: required,
  requirements: z.object({
    heading: required,
    items: z.array(
      z.object({
        name: required,
        note: z.string(),
        link: optionalUrl,
        linkLabel: z.string(),
      }),
    ),
  }),
  reviews: z.array(
    z.object({
      name: required,
      paras: z.array(z.string()).min(1, 'Required'),
      photos: z.array(z.object({ src: required, alt: z.string() })).max(2, 'Max 2 photos').optional(),
    }),
  ),
  banner: freeTryBannerSchema,
})

export type SummerCampFormValues = z.infer<typeof summerCampFormSchema>

export const FORM_DEFAULTS: SummerCampFormValues = DEFAULT_CONTENT
