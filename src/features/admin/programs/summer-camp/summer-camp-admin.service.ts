import { getConfig, setConfig } from '#/features/programs/config.service'
import type { SummerCampContent } from '#/features/programs/summer-camp'

export type {
  SummerCampContent,
  CampSession,
  CampDetails,
} from '#/features/programs/summer-camp'

export const DEFAULT_CONTENT: SummerCampContent = {
  details: { ages: '', skill_level: '', schedule: '' },
  sessions: [],
  price_per_week: '',
}

// `summer_camp` aún no está en database.types.ts (regenerar con
// Casteamos a any igual que el patrón de news.service.ts.

export async function getSummerCampContent(): Promise<SummerCampContent> {
  const stored = await getConfig<{ content?: SummerCampContent }>('summer-camp')
  return stored?.content ?? DEFAULT_CONTENT
}

export async function saveSummerCampContent(content: SummerCampContent): Promise<void> {
  await setConfig('summer-camp', { content })
}
