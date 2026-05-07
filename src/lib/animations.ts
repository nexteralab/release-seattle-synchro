/**
 * Variants, transitions y viewports compartidos para animaciones de entrada.
 *
 * Patrón premium inspirado en Linear / Stripe / Vercel / Apple:
 * - Blur-in sutil en textos (modern/editorial)
 * - Ken Burns scale en imágenes (cinematic image reveals)
 * - Spring physics para stagger orgánico
 * - Float loops en elementos decorativos
 *
 * GPU-friendly: solo transform + opacity + filter (blur corto).
 * Para reduced motion: usar `useReducedMotion()` y pasar
 * `initial={reduce ? false : "hidden"}` para saltear el estado oculto.
 */

export const SOFT_EASE = [0.22, 1, 0.36, 1] as const

export const SOFT_TRANSITION = { duration: 0.65, ease: SOFT_EASE }
export const SLIDE_TRANSITION = { duration: 0.75, ease: SOFT_EASE }
export const CINEMA_TRANSITION = { duration: 1.2, ease: SOFT_EASE }
export const BLUR_TRANSITION = { duration: 0.75, ease: SOFT_EASE }
export const QUICK_TRANSITION = { duration: 0.3, ease: SOFT_EASE }
export const BLUR_TRANSITION_SLOW = { duration: 1.1, ease: SOFT_EASE }
export const CINEMA_TRANSITION_SLOW = { duration: 1.8, ease: SOFT_EASE }

export const SPRING_SOFT = {
  type: 'spring',
  damping: 22,
  stiffness: 110,
  mass: 0.9,
} as const

export const SPRING_GENTLE = {
  type: 'spring',
  damping: 28,
  stiffness: 75,
  mass: 1.2,
} as const

// ── Viewports ──────────────────────────────────────────────────────────────

export const DEFAULT_VIEWPORT = { once: true, amount: 0.2 } as const
export const LARGE_VIEWPORT = { once: true, amount: 0.3 } as const
export const EAGER_VIEWPORT = { once: true, amount: 0.1 } as const
/** Re-anima cada vez que entra al viewport. NO usar en imágenes pesadas. */
export const REPLAY_VIEWPORT = { once: false, amount: 0.15 } as const

// ── Variants ───────────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 14, transition: QUICK_TRANSITION },
  visible: { opacity: 1, y: 0, transition: SOFT_TRANSITION },
}

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 8, transition: QUICK_TRANSITION },
  visible: { opacity: 1, y: 0, transition: SOFT_TRANSITION },
}

export const fadeOnly = {
  hidden: { opacity: 0, transition: QUICK_TRANSITION },
  visible: { opacity: 1, transition: SOFT_TRANSITION },
}

export const blurUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)', transition: QUICK_TRANSITION },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: BLUR_TRANSITION },
}

export const blurUpSmall = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)', transition: QUICK_TRANSITION },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: BLUR_TRANSITION },
}

export const blurUpSlow = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)', transition: QUICK_TRANSITION },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: BLUR_TRANSITION_SLOW },
}

export const scaleIn = {
  hidden: { opacity: 0, y: 12, scale: 0.96, transition: QUICK_TRANSITION },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING_SOFT },
}

export const scaleInGentle = {
  hidden: { opacity: 0, y: 24, scale: 0.92, filter: 'blur(6px)', transition: QUICK_TRANSITION },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: SPRING_GENTLE },
}

export const kenBurns = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: CINEMA_TRANSITION },
}

export const kenBurnsSlow = {
  hidden: { opacity: 0, scale: 1.1, transition: QUICK_TRANSITION },
  visible: { opacity: 1, scale: 1, transition: CINEMA_TRANSITION_SLOW },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: SLIDE_TRANSITION },
}

export const slideRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: SLIDE_TRANSITION },
}

// ── Factories ──────────────────────────────────────────────────────────────

export function staggerContainer(stagger = 0.1, delayChildren = 0) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }
}

export function fadeUpWithDelay(delay: number) {
  return {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { ...SOFT_TRANSITION, delay } },
  }
}

export function blurUpWithDelay(delay: number) {
  return {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { ...BLUR_TRANSITION, delay } },
  }
}

export function blurUpWithDelaySlow(delay: number) {
  return {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { ...BLUR_TRANSITION_SLOW, delay } },
  }
}

// ── Float loop ─────────────────────────────────────────────────────────────

export const FLOAT_ANIMATE = { y: [0, -6, 0] }
export const FLOAT_TRANSITION = {
  duration: 4.5,
  ease: 'easeInOut',
  repeat: Infinity,
  repeatType: 'loop' as const,
}

export const HOVER_LIFT = {
  y: -4,
  transition: { duration: 0.25, ease: SOFT_EASE },
}
