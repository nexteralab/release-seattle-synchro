import type { FreeTryData } from './types'
import { FreeTryHero } from './components/FreeTryHero'
import { FreeTryOverview } from './components/FreeTryOverview'
import { FreeTrySafety } from './components/FreeTrySafety'
import { FreeTryRequirements } from './components/FreeTryRequirements'
import { FreeTryFaq } from './components/FreeTryFaq'
import { CtaBanner } from '#/components/CtaBanner'
import { ProgramCompare } from '#/components/ProgramCompare'

interface Props {
  data: FreeTryData
}

export function FreeTryPage({ data }: Props) {
  return (
    <div className="w-full">
      <FreeTryHero hero={data.hero} />
      <FreeTryOverview data={data} />
      <FreeTrySafety safety={data.safety} />
      <FreeTryRequirements />
      <ProgramCompare active="free-try" />
      <FreeTryFaq faqs={data.faq} />
      <CtaBanner
        heading={data.banner.heading}
        description={data.banner.description}
        linkToContact="/contact-us"
        linkLabelContact={data.banner.contactLabel}
        linkVariantContact="secondary"
        linkToRegister={data.banner.registerUrl}
        linkLabelRegister={data.banner.registerLabel}
        image={data.banner.image}
        alt={data.banner.heading}
      />
    </div>
  )
}
