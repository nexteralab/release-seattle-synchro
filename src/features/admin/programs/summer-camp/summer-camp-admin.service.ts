import { supabase } from '#/utils/supabase'

const db = supabase as any

export interface CampLocation {
  name: string
  dates: string
  address: string
}

export interface CampRequirement {
  name: string
  note: string
  link: string
}

export interface SummerCampConfig {
  id?: string
  year: number
  overview_text: string
  ages: string
  skill_level: string
  schedule: string
  locations: CampLocation[]
  price_per_week: string
  register_url: string
  requirements: CampRequirement[]
  updated_at?: string
}

export const DEFAULT_CONFIG: SummerCampConfig = {
  year: new Date().getFullYear(),
  overview_text:
    'Dive into the world of artistic swimming at our recreational summer camp! Join us for a week of fun and creativity as we blend athleticism with artistry in the pool. Designed for swimmers of all levels, our camp offers expert instruction in technique, choreography, and teamwork.\n\nParticipants will learn a routine set to music, develop their swimming skills, and unleash their creativity through water-based performances. Whether you\'re a beginner or have some experience, come make a splash with us this summer!\n\nSkills: campers will reinforce swimming technique, learn basic artistic swimming skills and a routine that will be performed at the end of the week.',
  ages: '6–11 years old',
  skill_level: 'For safety reasons, campers should be able to independently swim two laps of crawl stroke and float on their back.',
  schedule: '9:00 AM – 11:00 AM',
  locations: [
    { name: 'July in Bellevue (Newport Hills)', dates: 'July 27 – July 31, 2026', address: 'Newport Swim and Tennis Club\n5464 119th Ave SE, Bellevue, WA 98006' },
    { name: 'August in Somerset', dates: 'August 3 – August 7, 2026', address: '4445 Somerset Blvd SE, Bellevue, WA 98006' },
  ],
  price_per_week: '$450 per week',
  register_url: 'https://www.seattlesynchrosst.com/page/system/classreg-shopping',
  requirements: [
    { name: 'Swim Suit', note: '', link: '' },
    { name: 'Swim Cap', note: '', link: '' },
    { name: 'Goggles', note: '', link: '' },
    { name: 'Nose Clips', note: 'Recommendations', link: 'https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW/' },
    { name: 'Towel', note: '', link: '' },
  ],
}

export async function getSummerCampConfig(): Promise<SummerCampConfig> {
  const { data } = await db
    .from('summer_camp_config')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data) return DEFAULT_CONFIG
  return data as SummerCampConfig
}

export async function saveSummerCampConfig(config: SummerCampConfig): Promise<void> {
  const payload = {
    year:          config.year,
    overview_text: config.overview_text,
    ages:          config.ages,
    skill_level:   config.skill_level,
    schedule:      config.schedule,
    locations:     config.locations,
    price_per_week: config.price_per_week,
    register_url:  config.register_url,
    requirements:  config.requirements,
  }

  if (config.id) {
    const { error } = await db.from('summer_camp_config').update(payload).eq('id', config.id)
    if (error) throw error
  } else {
    const { error } = await db.from('summer_camp_config').insert(payload)
    if (error) throw error
  }
}
