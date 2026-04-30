export interface AgeGroupHighlight {
  text: string
}

export interface AgeGroup {
  id: string
  name: string
  description?: string
  coaches: string
  workoutDays: string
  highlights?: AgeGroupHighlight[]
}

export interface CompetitiveOverview {
  paragraphs: string[]
}

export interface CompetitiveData {
  overview: CompetitiveOverview
  ageGroups: AgeGroup[]
  commitmentNote: string
}
