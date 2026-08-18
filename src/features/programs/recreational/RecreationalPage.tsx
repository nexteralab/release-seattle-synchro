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
import type { RecreationalConfig } from './services/recreational.service'
import type { RecreationalSubProgram, RecreationalSubProgramId } from './types'

interface Props {
  config: RecreationalConfig
}

const FALLBACK_PROGRAM = (
  id: RecreationalSubProgramId,
  name: string,
): RecreationalSubProgram => ({
  id,
  name,
  ages: '',
  coach: '',
  workout_days_times: '',
  schedule_note: '',
  duration: '',
  cost: '',
  cost_note: '',
})

export function RecreationalPage({ config }: Props) {
  const byId = new Map(config.sub_programs.map(p => [p.id, p]))
  const sharksMermaids =
    byId.get('sharks-mermaids') ?? FALLBACK_PROGRAM('sharks-mermaids', 'Sharks & Mermaids')

  return (
    <div className="w-full">
      <RecreationalHero />
      <RecreationalOverview program={sharksMermaids} />
      <RecreationalSharksMermaids program={sharksMermaids} />
      <RecreationalClassLook />
      <RecreationalWhoFor />
      <RecreationalGymnasticsFit />
      <RecreationalComparisonTable />
      <RecreationalSummerCampFit />
      <RecreationalFaq />
      <CtaBanner
        heading="Ready to Join?"
        description="Sign up for one of our recreational programs and discover the joy of artistic swimming."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        image="3"
        alt="Ready to Join? Recreational programs banner"
      />
    </div>
  )
}
