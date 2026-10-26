import { z } from 'zod'
import { DEFAULT_CONTENT } from './elite-clinic-admin.service'

const required = z.string().min(1, 'Required')

export const managerSchema = z.object({
  name: required,
  role: required,
  email: z.string().email('Must be a valid email'),
})

export const locationSchema = z.object({
  venue: required,
  city: required,
  poolAddress: required,
  // Opcional: si queda vacío, la página oculta "Special Activities".
  crossfitAddress: z.string(),
})

export const pricingSchema = z
  .object({
    basePrice: required,
    earlyBirdPrice: required.max(12, 'Keep it short — it is a badge'),
    earlyBird: required,
    // Segunda fila opcional: vacía = oculta.
    standardTitle: z.string(),
    standardPrice: z.string().max(12, 'Keep it short — it is a badge'),
    standardDiscount: z.string(),
  })
  .refine(p => !p.standardTitle || p.standardPrice, {
    path: ['standardPrice'],
    message: 'Required when the row has a title',
  })

export const coachSchema = z.object({
  name: required,
  role: required,
})

export const eliteClinicFormSchema = z.object({
  title: required,
  subtitle: required,
  description: required,
  dates: required,
  time: required,
  minimumLevel: required,
  location: locationSchema,
  manager: managerSchema,
  pricing: pricingSchema,
  coaches: z.array(coachSchema),
  // ponytail: no se muestra en la página todavía; va en el schema solo para que zod no lo borre al guardar.
  schedule: z.array(z.object({ time: z.string(), activity: z.string() })),
  // La página pinta exactamente 3 objetivos, cada uno con su ícono.
  objectives: z.array(required).length(3),
  packingList: z.array(z.string()),
  registerUrl: z.string().url('Must be a valid URL'),
})

export type EliteClinicFormValues = z.infer<typeof eliteClinicFormSchema>

export const FORM_DEFAULTS: EliteClinicFormValues = DEFAULT_CONTENT
