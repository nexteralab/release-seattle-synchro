import { supabase } from '#/utils/supabase'
import type { SummerCampContent } from '#/features/programs/summer-camp'

export type {
  SummerCampContent,
  CampSession,
  CampDetails,
} from '#/features/programs/summer-camp'

export const DEFAULT_CONTENT: SummerCampContent = {
  details: { ages: '', skill_level: '', schedule: '' },
  sessions: [],
  price_per_week: '',
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
