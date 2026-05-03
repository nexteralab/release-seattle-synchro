// ── New types (admin + future public) ────────────────────────
export interface AgeGroup {
  id: string
  name: string
  coaches: string
  workout_days: string
  description?: string
  highlights?: string[]
}

export interface CompetitiveConfig {
  id?: string
  overview: string[]
  commitment_note: string
  age_groups: AgeGroup[]
  updated_at?: string
}

// ── Legacy types — public components still use these ─────────
export interface AgeGroupHighlight { text: string }

export interface LegacyAgeGroup {
  id: string
  name: string
  description?: string
  coaches: string
  workoutDays: string
  highlights?: AgeGroupHighlight[]
}

export interface CompetitiveOverviewShape { paragraphs: string[] }

export interface CompetitiveData {
  overview: CompetitiveOverviewShape
  ageGroups: LegacyAgeGroup[]
  commitmentNote: string
}
