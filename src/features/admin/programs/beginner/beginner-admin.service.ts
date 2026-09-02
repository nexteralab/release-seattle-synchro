import { getConfig, setConfig } from '#/features/programs/config.service'
import type { BeginnerSubProgram, BeginnerSubProgramId } from '#/features/programs/beginner/types'

// ── Types ────────────────────────────────────────────────────
export type SubProgramId = BeginnerSubProgramId
export type SubProgram = BeginnerSubProgram

export interface BeginnerConfig {
  id?: string
  sub_programs: SubProgram[]
  updated_at?: string
}

// ── Defaults ─────────────────────────────────────────────────
export const DEFAULT_CONFIG: BeginnerConfig = {
  sub_programs: [
    {
      id: 'novice',
      name: 'Novice',
      ages: '5–10',
      coaches: 'Maya Reistad\nSophie Lin\nGiordana Ventura',
      workout_days_times: 'Wednesday and Fridays\n5:00-7:00pm',
      location:
        "Bellevue Aquatic Center\n(Outdoor pool, please be aware and prepare for Seattle's weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.",
      dates: 'March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th',
      cost:
        '$TBD monthly fee\nOne time registration fee\nThree quarterly pledges to the Booster Club (each around $250)\nOutfitting costs later during the season',
      registration: 'We will open registration soon during the first week of September.',
      first_practice_date_time: 'Wednesday, September 3rd\n6:00pm – 7:30pm',
      first_practice_address: 'Bellevue Aquatic Center\n601 143rd Ave NE, Bellevue, WA, 98007',
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      ages: '7-12 years old',
      coaches: 'Lacey Ethier\nGiordana Ventura',
      workout_days_times: 'Mondays 7:00-9:00pm\nFridays 5:00-7:00pm',
      location:
        "Bellevue Aquatic Center\n(Outdoor pool, please be aware and prepare for Seattle's weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.",
      dates: 'March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th',
      cost: '$265 Per Month, $275 registration fee, outfitting costs & traveling costs.',
      registration: '',
      first_practice_date_time: '',
      first_practice_address: '',
    },
  ],
}

export async function getBeginnerConfig(): Promise<BeginnerConfig> {
  return (await getConfig<BeginnerConfig>('beginner')) ?? DEFAULT_CONFIG
}

export async function saveBeginnerConfig(config: BeginnerConfig): Promise<void> {
  await setConfig('beginner', { sub_programs: config.sub_programs })
}
