import { supabase } from '#/utils/supabase'
import type { AgeGroup, CompetitiveConfig } from '#/features/programs/competitive/types'

const db = supabase as any

export type { AgeGroup, CompetitiveConfig }

export const DEFAULT_CONFIG: CompetitiveConfig = {
  overview: [
    'Our Competitive programs train at a high level and attend local, national, and international competitions. Athletes entering this group must display a desire to begin training on a committed basis. Both athlete and family must be committed to this level. They practice a minimum of three times per week for a total of 6-12 hours per week depending on their age.',
    'They compete in the following age groups: 12 & Under, 13-15, 16-17 and 18-19. They compete in five to eight meets at a local, regional and national level. Practice includes both land and water training.',
  ],
  commitment_note: 'All Age Group programs are year-round commitments',
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
      description:
        'Our Junior Team competes at high-level meets and trains at an elite level. The junior team program is geared towards those who are fully committed to training and competing at an elite level. Swimmers train 11 months of the year, and attend a minimum of 8 meets a year. Many swimmers go on to train with US National Teams. Minimum age for the group is 14.',
      coaches: 'Maria Romero',
      workout_days: '3 Weekdays and Sunday morning',
      highlights: [
        '11 months of training per year',
        'Minimum of 8 meets per year',
        'Elite level training and competition',
        'Pathway to US National Teams',
        'Minimum age: 14 years old',
      ],
    },
    {
      id: 'senior',
      name: 'Senior Team',
      description:
        'Our Senior Team competes and trains at an elite level. The senior team program is designed to place our athletes at the highest possible level of competition in the United States. Swimmers train year round. Swimmers attend national and international level meets.',
      coaches: '',
      workout_days: '',
    },
  ],
}

export async function getCompetitiveConfig(): Promise<CompetitiveConfig> {
  const { data } = await db
    .from('competitive_config')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data) return DEFAULT_CONFIG
  return data as CompetitiveConfig
}

export async function saveCompetitiveConfig(config: CompetitiveConfig): Promise<void> {
  const payload = {
    overview:        config.overview,
    commitment_note: config.commitment_note,
    age_groups:      config.age_groups,
  }

  if (config.id) {
    const { error } = await db.from('competitive_config').update(payload).eq('id', config.id)
    if (error) throw error
  } else {
    const { error } = await db.from('competitive_config').insert(payload)
    if (error) throw error
  }
}
