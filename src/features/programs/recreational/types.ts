export type RecreationalSubProgramId = 'sea-stars' | 'sharks-mermaids' | 'dolphins'

export interface RecreationalSubProgram {
  id: RecreationalSubProgramId
  name: string
  ages: string
  coach: string
  workout_days_times: string
  /** Optional — vacío para Dolphins */
  schedule_note: string
  /** Optional — vacío para Sea Stars / Sharks & Mermaids */
  duration: string
  cost: string
  /** Optional — vacío para Dolphins */
  cost_note: string
}
