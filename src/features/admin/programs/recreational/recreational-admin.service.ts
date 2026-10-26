import { setConfig } from '#/features/programs/config.service'
import { getRecreationalData } from '#/features/programs/recreational/services/recreational.service'
import type { RecreationalData } from '#/features/programs/recreational/types'

// Re-export el tipo público como SSOT
export type { RecreationalData } from '#/features/programs/recreational/types'

// Los defaults viven en el servicio público: una sola copia para la página y
// para el formulario, así no pueden divergir.
export { RECREATIONAL_DEFAULTS as DEFAULT_CONTENT } from '#/features/programs/recreational/services/recreational.service'

export async function getRecreationalConfig(): Promise<RecreationalData> {
  // Reutiliza el mismo relleno de defaults (y la migración del shape viejo).
  return getRecreationalData()
}

export async function saveRecreationalConfig(content: RecreationalData): Promise<void> {
  // Guarda solo `content`: el `sub_programs` viejo deja de existir al primer guardado.
  await setConfig('recreational', { content })
}
