export interface FreeTryLocation {
  name: string
  address: string
  image?: string
}

export interface FreeTryHeroContent {
  badge: string
  title: string
  description: string
  ctaLabel: string
  ctaUrl: string
  /** URL de R2. Vacío = usa la imagen del bundle. */
  image: string
}

export interface FreeTryBannerContent {
  heading: string
  description: string
  registerLabel: string
  registerUrl: string
  contactLabel: string
  /** Una de las cuatro imágenes de marca del CtaBanner. */
  image: '1' | '2' | '3' | '4'
}

export interface FreeTrySafetyContent {
  requirementTitle: string
  requirement: string
  contactTitle: string
  contactHeading: string
  contactBody: string
  contactLabel: string
}

export interface FreeTryFaqItem {
  question: string
  answer: string
}

export interface FreeTryData {
  date: string
  time: string
  ages: string
  location: FreeTryLocation
  hero: FreeTryHeroContent
  safety: FreeTrySafetyContent
  faq: FreeTryFaqItem[]
  banner: FreeTryBannerContent
}
