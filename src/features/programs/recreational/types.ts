/** Ítem con arranque en negrita: "<strong>lead</strong> rest". */
export interface RecreationalLeadItem {
  lead: string
  rest: string
}

export interface RecreationalFaqItem {
  question: string
  answer: string
}

export interface RecreationalComparisonRow {
  label: string
  recreational: string
  competitive: string
}

/** Sharks & Mermaids: el único sub-programa que se muestra hoy. */
export interface RecreationalProgram {
  name: string
  ages: string
  coach: string
  workout_days_times: string
  /** Opcional: vacío = no se muestra */
  schedule_note: string
  /** Opcional: vacío = no se muestra */
  duration: string
  cost: string
  /** Opcional: vacío = no se muestra */
  cost_note: string
  description: string
  register_label: string
  register_url: string
  skills_title: string
  skills: string[]
}

export interface RecreationalData {
  hero: {
    /** URL de R2. Vacío = usa la imagen del bundle. */
    image: string
    alt: string
  }
  overview: {
    title: string
    subtitle: string
    /** Admite **negritas**. */
    body: string
  }
  program: RecreationalProgram
  classLook: {
    title: string
    pills: string[]
    intro: string
    items: RecreationalLeadItem[]
    callout: string
  }
  whoFor: {
    title: string
    items: RecreationalLeadItem[]
  }
  gymnasticsFit: {
    kicker: string
    title: string
    inputs: string[]
    result: string
    body: string
    items: RecreationalLeadItem[]
  }
  comparison: {
    title: string
    intro: string
    recreationalLabel: string
    competitiveLabel: string
    rows: RecreationalComparisonRow[]
    /** Fila final que ocupa las dos columnas. Vacía = no se muestra. */
    footerLabel: string
    footerText: string
  }
  summerCampFit: {
    title: string
    intro: string
    highlights: string[]
    outro: string
    ctaLabel: string
  }
  faq: {
    title: string
    items: RecreationalFaqItem[]
    blogLead: string
    blogLabel: string
  }
  banner: {
    heading: string
    description: string
    contactLabel: string
    image: '1' | '2' | '3' | '4'
  }
}
