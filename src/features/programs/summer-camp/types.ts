export interface CampLocation {
  name: string
  dates: string
  address: string
}

export interface CampPricing {
  perWeek: string
  note?: string
}

export interface CampDetails {
  ages: string
  skillLevel: string
  schedule: string
  locations: CampLocation[]
  pricing: CampPricing
}

export interface CampRequirement {
  name: string
  note?: string
  link?: string
}

export interface SummerCampData {
  details: CampDetails
  requirements: CampRequirement[]
}
