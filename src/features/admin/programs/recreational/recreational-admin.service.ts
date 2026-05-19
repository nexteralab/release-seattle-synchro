import { supabase } from '#/utils/supabase'
import type {
  RecreationalSubProgram,
  RecreationalSubProgramId,
} from '#/features/programs/recreational/types'

const db = supabase as any

// Re-exportamos los tipos públicos como SSOT
export type SubProgramId = RecreationalSubProgramId
export type SubProgram = RecreationalSubProgram

export interface RecreationalConfig {
  id?: string
  sub_programs: SubProgram[]
  updated_at?: string
}

// ── Defaults ─────────────────────────────────────────────────
export const DEFAULT_CONFIG: RecreationalConfig = {
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
    },
  ],
}

const TABLE = 'recreational_config'

export async function getRecreationalConfig(): Promise<RecreationalConfig> {
  const { data } = await db
    .from(TABLE)
    .select('id, sub_programs, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data) return DEFAULT_CONFIG
  return data as RecreationalConfig
}

export async function saveRecreationalConfig(config: RecreationalConfig): Promise<void> {
  const payload = { sub_programs: config.sub_programs }

  if (config.id) {
    const { error } = await db.from(TABLE).update(payload).eq('id', config.id)
    if (error) throw error
  } else {
    const { error } = await db.from(TABLE).insert(payload)
    if (error) throw error
  }
}
