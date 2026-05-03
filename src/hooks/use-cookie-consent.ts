import { useState, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'

export type ConsentState = 'accepted' | 'declined' | 'pending'

const CONSENT_KEY = 'ss_consent'
const VISITOR_KEY = 'ss_vid'
const EXPIRES_DAYS = 365

function readConsent(): ConsentState {
  const v = Cookies.get(CONSENT_KEY)
  if (v === 'accepted' || v === 'declined') return v
  return 'pending'
}

export function getVisitorId(): string | null {
  if (Cookies.get(CONSENT_KEY) !== 'accepted') return null
  return Cookies.get(VISITOR_KEY) ?? null
}

export function useCookieConsent() {
  // Siempre 'pending' en el primer render (igual que SSR) para evitar hydration mismatch.
  // useEffect sincroniza el valor real de la cookie solo en el cliente, post-hidratación.
  const [consent, setConsent] = useState<ConsentState>('pending')

  useEffect(() => {
    setConsent(readConsent())
  }, [])

  const accept = useCallback(() => {
    Cookies.set(CONSENT_KEY, 'accepted', { expires: EXPIRES_DAYS, sameSite: 'lax' })
    if (!Cookies.get(VISITOR_KEY)) {
      Cookies.set(VISITOR_KEY, crypto.randomUUID(), { expires: EXPIRES_DAYS, sameSite: 'lax' })
    }
    setConsent('accepted')
  }, [])

  const decline = useCallback(() => {
    Cookies.set(CONSENT_KEY, 'declined', { expires: EXPIRES_DAYS, sameSite: 'lax' })
    Cookies.remove(VISITOR_KEY)
    setConsent('declined')
  }, [])

  return { consent, accept, decline }
}
