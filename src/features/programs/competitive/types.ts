export type AgeGroupId = '12u' | '13-15' | 'junior'

export interface AgeGroup {
  id: AgeGroupId
  name: string
  coaches: string
  workout_days: string
}

export interface CompetitiveConfig {
  id?: string
  age_groups: AgeGroup[]
  updated_at?: string
}
