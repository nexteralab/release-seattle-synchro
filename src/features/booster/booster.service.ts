import { getConfig, setConfig } from '#/features/programs/config.service'

// Documentos públicos del Booster Club (501c3). Se editan en /app/booster.
export const BOOSTER_CATEGORIES = [
  { key: 'bylaws', label: 'Bylaws' },
  { key: 'board-members', label: 'Board Members' },
  { key: 'board-positions', label: 'Board Positions' },
  { key: 'minutes', label: 'Meeting Minutes and Financial Updates' },
  { key: 'documents', label: 'Documents' },
  { key: 'volunteer', label: 'Volunteer Opportunities' },
] as const

export type BoosterCategory = (typeof BOOSTER_CATEGORIES)[number]['key']

/** `url` = PDF subido a R2 o link externo. */
export interface BoosterDoc {
  title: string
  url: string
}

export type BoosterDocs = Partial<Record<BoosterCategory, BoosterDoc[]>>

export async function getBoosterDocs(): Promise<BoosterDocs> {
  const value = await getConfig<{ documents?: BoosterDocs }>('booster')
  return value?.documents ?? {}
}

export const saveBoosterDocs = (documents: BoosterDocs) => setConfig('booster', { documents })
