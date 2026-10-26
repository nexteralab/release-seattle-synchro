import { getConfig } from '#/features/programs/config.service'
import type { SummerCampContent } from '../types'

const REGISTER_URL = 'https://www.seattlesynchrosst.com/page/system/classreg-shopping'

// Defaults = el texto que estaba fijo en la página. Una sola copia para la
// página pública y para el formulario del admin.
export const SUMMER_CAMP_DEFAULTS: SummerCampContent = {
  hero: {
    badge: 'Limited Spots Available',
    kicker: 'Artistic Swimming',
    title: 'Summer Camp',
    subtitle: 'for kids in Washington',
    ctaLabel: 'Register Now',
    ctaUrl: REGISTER_URL,
    image: '',
  },
  overview: {
    heading: 'About the Camp',
    body: [
      "Dive into the world of artistic swimming at our recreational summer camp! Join us for a week of fun and creativity as we blend athleticism with artistry in the pool. Designed for swimmers of all levels, our camp offers expert instruction in technique, choreography, and teamwork.",
      "Participants will learn a routine set to music, develop their swimming skills, and unleash their creativity through water-based performances. Whether you're a beginner or have some experience, come make a splash with us this summer!",
      'Skills: campers will reinforce swimming technique, learn basic artistic swimming skills and a routine that will be performed at the end of the week.',
    ].join('\n\n'),
    detailsHeading: 'Camp Details',
  },
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
  dates: {
    kicker: 'Mark Your Calendar',
    heading: 'Two Sessions.\nOne Summer.',
    registerLabel: 'Register',
    investmentLabel: 'Investment',
  },
  price_per_week: '$330 per week',
  requirements: {
    heading: 'What Do You Need?',
    items: [
      { name: 'Swim Suit', note: '', link: '', linkLabel: '' },
      { name: 'Swim Cap', note: '', link: '', linkLabel: '' },
      { name: 'Goggles', note: '', link: '', linkLabel: '' },
      {
        name: 'Nose Clips',
        note: 'Recommendations',
        link: 'https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW',
        linkLabel: 'View on Amazon',
      },
      { name: 'Towel', note: '', link: '', linkLabel: '' },
    ],
  },
  reviews: [],
  banner: {
    heading: 'Ready to Dive In?',
    description:
      'Spots fill up quickly! Register now to secure your place in our 2026 Summer Camp program.',
    registerLabel: 'Register Now',
    registerUrl: REGISTER_URL,
    contactLabel: 'Contact Us',
    image: '1',
  },
}

/** Rellena lo que falte: filas guardadas cuando solo existían details/sessions/precio. */
function withDefaults(stored: Partial<SummerCampContent> | undefined): SummerCampContent {
  if (!stored) return SUMMER_CAMP_DEFAULTS
  return {
    ...SUMMER_CAMP_DEFAULTS,
    ...stored,
    hero: { ...SUMMER_CAMP_DEFAULTS.hero, ...stored.hero },
    overview: { ...SUMMER_CAMP_DEFAULTS.overview, ...stored.overview },
    details: { ...SUMMER_CAMP_DEFAULTS.details, ...stored.details },
    dates: { ...SUMMER_CAMP_DEFAULTS.dates, ...stored.dates },
    requirements: { ...SUMMER_CAMP_DEFAULTS.requirements, ...stored.requirements },
    banner: { ...SUMMER_CAMP_DEFAULTS.banner, ...stored.banner },
  }
}

export async function getSummerCampContent(): Promise<SummerCampContent> {
  const stored = await getConfig<{ content?: Partial<SummerCampContent> }>('summer-camp')
  return withDefaults(stored?.content)
}
