export interface EliteClinicLocation {
  venue: string
  city: string
  poolAddress: string
  crossfitAddress: string
}

export interface EliteClinicManager {
  name: string
  role: string
  email: string
}

export interface EliteClinicPricing {
  basePrice: string
  /** Badge de la fila Early Bird: un precio ("$325") o un descuento ("12% OFF"). */
  earlyBirdPrice: string
  earlyBird: string
  /** Segunda fila; si el título queda vacío no se muestra. */
  standardTitle: string
  standardPrice: string
  standardDiscount: string
}

export interface EliteClinicCoach {
  name: string
  role: string
}

export interface EliteClinicScheduleItem {
  time: string
  activity: string
}

export interface EliteClinicData {
  title: string
  subtitle: string
  description: string
  dates: string
  time: string
  minimumLevel: string
  location: EliteClinicLocation
  manager: EliteClinicManager
  pricing: EliteClinicPricing
  coaches: EliteClinicCoach[]
  schedule: EliteClinicScheduleItem[]
  objectives: string[]
  packingList: string[]
  registerUrl: string
}
