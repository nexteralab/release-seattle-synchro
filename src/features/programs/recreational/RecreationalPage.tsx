import { RecreationalHero } from './components/RecreationalHero'
import { RecreationalOverview } from './components/RecreationalOverview'
import { RecreationalSharksMermaids } from './components/RecreationalSeaStar'
import { RecreationalClassLook } from './components/RecreationalClassLook'
import { RecreationalWhoFor } from './components/RecreationalWhoFor'
import { RecreationalGymnasticsFit } from './components/RecreationalGymnasticsFit'
import { RecreationalComparisonTable } from './components/RecreationalComparisonTable'
import { RecreationalSummerCampFit } from './components/RecreationalSummerCampFit'
import { RecreationalFaq } from './components/RecreationalFaq'
import { CtaBanner } from '#/components/CtaBanner'
import { Reviews } from '#/components/Reviews'
import type { RecreationalData } from './types'

interface Props {
  data: RecreationalData
  /** El preview del admin no carga Reviews (no es editable aquí). */
  showReviews?: boolean
}

export function RecreationalPage({ data, showReviews = true }: Props) {
  return (
    <div className="w-full">
      <RecreationalHero hero={data.hero} />
      <RecreationalOverview overview={data.overview} ages={data.program.ages} />
      <RecreationalSharksMermaids program={data.program} />
      <RecreationalClassLook section={data.classLook} />
      <RecreationalWhoFor section={data.whoFor} />
      <RecreationalGymnasticsFit section={data.gymnasticsFit} />
      <RecreationalComparisonTable section={data.comparison} />
      <RecreationalSummerCampFit section={data.summerCampFit} />
      <RecreationalFaq section={data.faq} />
      {showReviews && <Reviews bg="white" />}
      <CtaBanner
        heading={data.banner.heading}
        description={data.banner.description}
        linkToContact="/contact-us"
        linkLabelContact={data.banner.contactLabel}
        linkVariantContact="secondary"
        image={data.banner.image}
        alt={`${data.banner.heading} Recreational programs banner`}
      />
    </div>
  )
}
