import { getConfig } from '#/features/programs/config.service'
import type { CompetitiveData } from '../types'

export const COMPETITIVE_DEFAULTS: CompetitiveData = {
  hero: {
    image: '',
    alt: 'Artistic swimming coach training kids poolside',
  },
  overview: {
    title: 'Competitive Programs',
    heading: 'Program Overview',
    body:
      'Our Competitive programs train at a high level and attend local, national, and international competitions. Athletes entering this group must display a desire to begin training on a committed basis. Both athlete and family must be committed to this level.\n\n' +
      'They practice a minimum of three times per week for a total of 6–12 hours per week depending on their age. They compete in the following age groups: 12 & Under, 13–15, 16–17 and 18–19. They compete in five to eight meets at a local, regional and national level. Practice includes both land and water training.',
  },
  under12: {
    title: '12 & Under Age Group',
    description: '',
    coaches: 'Maria Romero\nDaniela Garmendia\nPatricia Camaran\nIvy Huang',
    workoutDays: 'Monday, Wednesday & Saturday morning',
  },
  teen: {
    title: '13–15 Age Group',
    description: '',
    coaches: 'A Team: Patricia Camaran\nB Team: Daniela Garmendia\nC Team: Ivy Huang',
    workoutDays: '2 Weekdays and Saturday morning',
  },
  junior: {
    title: 'Junior / 16–19 Age Group',
    description:
      'Our Junior Team competes at high-level meets and trains at an elite level. The junior team program is geared towards those who are fully committed to training and competing at an elite level. Swimmers train 10 months of the year, and attend a minimum of 8 meets a year. Many swimmers go on to train with US National Teams. Minimum age for the group is 14.',
    coaches: 'Maria Romero',
    workoutDays: '3 Weekdays and Sunday morning',
    highlightsTitle: 'Program Highlights',
    highlights: [
      '10 months of training per year',
      'Minimum of 8 meets per year',
      'Elite level training and competition',
      'Pathway to US National Teams',
      'Minimum age: 14 years old',
    ],
  },
  senior: {
    title: 'Senior Team',
    description:
      'Our Senior Team competes and trains at an elite level. The senior team program is designed to place our athletes at the highest possible level of competition in the United States. Swimmers train year round and attend national and international level meets.',
  },
  banner: {
    heading: 'Ready to Join?',
    description:
      'Sign up for one of our competitive programs and discover the joy of artistic swimming.',
    contactLabel: 'Contact Us',
    image: '1',
  },
}

/** Forma vieja: solo coaches y días por grupo, en la raíz de la fila. */
interface LegacyConfig {
  age_groups?: { id: '12u' | '13-15' | 'junior'; coaches: string; workout_days: string }[]
}

interface Stored extends LegacyConfig {
  content?: Partial<CompetitiveData>
}

/** Rellena lo que falte y migra coaches/días guardados con la forma vieja. */
function withDefaults(stored: Stored | null): CompetitiveData {
  const d = COMPETITIVE_DEFAULTS
  const c = stored?.content ?? {}
  const legacy = new Map((stored?.age_groups ?? []).map(g => [g.id, g]))
  const fromLegacy = (id: '12u' | '13-15' | 'junior') => {
    const g = legacy.get(id)
    return g ? { coaches: g.coaches, workoutDays: g.workout_days } : {}
  }
  return {
    hero: { ...d.hero, ...c.hero },
    overview: { ...d.overview, ...c.overview },
    under12: { ...d.under12, ...fromLegacy('12u'), ...c.under12 },
    teen: { ...d.teen, ...fromLegacy('13-15'), ...c.teen },
    junior: { ...d.junior, ...fromLegacy('junior'), ...c.junior },
    senior: { ...d.senior, ...c.senior },
    banner: { ...d.banner, ...c.banner },
  }
}

export async function getCompetitiveData(): Promise<CompetitiveData> {
  return withDefaults(await getConfig<Stored>('competitive'))
}
