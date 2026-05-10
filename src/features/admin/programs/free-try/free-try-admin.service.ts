import { supabase } from '#/utils/supabase'
import type { FreeTryData } from '#/features/programs/free-try/types'

// Re-export el tipo público como SSOT
export type { FreeTryData, FreeTryLocation } from '#/features/programs/free-try'

export const DEFAULT_CONTENT: FreeTryData = {
  date: 'June 7th, 2026',
  time: '11:30 am – 12:00 pm',
  ages: '7 – 11 years old',
  location: {
    name: 'Newport Hills',
    address: 'Swim and Tennis Club\nAthletic Excellence Center',
  },
}

const TABLE = 'free_try_config'
const ROW_ID = 1

const sb = supabase as unknown as {
  from: (t: string) => {
    select: (cols: string) => {
      eq: (k: string, v: unknown) => {
        maybeSingle: () => Promise<{
          data: { content: FreeTryData } | null
          error: unknown
        }>
      }
    }
    upsert: (row: { id: number; content: FreeTryData }) => Promise<{ error: unknown }>
  }
}

export async function getFreeTryConfig(): Promise<FreeTryData> {
  const { data, error } = await sb
    .from(TABLE)
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle()
  if (error) throw error
  return data?.content ?? DEFAULT_CONTENT
}

export async function saveFreeTryConfig(content: FreeTryData): Promise<void> {
  const { error } = await sb.from(TABLE).upsert({ id: ROW_ID, content })
  if (error) throw error
}
