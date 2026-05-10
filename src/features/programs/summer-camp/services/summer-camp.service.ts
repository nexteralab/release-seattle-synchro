import { supabase } from '#/utils/supabase'
import type { SummerCampContent } from '../types'

const REGISTER_URL = 'https://www.seattlesynchrosst.com/page/system/classreg-shopping'
const TABLE = 'summer_camp'
const ROW_ID = 1

// Fallback estático — se usa si la tabla está vacía o aún no existe.
const FALLBACK: SummerCampContent = {
  details: {
    ages: '6–11 years old',
    skill_level:
      'For safety reasons, campers should be able to independently swim two laps of crawl stroke and float on their back.',
    schedule: '9:00 AM – 11:00 AM',
  },
  sessions: [
    {
      name: 'July in Bellevue (Newport Hills)',
      dates: 'July 27 – July 31, 2026',
      address: 'Newport Swim and Tennis Club\n5464 119th Ave SE, Bellevue, WA 98006',
      register_url: REGISTER_URL,
    },
    {
      name: 'August in Somerset',
      dates: 'August 3 – August 7, 2026',
      address: '4445 Somerset Blvd SE, Bellevue, WA 98006',
      register_url: REGISTER_URL,
    },
  ],
  price_per_week: '$330 per week',
}

// `summer_camp` aún no está en database.types.ts.
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
  }
}

export async function getSummerCampContent(): Promise<SummerCampContent> {
  const { data, error } = await sb
    .from(TABLE)
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error || !data?.content) return FALLBACK
  return data.content
}
