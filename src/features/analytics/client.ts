import Cookies from 'js-cookie'
import { getVisitorId } from '#/hooks/use-cookie-consent'
import { track, type ConversionName, type TrackInput } from './track.service'

const CONSENT_KEY = 'ss_consent'
const SESSION_KEY = 'ss_session'
const SEEN_KEY = 'ss_seen'

export type Consent = 'accepted' | 'declined' | 'pending'

export function getConsent(): Consent {
  const v = Cookies.get(CONSENT_KEY)
  if (v === 'accepted' || v === 'declined') return v
  return 'pending'
}

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

/**
 * ponytail: "nuevo visitante" = no hay marca previa en localStorage.
 * Techo conocido: si el visitante limpia el navegador vuelve a contar como
 * nuevo. Para algo más exacto haría falta identificarlo en el servidor, que es
 * justo lo que el consentimiento nos pide no hacer.
 */
function isNewVisitor(): boolean {
  try {
    if (localStorage.getItem(SEEN_KEY)) return false
    localStorage.setItem(SEEN_KEY, '1')
    return true
  } catch {
    return true
  }
}

function detectDevice(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

function readUtm() {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
  }
}

type Base = Pick<
  TrackInput,
  | 'path' | 'session_id' | 'visitor_id' | 'is_new_visitor' | 'device'
  | 'referrer' | 'utm_source' | 'utm_medium' | 'utm_campaign'
>

/**
 * Contexto común de todos los eventos, o null si el visitante aún no ha
 * decidido sobre las cookies (en ese caso no se registra nada).
 *
 * - accepted → sesión persistente + visitor_id + referrer.
 * - declined → solo agregados anónimos: sesión efímera, sin visitor_id ni referrer.
 */
export function getTrackingBase(): Base | null {
  if (typeof window === 'undefined') return null
  const consent = getConsent()
  if (consent === 'pending') return null

  const full = consent === 'accepted'
  return {
    path: window.location.pathname,
    session_id: full ? getOrCreateSessionId() : crypto.randomUUID(),
    visitor_id: full ? getVisitorId() : null,
    is_new_visitor: full ? isNewVisitor() : true,
    device: detectDevice(),
    referrer: full ? document.referrer || null : null,
    ...(full ? readUtm() : { utm_source: null, utm_medium: null, utm_campaign: null }),
  }
}

/**
 * Rutas que nunca se registran. El hook vive en el layout público, pero
 * durante una navegación hacia fuera el layout sigue montado un instante y
 * `useRouterState` ya reporta la ruta nueva: sin esto, entrar al panel se
 * contaba como tráfico del sitio.
 */
const PRIVATE_PREFIXES = ['/app', '/login', '/api']

export function isTrackablePath(path: string): boolean {
  return !PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))
}

/**
 * Las páginas de post emiten su propio pageview (enriquecido con post_id) desde
 * `usePostAnalytics`, así que el layout las salta para no contar doble.
 */
export function isPostPath(path: string): boolean {
  return /^\/team\/(blog|news)\/[^/]+$/.test(path)
}

export function trackPageview(path: string, post?: { id: string; type: 'blog' | 'news' }) {
  const base = getTrackingBase()
  if (!base) return
  track({
    ...base,
    path,
    type: 'pageview',
    post_id: post?.id ?? null,
    post_type: post?.type ?? null,
  })
}

/** Conversiones: contacto, newsletter y clics a registro externo. */
export function trackConversion(conversion: ConversionName) {
  const base = getTrackingBase()
  if (!base) return
  track({ ...base, type: 'conversion', conversion })
}
