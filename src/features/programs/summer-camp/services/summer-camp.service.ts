import type { SummerCampContent } from '../types'

const REGISTER_URL = 'https://www.seattlesynchrosst.com/page/system/classreg-shopping'

// Seed estático. Reemplazar por:
//   const { data } = await supabase.from('summer_camp').select('content').single()
//   return data.content as SummerCampContent
export async function getSummerCampContent(): Promise<SummerCampContent> {
  return {
    hero_image_url: '',
    overview_body:
      "Dive into the world of artistic swimming at our recreational summer camp! Join us for a week of fun and creativity as we blend athleticism with artistry in the pool. Designed for swimmers of all levels, our camp offers expert instruction in technique, choreography, and teamwork.\n\nParticipants will learn a routine set to music, develop their swimming skills, and unleash their creativity through water-based performances. Whether you're a beginner or have some experience, come make a splash with us this summer!\n\nSkills: campers will reinforce swimming technique, learn basic artistic swimming skills and a routine that will be performed at the end of the week.",
    details: {
      ages: '6–11 years old',
      skill_level:
        'For safety reasons, campers should be able to independently swim two laps of crawl stroke and float on their back.',
      schedule: '9:00 AM – 11:00 AM',
    },
    sessions: [
      {
        name: 'July in Bellevue (Newport Hills)',
        dates: 'July 27 – July 31, 2026',
        address: 'Newport Swim and Tennis Club\n5464 119th Ave SE, Bellevue, WA 98006',
        register_url: REGISTER_URL,
      },
      {
        name: 'August in Somerset',
        dates: 'August 3 – August 7, 2026',
        address: '4445 Somerset Blvd SE, Bellevue, WA 98006',
        register_url: REGISTER_URL,
      },
    ],
    price_per_week: '$330 per week',
    requirements: [
      { name: 'Swim Suit' },
      { name: 'Swim Cap' },
      { name: 'Goggles' },
      {
        name: 'Nose Clips',
        note: 'Recomendations',
        link: 'https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW',
      },
      { name: 'Towel' },
    ],
  }
}
