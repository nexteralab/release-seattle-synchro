import { RecreationalHero } from './components/RecreationalHero'
import { RecreationalOverview } from './components/RecreationalOverview'
import { RecreationalSharksMermaids, RecreationalSeaStars } from './components/RecreationalSeaStar'
import { RecreationalDolphins } from './components/RecreationalDolphins'
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
  const seaStars = byId.get('sea-stars') ?? FALLBACK_PROGRAM('sea-stars', 'Sea Stars')
  const sharksMermaids =
    byId.get('sharks-mermaids') ?? FALLBACK_PROGRAM('sharks-mermaids', 'Sharks & Mermaids')
  const dolphins = byId.get('dolphins') ?? FALLBACK_PROGRAM('dolphins', 'Dolphins')

  return (
    <div className="w-full">
      <RecreationalHero />
      <RecreationalOverview />
      <RecreationalSeaStars program={seaStars} />
      <RecreationalSharksMermaids program={sharksMermaids} />
      <RecreationalDolphins program={dolphins} />
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
