import { setConfig } from '#/features/programs/config.service'
import { getEliteClinicData } from '#/features/programs/elite-clinic/services/elite-clinic.service'
import type { EliteClinicData } from '#/features/programs/elite-clinic/types'

// Re-export el tipo público como SSOT
export type { EliteClinicData } from '#/features/programs/elite-clinic/types'

// Los defaults viven en el servicio público: una sola copia para la página y
// para el formulario, así no pueden divergir.
export { ELITE_CLINIC_DEFAULTS as DEFAULT_CONTENT } from '#/features/programs/elite-clinic/services/elite-clinic.service'

export async function getEliteClinicConfig(): Promise<EliteClinicData> {
  // Reutiliza el mismo relleno de defaults que la página pública.
  return getEliteClinicData()
}

export async function saveEliteClinicConfig(content: EliteClinicData): Promise<void> {
  await setConfig('elite-clinic', { content })
}
