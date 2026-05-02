import { useEffect, useRef } from 'react'
import { trackEvent } from '#/features/admin/blogs/services/analytics.service'
import { getVisitorId } from '#/hooks/use-cookie-consent'
import Cookies from 'js-cookie'

const SESSION_KEY = 'ss_session'
const CONSENT_KEY = 'ss_consent'

type ConsentMode = 'accepted' | 'declined' | 'pending'

function getConsent(): ConsentMode {
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

function detectDevice(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth
  if (w < 768)  return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export function usePostAnalytics(postId: string, postType: 'blog' | 'news'): void {
  const firedMilestonesRef = useRef<Set<number>>(new Set())
  const hasFiredExitRef    = useRef(false)
  const startTimeRef       = useRef(Date.now())

  useEffect(() => {
    if (!postId) return

    const consent  = getConsent()
    if (consent === 'pending') return  // wait until user decides

    const device   = detectDevice()
    const referrer = document.referrer || null

    // accepted → full tracking with persistent visitor_id + stored session_id
    // declined → anonymous aggregate only: ephemeral in-memory UUID, no visitor_id
    const sessionId = consent === 'accepted' ? getOrCreateSessionId() : crypto.randomUUID()
    const visitorId = consent === 'accepted' ? getVisitorId() : null

    firedMilestonesRef.current = new Set()
    hasFiredExitRef.current    = false
    startTimeRef.current       = Date.now()

    const base = {
      post_id:    postId,
      post_type:  postType,
      session_id: sessionId,
      visitor_id: visitorId,
      device,
      referrer:   consent === 'accepted' ? referrer : null, // no referrer if declined
    }

    trackEvent({ ...base, event_type: 'view' }).catch(() => {})

    // Scroll + exit only tracked with full consent
    if (consent !== 'accepted') return

    function handleScroll() {
      const pct = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
      )
      for (const milestone of [25, 50, 75, 100] as const) {
        if (pct >= milestone && !firedMilestonesRef.current.has(milestone)) {
          firedMilestonesRef.current.add(milestone)
          trackEvent({
            ...base,
            event_type: milestone === 100 ? 'read_complete' : 'scroll_depth',
            scroll_pct: milestone,
          }).catch(() => {})
        }
      }
    }

    function fireExit() {
      if (hasFiredExitRef.current) return
      hasFiredExitRef.current = true
      const time_spent = Math.round((Date.now() - startTimeRef.current) / 1000)
      trackEvent({ ...base, event_type: 'exit', time_spent }).catch(() => {})
    }

    function onVisibility() {
      if (document.visibilityState === 'hidden') fireExit()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', fireExit)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', fireExit)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [postId, postType])
}
