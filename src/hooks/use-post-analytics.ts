import { useEffect, useRef } from 'react'
import { getConsent, getTrackingBase } from '#/features/analytics/client'
import { track } from '#/features/analytics/track.service'

/**
 * Analítica de posts: el pageview (con post_id, que el layout no conoce) más el
 * engagement de lectura — scroll, lectura completa y tiempo en página.
 *
 * `usePageAnalytics` salta estas rutas vía `isPostPath`, así que no hay conteo
 * doble. El pageview se registra con cualquier consentimiento que no sea
 * 'pending'; scroll y exit solo con consentimiento completo.
 */
export function usePostAnalytics(postId: string, postType: 'blog' | 'news'): void {
  const firedMilestonesRef = useRef<Set<number>>(new Set())
  const hasFiredExitRef = useRef(false)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    if (!postId) return

    const base = getTrackingBase()
    if (!base) return

    const post = { post_id: postId, post_type: postType }

    track({ ...base, ...post, type: 'pageview' })

    if (getConsent() !== 'accepted') return
    firedMilestonesRef.current = new Set()
    hasFiredExitRef.current = false
    startTimeRef.current = Date.now()

    function handleScroll() {
      const pct = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100,
      )
      for (const milestone of [25, 50, 75, 100] as const) {
        if (pct >= milestone && !firedMilestonesRef.current.has(milestone)) {
          firedMilestonesRef.current.add(milestone)
          track({
            ...base!,
            ...post,
            type: milestone === 100 ? 'read_complete' : 'scroll',
            scroll_pct: milestone,
          })
        }
      }
    }

    function fireExit() {
      if (hasFiredExitRef.current) return
      hasFiredExitRef.current = true
      track({
        ...base!,
        ...post,
        type: 'exit',
        time_spent: Math.round((Date.now() - startTimeRef.current) / 1000),
      })
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
