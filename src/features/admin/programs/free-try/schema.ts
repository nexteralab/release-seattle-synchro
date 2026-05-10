import { z } from 'zod'
import { DEFAULT_CONTENT } from './free-try-admin.service'

export const freeTryLocationSchema = z.object({
  name: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
})

export const freeTryFormSchema = z.object({
  date: z.string().min(1, 'Required'),
  time: z.string().min(1, 'Required'),
  ages: z.string().min(1, 'Required'),
  location: freeTryLocationSchema,
})

export type FreeTryFormValues = z.infer<typeof freeTryFormSchema>

export const FORM_DEFAULTS: FreeTryFormValues = DEFAULT_CONTENT
