/** Un grupo de edad. Coaches: uno por línea. */
export interface CompetitiveGroup {
  title: string
  /** Párrafo bajo el título; vacío = no se muestra. */
  description: string
  coaches: string
  workoutDays: string
}

export interface CompetitiveData {
  hero: {
    /** URL de R2. Vacío = usa la imagen del bundle. */
    image: string
    alt: string
  }
  overview: {
    /** H1 de la página. */
    title: string
    heading: string
    /** Párrafos separados por una línea en blanco. */
    body: string
  }
  under12: CompetitiveGroup
  teen: CompetitiveGroup
  junior: CompetitiveGroup & {
    highlightsTitle: string
    highlights: string[]
  }
  senior: {
    title: string
    description: string
  }
  banner: {
    heading: string
    description: string
    contactLabel: string
    image: '1' | '2' | '3' | '4'
  }
}
