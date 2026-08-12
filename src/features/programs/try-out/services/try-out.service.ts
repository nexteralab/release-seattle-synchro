import { supabase } from '#/utils/supabase'
import type { TryOutData } from '../types'
import heroImage from '/images/programs/try-out/hero.webp'

const TABLE = 'try_out_config'
const ROW_ID = 1

const FALLBACK: TryOutData = {
  ages: '6 – 11 years old',
  when: 'Try out for Novice',
  location: {
    name: 'Triangle Pool',
    address: '1919 108th Ave SE, Bellevue, WA',
  },
  heroImage: heroImage,
}

const sb = supabase as unknown as {
  from: (t: string) => {
    select: (cols: string) => {
      eq: (k: string, v: unknown) => {
        maybeSingle: () => Promise<{
          data: { content: TryOutData } | null
          error: unknown
        }>
      }
    }
  }
}

export async function getTryOutData(): Promise<TryOutData> {
  const { data, error } = await sb
    .from(TABLE)
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error || !data?.content) return FALLBACK
  return data.content
}
