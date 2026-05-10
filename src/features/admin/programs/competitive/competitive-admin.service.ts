import { supabase } from '#/utils/supabase'
import type { AgeGroup, AgeGroupId, CompetitiveConfig } from '#/features/programs/competitive/types'

const db = supabase as any

// Re-exportamos los tipos públicos como SSOT
export type { AgeGroup, AgeGroupId, CompetitiveConfig }

// ── Defaults ─────────────────────────────────────────────────
export const DEFAULT_CONFIG: CompetitiveConfig = {
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

const TABLE = 'competitive_config'

export async function getCompetitiveConfig(): Promise<CompetitiveConfig> {
  const { data } = await db
    .from(TABLE)
    .select('id, age_groups, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data) return DEFAULT_CONFIG
  return data as CompetitiveConfig
}

export async function saveCompetitiveConfig(config: CompetitiveConfig): Promise<void> {
  const payload = { age_groups: config.age_groups }

  if (config.id) {
    const { error } = await db.from(TABLE).update(payload).eq('id', config.id)
    if (error) throw error
  } else {
    const { error } = await db.from(TABLE).insert(payload)
    if (error) throw error
  }
}
