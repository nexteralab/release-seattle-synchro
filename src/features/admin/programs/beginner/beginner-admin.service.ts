import { setConfig } from '#/features/programs/config.service'
import { getBeginnerData } from '#/features/programs/beginner/services/beginner.service'
import type { BeginnerData } from '#/features/programs/beginner/types'

// Re-export el tipo público como SSOT
export type { BeginnerData } from '#/features/programs/beginner/types'

// Los defaults viven en el servicio público: una sola copia para la página y
// para el formulario, así no pueden divergir.
export { BEGINNER_DEFAULTS as DEFAULT_CONTENT } from '#/features/programs/beginner/services/beginner.service'

export async function getBeginnerConfig(): Promise<BeginnerData> {
  // Reutiliza el mismo relleno de defaults (y migración) que la página pública.
  return getBeginnerData()
}

export async function saveBeginnerConfig(content: BeginnerData): Promise<void> {
  // Se guarda solo `content`: la forma vieja `{ sub_programs }` queda reemplazada.
  await setConfig('beginner', { content })
}
