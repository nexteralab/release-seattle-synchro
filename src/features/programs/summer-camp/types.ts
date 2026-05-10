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

export interface CampRequirement {
  name: string
  note?: string
  link?: string
}

export interface SummerCampContent {
  /** Imagen del hero. Si está vacío, se usa la imagen bundled. */
  hero_image_url: string
  /** Texto libre. `\n\n` = separador de párrafo. */
  overview_body: string
  details: CampDetails
  sessions: CampSession[]
  price_per_week: string
  requirements: CampRequirement[]
}
