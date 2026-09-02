import { useEffect, useRef, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { CONSENT_CHANGE_EVENT } from '#/hooks/use-cookie-consent'
import { getConsent, isPostPath, trackPageview } from './client'

/**
 * Un pageview por navegación, en TODO el sitio. Se monta una sola vez en el
 * layout público (`_public.tsx`), no por página.
 */
export function usePageAnalytics(): void {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const lastPath = useRef<string | null>(null)
  const [consentTick, setConsentTick] = useState(0)

  // El banner puede resolverse después del primer render: al aceptar hay que
  // reintentar la vista actual, que en ese momento se descartó por 'pending'.
  useEffect(() => {
    const onChange = () => setConsentTick((n) => n + 1)
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
  }, [])

  useEffect(() => {
    if (getConsent() === 'pending') return
    // Los posts emiten su pageview desde usePostAnalytics, con post_id.
    if (isPostPath(pathname)) return
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    trackPageview(pathname)
  }, [pathname, consentTick])
}
