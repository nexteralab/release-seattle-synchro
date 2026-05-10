export interface FreeTryLocation {
  name: string
  address: string
  image?: string
}

export interface FreeTryData {
  date: string
  time: string
  ages: string
  location: FreeTryLocation
}
