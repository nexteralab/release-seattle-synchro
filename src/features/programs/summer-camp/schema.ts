import { z } from 'zod'

export const campLocationSchema = z.object({
  name: z.string(),
  dates: z.string(),
  address: z.string(),
})

export const campPricingSchema = z.object({
  perWeek: z.string(),
  note: z.string().optional(),
})

export const campDetailsSchema = z.object({
  ages: z.string(),
  skillLevel: z.string(),
  schedule: z.string(),
  locations: z.array(campLocationSchema),
  pricing: campPricingSchema,
})

export const campRequirementSchema = z.object({
  name: z.string(),
  note: z.string().optional(),
  link: z.string().url().optional(),
})

export const summerCampDataSchema = z.object({
  details: campDetailsSchema,
  requirements: z.array(campRequirementSchema),
})
