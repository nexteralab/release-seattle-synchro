import type { FreeTryData } from './types'
import { FreeTryHero } from './components/FreeTryHero'
import { FreeTryOverview } from './components/FreeTryOverview'
import { FreeTryRequirements } from './components/FreeTryRequirements'
import { FreeTryCTA } from './components/FreeTryCTA'

interface Props {
  data: FreeTryData
}

export function FreeTryPage({ data }: Props) {
  return (
    <div className="w-full">
      <FreeTryHero />
      <FreeTryOverview data={data} />
      <FreeTryRequirements requirements={data.requirements} />
      <FreeTryCTA />
    </div>
  )
}
