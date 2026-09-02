// Las fuentes llegan de dos formas: `referrer` es la URL completa que reportó
// el navegador, `utm_source` es un token suelto ("google", "ig"). Ambas se
// normalizan a un hostname y de ahí sale el favicon.
const UTM_DOMAINS: Record<string, string> = {
  google: 'google.com',
  googleads: 'google.com',
  'google-ads': 'google.com',
  adwords: 'google.com',
  gads: 'google.com',
  gmb: 'google.com',
  instagram: 'instagram.com',
  ig: 'instagram.com',
  facebook: 'facebook.com',
  fb: 'facebook.com',
  meta: 'facebook.com',
  messenger: 'facebook.com',
  youtube: 'youtube.com',
  yt: 'youtube.com',
  tiktok: 'tiktok.com',
  twitter: 'x.com',
  x: 'x.com',
  linkedin: 'linkedin.com',
  whatsapp: 'whatsapp.com',
  wa: 'whatsapp.com',
  bing: 'bing.com',
  yahoo: 'yahoo.com',
  duckduckgo: 'duckduckgo.com',
  reddit: 'reddit.com',
  pinterest: 'pinterest.com',
  eventbrite: 'eventbrite.com',
  // Sin favicon posible: se resuelven a null y caen al placeholder.
  newsletter: '',
  email: '',
  mail: '',
  direct: '',
  qr: '',
  flyer: '',
  print: '',
}

// Sufijos de segundo nivel: en "google.co.uk" el dominio de marca son tres
// etiquetas, no dos. Lista corta a propósito; la Public Suffix List completa
// no vale la pena para elegir un favicon.
const SECOND_LEVEL = new Set(['co', 'com', 'net', 'org', 'gov', 'edu', 'ac'])

/**
 * Colapsa al dominio de marca: los referrers reales llegan con subdominios de
 * redirección ("l.instagram.com", "search.google.com", "lm.facebook.com") y sin
 * esto el favicon sale genérico en vez del logo.
 */
function brandDomain(hostname: string) {
  const parts = hostname.split('.').filter(Boolean)
  if (parts.length <= 2) return parts.join('.')
  const keep = SECOND_LEVEL.has(parts[parts.length - 2]) ? 3 : 2
  return parts.slice(-keep).join('.')
}

/** Hostname limpio de una fuente, o null si no representa un sitio web. */
export function sourceHost(value: string): string | null {
  const raw = value.trim().toLowerCase()
  if (!raw) return null
  if (raw.startsWith('http')) {
    try {
      return brandDomain(new URL(raw).hostname) || null
    } catch {
      return null
    }
  }
  const mapped = UTM_DOMAINS[raw]
  if (mapped !== undefined) return mapped || null
  return raw.includes('.') ? brandDomain(raw) : null
}

/** "https://l.instagram.com/p/x" → "instagram.com"; deja el token si no hay host. */
export const sourceLabel = (value: string) => sourceHost(value) ?? value
