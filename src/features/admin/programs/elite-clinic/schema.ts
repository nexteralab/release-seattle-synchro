import { z } from 'zod'
import { DEFAULT_EDITABLE } from './elite-clinic-admin.service'

export const managerSchema = z.object({
  name: z.string().min(1, 'Required'),
  role: z.string().min(1, 'Required'),
  email: z.string().email('Must be a valid email'),
})

export const pricingSchema = z.object({
  basePrice: z.string().min(1, 'Required'),
  earlyBird: z.string().min(1, 'Required'),
  standardDiscount: z.string().min(1, 'Required'),
})

export const coachSchema = z.object({
  name: z.string().min(1, 'Required'),
  role: z.string().min(1, 'Required'),
})

export const eliteClinicFormSchema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  dates: z.string().min(1, 'Required'),
  time: z.string().min(1, 'Required'),
  minimumLevel: z.string().min(1, 'Required'),
  manager: managerSchema,
  pricing: pricingSchema,
  coaches: z.array(coachSchema),
  registerUrl: z.string().url('Must be a valid URL'),
})

export type EliteClinicFormValues = z.infer<typeof eliteClinicFormSchema>

export const FORM_DEFAULTS: EliteClinicFormValues = DEFAULT_EDITABLE
