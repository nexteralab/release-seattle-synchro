/**
 * Una location = una landing page de Summer Camp por ciudad. El `slug` es el `$id`
 * de la ruta. La PLANTILLA (diseño + secciones genéricas) es compartida; los campos
 * de COPY (heroTitle, heroSubtitle, about, locationBlurb, faqs) se varían por ciudad
 * para SEO — evita "doorway pages" duplicadas que Google penaliza.
 * ponytail: data estática en código; migrar a DB cuando crezca a decenas de ciudades.
 */

export interface CampWeek {
  month: string // "July"
  area: string // "Newport Hills"  (barrio, título de la card)
  locationName: string // "Newport Swim & Tennis Club"
  address: string // "5464 119th Ave SE, Bellevue, WA 98006"
  dates: string // "July 27 – 31"
  price: string // "$330"
  mapQuery: string // texto para el link de Google Maps
  featured?: boolean // resalta la card de pricing
}

export interface Faq {
  q: string
  a: string
}

export interface LocationContent {
  slug: string
  city: string // "Bellevue"
  state: string // "WA"
  // Copy variable por ciudad (SEO):
  heroTitle: string
  heroSubtitle: string
  aboutParagraphs: string[]
  locationHeading: string // "Two Pools in Bellevue"
  locationBlurb: string
  weeks: CampWeek[]
  faqs: Faq[]
  mapEmbedQuery: string // "Bellevue, WA 98006"
  heroImage?: string // override opcional; default = hero compartido
  packOffset?: number // rota el orden de "What to Bring" (variedad SEO); default 0
}
