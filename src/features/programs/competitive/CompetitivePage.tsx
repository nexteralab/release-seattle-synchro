import { CompetitiveHero } from './components/CompetitiveHero'
import { CompetitiveOverview } from './components/CompetitiveOverview'
import { Competitive12Under } from './components/Competitive12Under'
import { Competitive1315 } from './components/Competitive1315'
import { CompetitiveJunior } from './components/CompetitiveJunior'
import { CompetitiveSenior } from './components/CompetitiveSenior'
import { CtaBanner } from '#/components/CtaBanner'
import type { CompetitiveData } from './types'

interface Props {
  data: CompetitiveData
}

export function CompetitivePage({ data }: Props) {
  return (
    <div className="w-full">
      <CompetitiveHero hero={data.hero} />
      <CompetitiveOverview overview={data.overview} />
      <Competitive12Under group={data.under12} />
      <Competitive1315 group={data.teen} />
      <CompetitiveJunior group={data.junior} />
      <CompetitiveSenior senior={data.senior} />
      <CtaBanner
        heading={data.banner.heading}
        description={data.banner.description}
        linkToContact="/contact-us"
        linkLabelContact={data.banner.contactLabel}
        linkVariantContact="secondary"
        image={data.banner.image}
        alt={`${data.banner.heading} Competitive programs banner`}
      />
    </div>
  )
}
