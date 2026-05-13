// Server-only: do NOT import from client components. Use it from a
// `createServerFn` handler, a server route, or any other server-side module.
import { Resend } from 'resend'

const FROM = 'Seattle Synchro <support@thenexteralab.com>'
const TO = 'info@seattlesynchro.org'

let client: Resend | null = null

function getClient() {
  if (client) return client
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')
  client = new Resend(apiKey)
  return client
}

export interface SendEmailOptions {
  subject: string
  html: string
  text?: string
  replyTo?: string | string[]
}

export async function sendEmail({ subject, html, text, replyTo }: SendEmailOptions) {
  const { data, error } = await getClient().emails.send({
    from: FROM,
    to: TO,
    subject,
    html,
    text,
    replyTo,
  })
  if (error) throw new Error(`Resend send failed: ${error.message}`)
  return data
}
