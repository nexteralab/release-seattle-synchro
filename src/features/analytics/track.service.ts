import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { db } from '#/db'
import { analyticsEvents } from '#/db/schema'

export type EventType = 'pageview' | 'scroll' | 'read_complete' | 'exit' | 'conversion'
export type ConversionName = 'contact' | 'subscribe' | 'register_click'
export type ReferrerType = 'direct' | 'organic' | 'social' | 'referral' | 'internal'

/** Lo que manda el cliente. País y bot NO viajan desde el cliente: los pone el servidor. */
export interface TrackInput {
  type: EventType
  path: string
  post_id?: string | null
  post_type?: 'blog' | 'news' | null
  session_id: string
  visitor_id?: string | null
  is_new_visitor?: boolean
  scroll_pct?: number | null
  time_spent?: number | null
  referrer?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  device?: 'mobile' | 'tablet' | 'desktop' | null
  conversion?: ConversionName | null
}

const SEARCH_ENGINES = /google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.|brave\.|baidu\.|yandex\./i
const SOCIAL = /facebook\.|instagram\.|twitter\.|x\.com|t\.co|linkedin\.|youtube\.|tiktok\.|reddit\.|pinterest\.|whatsapp\./i

/**
 * Clasifica el referrer en el servidor, no en el cliente: así la regla es una
 * sola y no depende de que el visitante tenga JS viejo en caché.
 */
export function classifyReferrer(referrer: string | null | undefined, host: string): ReferrerType {
  if (!referrer) return 'direct'
  let hostname: string
  try {
    hostname = new URL(referrer).hostname
  } catch {
    return 'referral'
  }
  if (hostname === host || hostname.endsWith(`.${host}`)) return 'internal'
  if (SEARCH_ENGINES.test(hostname)) return 'organic'
  if (SOCIAL.test(hostname)) return 'social'
  return 'referral'
}

/** Cloudflare marca los bots con un score 1–99. <=30 es bot con alta confianza. */
function isBotRequest(req: Request): boolean {
  const cf = (req as Request & { cf?: Record<string, unknown> }).cf
  const bm = cf?.botManagement as { score?: number; verifiedBot?: boolean } | undefined
  if (bm?.verifiedBot) return true
  if (typeof bm?.score === 'number') return bm.score <= 30
  // Sin Bot Management (plan free o dev local), heurística por user-agent.
  const ua = req.headers.get('user-agent') ?? ''
  return /bot|crawler|spider|crawling|headless|lighthouse|preview/i.test(ua)
}

const trackFn = createServerFn({ method: 'POST' })
  .inputValidator((data: TrackInput) => data)
  .handler(async ({ data }) => {
    const req = getRequest()
    const cf = (req as Request & { cf?: Record<string, unknown> }).cf
    const host = new URL(req.url).hostname

    await db.insert(analyticsEvents).values({
      type: data.type,
      path: data.path.slice(0, 512),
      post_id: data.post_id ?? null,
      post_type: data.post_type ?? null,
      session_id: data.session_id,
      visitor_id: data.visitor_id ?? null,
      is_new_visitor: data.is_new_visitor ?? true,
      scroll_pct: data.scroll_pct ?? null,
      time_spent: data.time_spent ?? null,
      referrer: data.referrer ?? null,
      referrer_type: classifyReferrer(data.referrer, host),
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_campaign: data.utm_campaign ?? null,
      device: data.device ?? null,
      country: (cf?.country as string) ?? null,
      is_bot: isBotRequest(req),
      conversion: data.conversion ?? null,
    })
  })

/** Nunca revienta la UI: si el tracking falla, se traga el error. */
export function track(input: TrackInput): void {
  trackFn({ data: input }).catch(() => {})
}
