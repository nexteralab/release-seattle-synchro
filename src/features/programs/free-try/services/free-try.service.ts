import { supabase } from '#/utils/supabase'
import type { FreeTryData } from '../types'
import imageFreeTry from '/images/free-try.webp'


const TABLE = 'free_try_config'
const ROW_ID = 1

const FALLBACK: FreeTryData = {
  date: 'June 7th, 2026',
  time: '11:30 am – 12:00 pm',
  ages: '7 – 11 years old',
  location: {
    name: 'Newport Hills',
    address: 'Swim and Tennis Club\nAthletic Excellence Center',
  },
  image: imageFreeTry,
}

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
  }
}

export async function getFreeTryData(): Promise<FreeTryData> {
  const { data, error } = await sb
    .from(TABLE)
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error || !data?.content) return FALLBACK
  return data.content
}
