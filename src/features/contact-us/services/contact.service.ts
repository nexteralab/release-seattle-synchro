import { createServerFn } from '@tanstack/react-start'
import { sendEmail } from '#/lib/email'
import { contactFormSchema, type ContactFormInput } from '../schema'
import { renderContactEmail } from './contact-email-template'

const submitContactFn = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    const { html, text } = renderContactEmail(data)
    await sendEmail({
      subject: `New contact message: ${data.subject} — ${data.name}`,
      html,
      text,
      replyTo: data.email,
    })
  })

export async function submitContactForm(data: ContactFormInput): Promise<void> {
  await submitContactFn({ data })
}
