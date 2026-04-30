import { z } from 'zod'

export const ageGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  coaches: z.string(),
  workoutDays: z.string(),
  highlights: z.array(z.object({ text: z.string() })).optional(),
})

export const competitiveDataSchema = z.object({
  overview: z.object({
    paragraphs: z.array(z.string()),
  }),
  ageGroups: z.array(ageGroupSchema),
  commitmentNote: z.string(),
})
