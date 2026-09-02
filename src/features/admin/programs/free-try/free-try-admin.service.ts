import { setConfig } from '#/features/programs/config.service'
import { getFreeTryData } from '#/features/programs/free-try/services/free-try.service'
import type { FreeTryData } from '#/features/programs/free-try/types'

// Re-export el tipo público como SSOT
export type { FreeTryData, FreeTryLocation } from '#/features/programs/free-try'

// Los defaults viven en el servicio público: una sola copia para la página y
// para el formulario, así no pueden divergir.
export { FREE_TRY_DEFAULTS as DEFAULT_CONTENT } from '#/features/programs/free-try/services/free-try.service'

export async function getFreeTryConfig(): Promise<FreeTryData> {
  // Reutiliza el mismo relleno de defaults que la página pública.
  return getFreeTryData()
}

export async function saveFreeTryConfig(content: FreeTryData): Promise<void> {
  await setConfig('free-try', { content })
}
