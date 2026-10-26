export type BeginnerSubProgramId = 'novice' | 'intermediate'

export interface BeginnerSubProgram {
  id: BeginnerSubProgramId
  name: string
  /** Párrafos separados por una línea en blanco */
  description: string
  ages: string
  /** Multilínea con `\n` */
  coaches: string
  /** Multilínea con `\n` */
  workout_days_times: string
  /** Multilínea con `\n` */
  location: string
  /** Multilínea con `\n` */
  dates: string
  /** Multilínea con `\n` */
  cost: string
  registration: string
  /** Multilínea con `\n` (vacío si no aplica — Intermediate) */
  first_practice_date_time: string
  /** Multilínea con `\n` (vacío si no aplica — Intermediate) */
  first_practice_address: string
}

/** Forma completa de `config.beginner.content`. */
export interface BeginnerData {
  hero: {
    /** URL de R2. Vacío = usa la imagen del bundle. */
    image: string
  }
  overview: {
    /** H1. Un salto de línea por `\n`. */
    title: string
    description: string
  }
  novice: BeginnerSubProgram
  intermediate: BeginnerSubProgram
  /** Bloques que solo aparecen en la sección Novice */
  tryouts: {
    swimming_skills: string[]
    personal_qualities: string[]
    before_you_join: string
  }
  first_practice: {
    what_to_bring: string[]
    /** Un salto de línea por `\n` */
    what_to_expect: string
  }
  /** Nota al final de Novice; vacía = oculta */
  note: string
  banner: {
    heading: string
    description: string
    contactLabel: string
    image: '1' | '2' | '3' | '4'
  }
}
