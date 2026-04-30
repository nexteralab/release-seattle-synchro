export interface FreeTryLocation {
  name: string
  address: string
  image?: string
}

export interface FreeTryRequirement {
  name: string
  note?: string
  link?: string
}

export interface FreeTryData {
  date: string
  time: string
  ages: string
  safetyNote: string
  location: FreeTryLocation
  requirements: FreeTryRequirement[]
}
