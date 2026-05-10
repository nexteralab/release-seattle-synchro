import { z } from 'zod'
import type { AgeGroupId } from '#/features/programs/competitive/types'
import { DEFAULT_CONFIG } from './competitive-admin.service'

export const ageGroupSchema = z.object({
  id: z.enum(['12u', '13-15', 'junior']),
  name: z.string().min(1),
  coaches: z.string().min(1, 'Required'),
  workout_days: z.string().min(1, 'Required'),
})

// Form usa array (matches the data shape) → paths `age_groups.0.coaches`, etc.
export const competitiveFormSchema = z.object({
  age_groups: z.array(ageGroupSchema),
})

export type CompetitiveFormValues = z.infer<typeof competitiveFormSchema>

// ── Mapeo id ↔ índice (orden fijo) ──────────────────────────
export const TABS: { id: AgeGroupId; label: string }[] = [
  { id: '12u', label: '12 & Under' },
  { id: '13-15', label: '13–15' },
  { id: 'junior', label: 'Junior' },
]

export const TAB_INDEX: Record<AgeGroupId, number> = {
  '12u': 0,
  '13-15': 1,
  junior: 2,
}

export const FORM_DEFAULTS: CompetitiveFormValues = {
  age_groups: DEFAULT_CONFIG.age_groups,
}
