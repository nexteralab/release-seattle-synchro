import type { ContactFormData } from '../types'

function escape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export interface RenderContactEmailParams extends ContactFormData {
  siteUrl?: string
  date?: Date
}

export function renderContactEmail(params: RenderContactEmailParams) {
  const name = escape(params.name)
  const email = escape(params.email)
  const phone = params.phone ? escape(params.phone) : ''
  const subject = escape(params.subject)
  const message = escape(params.message)
  const siteUrl = params.siteUrl ?? 'https://seattlesynchro.com'
  const date = (params.date ?? new Date()).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Los_Angeles',
  })

  // Email address must NOT be URL-encoded inside mailto: — only the query
  // string is. Encoding the `@` as %40 breaks Gmail and most clients.
  const replyHref = `mailto:${params.email}?subject=${encodeURIComponent(`Re: ${params.subject}`)}`

  const phoneCell = phone
    ? `<a href="tel:${phone}" style="color:#0A0A67; text-decoration:underline;">${phone}</a>`
    : '<span style="color:#a1a1a1;">Not provided</span>'

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>New contact message — Seattle Synchro</title>
<style type="text/css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
body { margin: 0 !important; padding: 0 !important; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
a { color: #0A0A67; text-decoration: none; }
.btn:hover { background-color: #08084f !important; }
@media only screen and (max-width: 620px) {
  .container { width: 100% !important; }
  .px-outer { padding-left: 24px !important; padding-right: 24px !important; }
  .h1 { font-size: 24px !important; line-height: 1.3 !important; }
  .field-label { display: block !important; width: 100% !important; padding-bottom: 4px !important; }
  .field-value { display: block !important; width: 100% !important; padding-bottom: 16px !important; }
}
</style>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color:#171717;">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#f5f5f5;">New contact message from ${name} — ${subject}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:14px; box-shadow:0 1px 3px rgba(0,0,0,0.06); overflow:hidden;">
      <tr><td align="center" style="background-color:#0A0A67; padding:32px 24px;">
        <img src="https://seattlesynchro.com/images/logo_white.png" alt="Seattle Synchro" width="180" style="display:block; margin:0 auto; border:0; outline:none; text-decoration:none; max-width:180px; height:auto;" />
        <div style="font-family:'Space Grotesk', Arial, sans-serif; font-weight:500; font-size:11px; letter-spacing:2.8px; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-top:14px;">New Contact Message</div>
      </td></tr>
      <tr><td class="px-outer" style="padding:48px 48px 24px 48px;">
        <h1 class="h1" style="margin:0 0 16px 0; font-family:'Space Grotesk', Arial, sans-serif; font-weight:500; font-size:28px; line-height:1.3; color:#0A0A67; letter-spacing:-0.6px;">You have a new message</h1>
        <p style="margin:0 0 8px 0; font-family:'Inter', Arial, sans-serif; font-size:16px; line-height:26px; color:#737373;">Someone just reached out through the Seattle Synchro contact form. Here are the details:</p>
      </td></tr>
      <tr><td class="px-outer" style="padding:0 48px 8px 48px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f3f5; border-radius:10px;">
          <tr><td style="padding:24px 24px 8px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;"><tr>
              <td class="field-label" width="110" valign="top" style="font-family:'Space Grotesk', Arial, sans-serif; font-weight:700; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#171717; padding-right:12px; padding-top:2px;">Name</td>
              <td class="field-value" valign="top" style="font-family:'Inter', Arial, sans-serif; font-size:15px; line-height:22px; color:#171717; font-weight:500;">${name}</td>
            </tr></table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;"><tr>
              <td class="field-label" width="110" valign="top" style="font-family:'Space Grotesk', Arial, sans-serif; font-weight:700; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#171717; padding-right:12px; padding-top:2px;">Email</td>
              <td class="field-value" valign="top" style="font-family:'Inter', Arial, sans-serif; font-size:15px; line-height:22px;"><a href="mailto:${email}" style="color:#0A0A67; text-decoration:underline;">${email}</a></td>
            </tr></table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;"><tr>
              <td class="field-label" width="110" valign="top" style="font-family:'Space Grotesk', Arial, sans-serif; font-weight:700; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#171717; padding-right:12px; padding-top:2px;">Phone</td>
              <td class="field-value" valign="top" style="font-family:'Inter', Arial, sans-serif; font-size:15px; line-height:22px; color:#737373;">${phoneCell}</td>
            </tr></table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;"><tr>
              <td class="field-label" width="110" valign="top" style="font-family:'Space Grotesk', Arial, sans-serif; font-weight:700; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#171717; padding-right:12px; padding-top:2px;">Subject</td>
              <td class="field-value" valign="top" style="font-family:'Inter', Arial, sans-serif; font-size:15px; line-height:22px;"><span style="display:inline-block; padding:4px 12px; background-color:#ffffff; border:1px solid rgba(0,0,0,0.1); border-radius:6px; font-weight:500; color:#171717;">${subject}</span></td>
            </tr></table>
          </td></tr>
        </table>
      </td></tr>
      <tr><td class="px-outer" style="padding:24px 48px 8px 48px;">
        <p style="margin:0 0 12px 0; font-family:'Space Grotesk', Arial, sans-serif; font-weight:700; font-size:12px; letter-spacing:1.4px; text-transform:uppercase; color:#171717;">Message</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border:1px solid rgba(0,0,0,0.1); border-radius:10px;">
          <tr><td style="padding:20px 22px; font-family:'Inter', Arial, sans-serif; font-size:15px; line-height:24px; color:#171717; white-space:pre-wrap; word-break:break-word;">${message}</td></tr>
        </table>
      </td></tr>
      <tr><td class="px-outer" align="center" style="padding:24px 48px 8px 48px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td align="center" style="border-radius:8px; background-color:#0A0A67;">
            <a class="btn" href="${replyHref}" style="display:inline-block; padding:16px 40px; font-family:'Space Grotesk', Arial, sans-serif; font-weight:700; font-size:14px; letter-spacing:2.8px; text-transform:uppercase; color:#ffffff; text-decoration:none; border-radius:8px;">Reply to ${name}</a>
          </td>
        </tr></table>
      </td></tr>
      <tr><td class="px-outer" style="padding:24px 48px 0 48px;"><div style="height:1px; line-height:1px; background-color:rgba(0,0,0,0.1); font-size:1px;">&nbsp;</div></td></tr>
      <tr><td class="px-outer" style="padding:24px 48px 40px 48px;">
        <p style="margin:0 0 12px 0; font-family:'Space Grotesk', Arial, sans-serif; font-weight:700; font-size:12px; letter-spacing:1.4px; text-transform:uppercase; color:#171717;">Submission details</p>
        <p style="margin:0 0 4px 0; font-family:'Inter', Arial, sans-serif; font-size:13px; line-height:20px; color:#737373;">Received on <strong style="color:#171717;">${escape(date)}</strong></p>
        <p style="margin:0; font-family:'Inter', Arial, sans-serif; font-size:13px; line-height:20px; color:#737373;">Sent from the contact form at <a href="${siteUrl}/contact-us" style="color:#0A0A67; text-decoration:underline;">${siteUrl}/contact-us</a></p>
      </td></tr>
    </table>
    <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;"><tr>
      <td align="center" class="px-outer" style="padding:24px 48px;">
        <p style="margin:0 0 6px 0; font-family:'Inter', Arial, sans-serif; font-size:12px; line-height:18px; color:#a1a1a1;">Seattle Synchro &middot; Premier Synchronized Swimming</p>
        <p style="margin:0; font-family:'Inter', Arial, sans-serif; font-size:12px; line-height:18px; color:#a1a1a1;">&copy; 2026 Seattle Synchro. All rights reserved.</p>
      </td>
    </tr></table>
  </td></tr>
</table>
</body>
</html>`

  const text = [
    `New contact message — Seattle Synchro`,
    ``,
    `Name:    ${params.name}`,
    `Email:   ${params.email}`,
    `Phone:   ${params.phone || 'Not provided'}`,
    `Subject: ${params.subject}`,
    ``,
    `Message:`,
    params.message,
    ``,
    `Received on ${date}`,
    `Sent from ${siteUrl}/contact-us`,
  ].join('\n')

  return { html, text }
}
