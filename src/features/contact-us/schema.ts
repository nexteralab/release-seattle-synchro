import { z } from 'zod'

export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Program Information',
  'Registration',
  'Tryouts',
  'Coaching Staff',
  'Booster Club',
  'Other',
] as const

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  phone: z.string().optional().default(''),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Enter a valid email address.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
