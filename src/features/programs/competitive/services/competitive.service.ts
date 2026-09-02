import { getConfig } from '#/features/programs/config.service'
import type { CompetitiveConfig } from '../types'

// Fallback estático — se usa si la tabla está vacía o aún no existe.
const FALLBACK: CompetitiveConfig = {
  age_groups: [
    {
      id: '12u',
      name: '12 & Under Age Group',
      coaches: 'Maria Romero\nDaniela Garmendia\nPatricia Camaran\nIvy Huang',
      workout_days: 'Monday, Wednesday & Saturday morning',
    },
    {
      id: '13-15',
      name: '13–15 Age Group',
      coaches: 'A Team: Patricia Camaran\nB Team: Daniela Garmendia\nC Team: Ivy Huang',
      workout_days: '2 Weekdays and Saturday morning',
    },
    {
      id: 'junior',
      name: 'Junior / 16–19 Age Group',
      coaches: 'Maria Romero',
      workout_days: '3 Weekdays and Sunday morning',
    },
  ],
}

export async function getCompetitiveConfig(): Promise<CompetitiveConfig> {
  return (await getConfig<CompetitiveConfig>('competitive')) ?? FALLBACK
}
