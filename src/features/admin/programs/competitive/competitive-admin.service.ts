import { setConfig } from '#/features/programs/config.service'
import { getCompetitiveData } from '#/features/programs/competitive/services/competitive.service'
import type { CompetitiveData } from '#/features/programs/competitive/types'

// Re-export el tipo público como SSOT
export type { CompetitiveData } from '#/features/programs/competitive/types'

// Los defaults viven en el servicio público: una sola copia para la página y
// para el formulario, así no pueden divergir.
export { COMPETITIVE_DEFAULTS as DEFAULT_CONTENT } from '#/features/programs/competitive/services/competitive.service'

export async function getCompetitiveConfig(): Promise<CompetitiveData> {
  // Reutiliza el mismo relleno de defaults (y la migración de la forma vieja).
  return getCompetitiveData()
}

export async function saveCompetitiveConfig(content: CompetitiveData): Promise<void> {
  // Sobrescribe la fila completa: la forma vieja (`age_groups`) desaparece aquí.
  await setConfig('competitive', { content })
}
