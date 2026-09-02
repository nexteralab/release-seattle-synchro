import { getConfig, setConfig } from '#/features/programs/config.service'
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

/** Lee el `content` completo y devuelve solo la parte editable. */

/** Lee el `content` completo y devuelve solo la parte editable. */
export async function getEliteClinicConfig(): Promise<EliteClinicEditableContent> {
  const stored = await getConfig<{ content?: EliteClinicData }>('elite-clinic')
  const c = stored?.content
  if (!c) return DEFAULT_EDITABLE
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
  const content: EliteClinicData = { ...editable, ...HARDCODED_DEFAULTS }
  await setConfig('elite-clinic', { content })
}
