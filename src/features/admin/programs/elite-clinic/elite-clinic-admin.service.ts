import { supabase } from '#/utils/supabase'
import type {
  EliteClinicData,
  EliteClinicManager,
  EliteClinicPricing,
  EliteClinicCoach,
} from '#/features/programs/elite-clinic/types'

// Re-export public types como SSOT
export type {
  EliteClinicData,
  EliteClinicManager,
  EliteClinicPricing,
  EliteClinicCoach,
} from '#/features/programs/elite-clinic/types'

// ── Subset editable ─────────────────────────────────────────
export interface EliteClinicEditableContent {
  title: string
  description: string
  dates: string
  time: string
  minimumLevel: string
  manager: EliteClinicManager
  pricing: EliteClinicPricing
  coaches: EliteClinicCoach[]
  registerUrl: string
}

// ── Hardcoded (no editable) — se mergea al guardar ──────────
export const HARDCODED_DEFAULTS = {
  subtitle: 'Take your skills to the next level',
  location: {
    venue: 'Newport Hills Swim and Tennis Club',
    city: 'Seattle, Washington',
    poolAddress: '5464 119th Ave SE, Bellevue, WA 98006',
    crossfitAddress: 'Grey Coast Crossfit · 5620 119th Ave SE B, Bellevue',
  },
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
}

// ── Defaults para el form ───────────────────────────────────
export const DEFAULT_EDITABLE: EliteClinicEditableContent = {
  title: 'Elite Clinic 2026',
  description:
    'Join us for an exciting clinic led by top-level coaches. The first 10 people to register will receive 12% off. After that, get 10% off if you sign up before June 1st.',
  dates: 'July 27th – 30th, 2026',
  time: '8:00 AM – 1:30 PM',
  minimumLevel: 'Level Testing 3',
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
  registerUrl: 'https://www.seattlesynchrosst.com/page/system/classreg-shopping',
}

const TABLE = 'elite_clinic_config'
const ROW_ID = 1

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
    upsert: (row: { id: number; content: EliteClinicData }) => Promise<{ error: unknown }>
  }
}

/** Lee el `content` completo y devuelve solo la parte editable. */
export async function getEliteClinicConfig(): Promise<EliteClinicEditableContent> {
  const { data, error } = await sb
    .from(TABLE)
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle()
  if (error) throw error
  if (!data?.content) return DEFAULT_EDITABLE

  // Extract only editable fields del content full
  const c = data.content
  return {
    title: c.title ?? DEFAULT_EDITABLE.title,
    description: c.description ?? DEFAULT_EDITABLE.description,
    dates: c.dates ?? DEFAULT_EDITABLE.dates,
    time: c.time ?? DEFAULT_EDITABLE.time,
    minimumLevel: c.minimumLevel ?? DEFAULT_EDITABLE.minimumLevel,
    manager: c.manager ?? DEFAULT_EDITABLE.manager,
    pricing: c.pricing ?? DEFAULT_EDITABLE.pricing,
    coaches: c.coaches ?? DEFAULT_EDITABLE.coaches,
    registerUrl: c.registerUrl ?? DEFAULT_EDITABLE.registerUrl,
  }
}

/** Guarda el editable y mergea con los hardcoded para preservar shape público. */
export async function saveEliteClinicConfig(
  editable: EliteClinicEditableContent,
): Promise<void> {
  const fullPayload: EliteClinicData = {
    ...editable,
    ...HARDCODED_DEFAULTS,
  }
  const { error } = await sb.from(TABLE).upsert({ id: ROW_ID, content: fullPayload })
  if (error) throw error
}
