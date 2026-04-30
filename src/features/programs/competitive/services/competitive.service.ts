import type { CompetitiveData } from '../types'

// Static seed — replace body with a Supabase query when ready:
// const { data } = await supabase.from('competitive_programs').select('*, age_groups(*)').single()
export async function getCompetitiveData(): Promise<CompetitiveData> {
  return {
    overview: {
      paragraphs: [
        'Our Competitive programs train at a high level and attend local, national, and international competitions. Athletes entering this group must display a desire to begin training on a committed basis. Both athlete and family must be committed to this level.',
        'They practice a minimum of three times per week for a total of 6–12 hours per week depending on their age. They compete in the following age groups: 12 & Under, 13–15, 16–17 and 18–19. They compete in five to eight meets at a local, regional and national level. Practice includes both land and water training.',
      ],
    },
    ageGroups: [
      {
        id: '12u',
        name: '12 & Under Age Group',
        coaches: 'Maria Romero & Daniela Garmendia',
        workoutDays: 'Monday, Wednesday & Saturday morning',
      },
      {
        id: '13-15',
        name: '13–15 Age Group',
        coaches: 'Daniela Garmendia & Yuki Maekawa',
        workoutDays: '2 Weekdays and Saturday morning',
      },
      {
        id: 'junior',
        name: 'Junior / 16–19 Age Group',
        description:
          'Our Junior Team competes at high-level meets and trains at an elite level. The junior team program is geared towards those who are fully committed to training and competing at an elite level. Swimmers train 11 months of the year, and attend a minimum of 8 meets a year. Many swimmers go on to train with US National Teams. Minimum age for the group is 14.',
        coaches: 'Jocilyn Sayler & Maria Romero',
        workoutDays: '3 Weekdays and Sunday morning',
        highlights: [
          { text: '11 months of training per year' },
          { text: 'Minimum of 8 meets per year' },
          { text: 'Elite level training and competition' },
          { text: 'Pathway to US National Teams' },
          { text: 'Minimum age: 14 years old' },
        ],
      },
      {
        id: 'senior',
        name: 'Senior Team',
        description:
          'Our Senior Team competes and trains at an elite level. The senior team program is designed to place our athletes at the highest possible level of competition in the United States. Swimmers train year round. Swimmers attend national and international level meets.',
        coaches: '',
        workoutDays: '',
      },
    ],
    commitmentNote: 'All Age Group programs are year-round commitments',
  }
}
