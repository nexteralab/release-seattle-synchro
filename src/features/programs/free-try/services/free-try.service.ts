import type { FreeTryData } from '../types'

export async function getFreeTryData(): Promise<FreeTryData> {
  return {
    date: 'June 7th, 2026',
    time: '11:30 am – 12:00 pm',
    ages: '7 – 11 years old',
    safetyNote:
      'Safety is our priority. Participants MUST be able to swim a full lap of crawl stroke and breast stroke unassisted.',
    location: {
      name: 'Newport Hills',
      address: 'Swim and Tennis Club\nAthletic Excellence Center',
    },
    requirements: [
      { name: 'Swim Suit' },
      { name: 'Swim Cap' },
      { name: 'Goggles' },
      {
        name: 'Nose Clips',
        note: 'Recommendations',
        link: 'https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW/ref=sr_1_5?th=1',
      },
      { name: 'Towel' },
    ],
  }
}
