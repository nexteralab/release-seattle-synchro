import { setConfig } from '#/features/programs/config.service'
import { getSummerCampContent } from '#/features/programs/summer-camp/services/summer-camp.service'
import type { SummerCampContent } from '#/features/programs/summer-camp/types'

// Re-export el tipo público como SSOT
export type { SummerCampContent } from '#/features/programs/summer-camp/types'

// Los defaults viven en el servicio público: una sola copia para la página y
// para el formulario, así no pueden divergir.
export { SUMMER_CAMP_DEFAULTS as DEFAULT_CONTENT } from '#/features/programs/summer-camp/services/summer-camp.service'

export async function getSummerCampConfig(): Promise<SummerCampContent> {
  // Reutiliza el mismo relleno de defaults que la página pública.
  return getSummerCampContent()
}

export async function saveSummerCampConfig(content: SummerCampContent): Promise<void> {
  await setConfig('summer-camp', { content })
}
