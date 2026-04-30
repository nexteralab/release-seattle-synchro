import type { SummerCampData } from '../types'

// Static seed — replace body with a Supabase query when ready:
// const { data } = await supabase.from('summer_camp').select('*').single()
export async function getSummerCampData(): Promise<SummerCampData> {
  return {
    details: {
      ages: '6–11 years old',
      skillLevel:
        'For safety reasons, campers should be able to independently swim two laps of crawl stroke and float on their back.',
      schedule: '9:00 AM – 11:00 AM',
      locations: [
        {
          name: 'July in Bellevue (Newport Hills)',
          dates: 'July 27 – July 31, 2026',
          address: 'Newport Swim and Tennis Club\n5464 119th Ave SE, Bellevue, WA 98006',
        },
        {
          name: 'August in Somerset',
          dates: 'August 3 – August 7, 2026',
          address: '4445 Somerset Blvd SE, Bellevue, WA 98006',
        },
      ],
      pricing: {
        perWeek: '$450 per week',
      },
    },
    requirements: [
      { name: 'Swim Suit' },
      { name: 'Swim Cap' },
      { name: 'Goggles' },
      {
        name: 'Nose Clips',
        note: 'Recomendations',
        link: '(https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW/ref=sr_1_5?th=1)',
      },
      { name: 'Towel' },
    ],
  }
}
