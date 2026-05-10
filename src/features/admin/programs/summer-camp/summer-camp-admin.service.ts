import { supabase } from '#/utils/supabase'
import type { SummerCampContent } from '#/features/programs/summer-camp'

export type {
  SummerCampContent,
  CampSession,
  CampRequirement,
  CampDetails,
} from '#/features/programs/summer-camp'

export const DEFAULT_CONTENT: SummerCampContent = {
  hero_image_url: '',
  overview_body: '',
  details: { ages: '', skill_level: '', schedule: '' },
  sessions: [],
  price_per_week: '',
  requirements: [],
}

const TABLE = 'summer_camp'
const ROW_ID = 1

// `summer_camp` aún no está en database.types.ts (regenerar con
// `supabase gen types typescript` después de correr el SQL).
// Casteamos a any igual que el patrón de news.service.ts.
const sb = supabase as unknown as {
  from: (t: string) => {
    select: (cols: string) => {
      eq: (k: string, v: unknown) => {
        maybeSingle: () => Promise<{
          data: { content: SummerCampContent } | null
          error: unknown
        }>
      }
    }
    upsert: (row: { id: number; content: SummerCampContent }) => Promise<{ error: unknown }>
  }
}

export async function getSummerCampContent(): Promise<SummerCampContent> {
  const { data, error } = await sb.from(TABLE).select('content').eq('id', ROW_ID).maybeSingle()
  if (error) throw error
  return data?.content ?? DEFAULT_CONTENT
}

export async function saveSummerCampContent(content: SummerCampContent): Promise<void> {
  const { error } = await sb.from(TABLE).upsert({ id: ROW_ID, content })
  if (error) throw error
}

const BUCKET = 'summer-camp'

export async function uploadSummerCampHeroImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg'
  const fileName = `hero-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}
