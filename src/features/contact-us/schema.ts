import { z } from 'zod'

export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Program Information',
  'Private Lessons',
  'Registration',
  'Tryouts',
  'Coaching Staff',
  'Booster Club',
  'Other',
] as const

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  phone: z.string(),
  email: z
    .email({ message: 'Enter a valid email address.' })
    .min(1, { message: 'Email is required.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
