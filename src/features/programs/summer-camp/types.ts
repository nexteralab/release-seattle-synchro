/**
 * Forma del JSONB único `summer_camp.content`.
 * Una sola fila singleton en Supabase. Kickers/headings se quedan en el código.
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

export interface SummerCampContent {
  details: CampDetails
  sessions: CampSession[]
  price_per_week: string
}
