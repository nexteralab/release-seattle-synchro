import { getConfig, setConfig } from '#/features/programs/config.service'
import type {
  RecreationalSubProgram,
  RecreationalSubProgramId,
} from '#/features/programs/recreational/types'

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

export async function getRecreationalConfig(): Promise<RecreationalConfig> {
  return (await getConfig<RecreationalConfig>('recreational')) ?? DEFAULT_CONFIG
}

export async function saveRecreationalConfig(config: RecreationalConfig): Promise<void> {
  await setConfig('recreational', { sub_programs: config.sub_programs })
}
