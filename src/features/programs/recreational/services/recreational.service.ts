import { getConfig } from '#/features/programs/config.service'
import type { RecreationalSubProgram } from '../types'

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
  return (await getConfig<RecreationalConfig>('recreational')) ?? FALLBACK
}
