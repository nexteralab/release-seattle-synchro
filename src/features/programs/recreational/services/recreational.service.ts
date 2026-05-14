import { supabase } from '#/utils/supabase'
import type { RecreationalSubProgram } from '../types'

const db = supabase as any
const TABLE = 'recreational_config'

export interface RecreationalConfig {
  id?: string
  sub_programs: RecreationalSubProgram[]
  updated_at?: string
}

const FALLBACK: RecreationalConfig = {
  sub_programs: [
    {
      id: 'sharks-mermaids',
      name: 'Sharks & Mermaids',
      ages: '5–10',
      coach: 'Sophie Lin & Daniela Garmendia',
      workout_days_times: 'Saturdays 11:00am – 11:50am',
      schedule_note: 'No class Friday May 15th. Last class June 5th.',
      duration: '',
      cost: '$50 registration fee + $60 March dues',
      cost_note:
        'Pool fees should be covered through one payment to the booster club (approximately $280)',
    }
  ],
}

export async function getRecreationalConfig(): Promise<RecreationalConfig> {
  const { data, error } = await db
    .from(TABLE)
    .select('id, sub_programs, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error || !data) return FALLBACK
  return data as RecreationalConfig
}
