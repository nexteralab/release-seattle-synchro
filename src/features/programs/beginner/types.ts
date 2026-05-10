export type BeginnerSubProgramId = 'novice' | 'intermediate'

export interface BeginnerSubProgram {
  id: BeginnerSubProgramId
  name: string
  ages: string
  /** Multilínea con `\n` */
  coaches: string
  /** Multilínea con `\n` */
  workout_days_times: string
  /** Multilínea con `\n` */
  location: string
  /** Multilínea con `\n` */
  dates: string
  /** Multilínea con `\n` */
  cost: string
  registration: string
  /** Multilínea con `\n` (vacío si no aplica — Intermediate) */
  first_practice_date_time: string
  /** Multilínea con `\n` (vacío si no aplica — Intermediate) */
  first_practice_address: string
}
