import { getConfig } from '#/features/programs/config.service'
import type { BeginnerData, BeginnerSubProgram } from '../types'

const BELLEVUE_LOCATION =
  "Bellevue Aquatic Center\n(Outdoor pool, please be aware and prepare for Seattle's weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit."

// Fallback estático — se usa si la fila está vacía; también son los defaults del form.
export const BEGINNER_DEFAULTS: BeginnerData = {
  hero: { image: '' },
  overview: {
    title: 'Beginner Competitive\nPrograms',
    description:
      'Novice and Intermediate group programs are year-round commitments from September to June.',
  },
  novice: {
    id: 'novice',
    name: 'Novice',
    description:
      'The Novice Team is our beginner competitive level. Swimmers learn proper swimming technique, beginner artistic swimming skills, and the fundamentals of competition.\n\nMembers of the Novice Team attend several local competitions and train from September through June.',
    ages: '5–10',
    coaches: 'Maya Reistad\nSophie Lin\nGiordana Ventura',
    workout_days_times: 'Wednesday and Fridays\n5:00-7:00pm',
    location: BELLEVUE_LOCATION,
    dates: 'March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th',
    cost:
      '$TBD monthly fee\nOne time registration fee\nThree quarterly pledges to the Booster Club (each around $250)\nOutfitting costs later during the season',
    registration: 'We will open registration soon during the first week of September.',
    first_practice_date_time: 'Wednesday, September 3rd\n6:00pm – 7:30pm',
    first_practice_address: 'Bellevue Aquatic Center\n601 143rd Ave NE, Bellevue, WA, 98007',
  },
  intermediate: {
    id: 'intermediate',
    name: 'Intermediate',
    description:
      'The Intermediate Team is the next level after Novice. Swimmers continue developing and perfecting their swimming and artistic swimming fundamentals. Athletes should be able to swim 8 laps of freestyle, 4 laps of breaststroke, and feel comfortable upside down in the water.\n\nSwimmers are placed on this team by invitation only, based on coaching staff evaluations and athlete progression. Team members attend several local competitions throughout the season, as well as one meet in Oregon.\n\nThe season begins in September and ends in mid-June.',
    ages: '7-12 years old',
    coaches: 'Lacey Ethier\nGiordana Ventura',
    workout_days_times: 'Mondays 7:00-9:00pm\nFridays 5:00-7:00pm',
    location: BELLEVUE_LOCATION,
    dates: 'March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th',
    cost: '$265 Per Month, $275 registration fee, outfitting costs & traveling costs.',
    registration: '',
    first_practice_date_time: '',
    first_practice_address: '',
  },
  tryouts: {
    swimming_skills: [
      '4 laps of crawl',
      '4 laps of a backstroke (with the appropriate kick)',
      '4 laps of backstroke',
      '1 lap of eggbeater',
      '1 lap of butterfly',
      'Must be able to independently float on back for 30 seconds',
      'Must be able to tread water for 30 seconds',
      'Must be able to follow instructions',
    ],
    personal_qualities: [
      'Coachability — openness to feedback, willingness to try corrections, and eagerness to improve',
      'Focus and listening — ability to follow directions in a group setting',
      'Respectful behavior — toward coaches, teammates, and the space',
    ],
    before_you_join:
      'To join the team, swimmers must first complete the tryout. It is free, and it is how our coaches confirm swim readiness and find the right team placement.',
  },
  first_practice: {
    what_to_bring: [
      'Swimsuit',
      'Swim cap',
      'Goggles',
      'Nose clips',
      'Towel',
      'Water bottle',
      'Yoga Mat',
      'Elastic shorts for land',
    ],
    what_to_expect:
      'Coaches will introduce swimmers to a head-to-toe warm-up and explain the rules of the class for both structure and safety. Each class includes 1 hour of water skills and 1 hour of land exercises.\nWe ask swimmers to arrive on time and for parents to come into the facility promptly at the end of class for pick-up.',
  },
  note: 'Schedule might change if swimmers are advanced to a different level depending on progress.',
  banner: {
    heading: 'Ready to Join?',
    description:
      'Sign up for one of our recreational programs and discover the joy of artistic swimming.',
    contactLabel: 'Contact Us',
    image: '3',
  },
}

/** Forma vieja (antes de `content`): solo los datos de cada equipo en la raíz. */
interface LegacyBeginnerConfig {
  sub_programs?: Partial<BeginnerSubProgram>[]
}

type Stored = { content?: Partial<BeginnerData> } & LegacyBeginnerConfig

/** Rellena lo que falte y migra la forma vieja `{ sub_programs }` sin perder datos. */
function withDefaults(stored: Stored | null): BeginnerData {
  const legacy = (id: BeginnerSubProgram['id']) => stored?.sub_programs?.find(p => p.id === id)
  const c = stored?.content ?? {}
  const D = BEGINNER_DEFAULTS
  return {
    ...D,
    ...c,
    hero: { ...D.hero, ...c.hero },
    overview: { ...D.overview, ...c.overview },
    novice: { ...D.novice, ...legacy('novice'), ...c.novice },
    intermediate: { ...D.intermediate, ...legacy('intermediate'), ...c.intermediate },
    tryouts: { ...D.tryouts, ...c.tryouts },
    first_practice: { ...D.first_practice, ...c.first_practice },
    banner: { ...D.banner, ...c.banner },
  }
}

export async function getBeginnerData(): Promise<BeginnerData> {
  return withDefaults(await getConfig<Stored>('beginner'))
}
