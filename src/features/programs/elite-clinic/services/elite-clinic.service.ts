import { supabase } from '#/utils/supabase'
import type { EliteClinicData } from '../types'

const TABLE = 'elite_clinic_config'
const ROW_ID = 1

const FALLBACK: EliteClinicData = {
  title: 'Elite Clinic 2026',
  subtitle: 'Take your skills to the next level',
  description:
    'Join us for an exciting clinic led by top-level coaches. The first 10 people to register will receive 12% off. After that, get 10% off if you sign up before June 1st.',
  dates: 'July 27th – 30th, 2026',
  time: '8:00 AM – 1:30 PM',
  minimumLevel: 'Level Testing 3',
  location: {
    venue: 'Newport Hills Swim and Tennis Club',
    city: 'Seattle, Washington',
    poolAddress: '5464 119th Ave SE, Bellevue, WA 98006',
    crossfitAddress: 'Grey Coast Crossfit · 5620 119th Ave SE B, Bellevue',
  },
  manager: {
    name: 'Daniela Garmendia',
    role: 'Head Coach Seattle Synchro',
    email: 'info@seattlesynchro.com',
  },
  pricing: {
    basePrice: '$TBD',
    earlyBird: 'First 10 to register get 12% off',
    standardDiscount: '10% off if you sign up before June 1st',
  },
  coaches: [
    { name: 'Tammy Mcgregor', role: 'Head Coach' },
    { name: 'Paula Klamburg', role: 'Head Coach' },
    { name: 'Patricia Camaran', role: 'Assistant Coach' },
    { name: 'Maria Romero', role: 'Assistant Coach' },
  ],
  schedule: [
    { time: '8:00 – 9:00 AM', activity: 'Land' },
    { time: '9:00 – 11:00 AM', activity: 'Water' },
    { time: '11:00 – 11:30 AM', activity: 'Break' },
    { time: '11:30 AM – 1:30 PM', activity: 'Special Activities at Grey Coast CrossFit' },
  ],
  objectives: [
    'Refine basic technique',
    'Review difficulty skills',
    'Elevate your execution',
  ],
  packingList: [
    'Water Bottle',
    'Tennis Shoes',
    'Yoga Mat',
    'Ankle Weights',
    'Elastic Bands',
    'Yoga Blocks',
  ],
  registerUrl: 'https://www.seattlesynchrosst.com/page/system/classreg-shopping',
}

const sb = supabase as unknown as {
  from: (t: string) => {
    select: (cols: string) => {
      eq: (k: string, v: unknown) => {
        maybeSingle: () => Promise<{
          data: { content: EliteClinicData } | null
          error: unknown
        }>
      }
    }
  }
}

export async function getEliteClinicData(): Promise<EliteClinicData> {
  const { data, error } = await sb
    .from(TABLE)
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle()

  if (error || !data?.content) return FALLBACK
  return data.content
}
