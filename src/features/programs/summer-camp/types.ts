import type { Review } from '#/components/Reviews'
import type { FreeTryBannerContent } from '#/features/programs/free-try/types'

/**
 * Forma del JSON `content` de la fila 'summer-camp' en `config`.
 * Toda la página principal es editable; las páginas por ciudad salen de
 * `locations/data.ts` y no usan esto.
 */

export interface CampDetails {
  ages: string
  skill_level: string
  schedule: string
}

export interface CampSession {
  name: string
  dates: string
  address: string
  register_url: string
}

export interface SummerCampHeroContent {
  badge: string
  kicker: string
  /** H1 de la página. */
  title: string
  subtitle: string
  ctaLabel: string
  ctaUrl: string
  /** URL de R2. Vacío = usa la imagen del bundle. */
  image: string
}

export interface SummerCampOverviewContent {
  heading: string
  /** Párrafos separados por una línea en blanco. */
  body: string
  detailsHeading: string
}

export interface SummerCampDatesContent {
  kicker: string
  /** Un salto de línea = corte en desktop. */
  heading: string
  registerLabel: string
  investmentLabel: string
}

export interface SummerCampRequirement {
  name: string
  note: string
  link: string
  linkLabel: string
}

export interface SummerCampRequirementsContent {
  heading: string
  items: SummerCampRequirement[]
}

export type SummerCampBannerContent = FreeTryBannerContent

export interface SummerCampContent {
  hero: SummerCampHeroContent
  overview: SummerCampOverviewContent
  details: CampDetails
  sessions: CampSession[]
  dates: SummerCampDatesContent
  price_per_week: string
  requirements: SummerCampRequirementsContent
  /** Vacío = la sección muestra las reviews de siempre (REVIEWS). */
  reviews: Review[]
  banner: SummerCampBannerContent
}
