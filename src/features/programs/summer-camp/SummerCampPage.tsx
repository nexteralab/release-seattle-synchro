import type { SummerCampData } from './types'
import { SummerCampHero } from './components/SummerCampHero'
import { SummerCampOverview } from './components/SummerCampOverview'
import { SummerCampRequirements } from './components/SummerCampRequirements'
import { SummerCampCTA } from './components/SummerCampCTA'

interface Props {
  data: SummerCampData
}

export function SummerCampPage({ data }: Props) {
  return (
    <div className="w-full">
      <SummerCampHero />
      <SummerCampOverview details={data.details} />
      <SummerCampRequirements requirements={data.requirements} />
      <SummerCampCTA />
    </div>
  )
}
