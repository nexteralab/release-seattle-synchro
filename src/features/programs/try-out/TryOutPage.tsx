import type { TryOutData } from './types'
import { TryOutHero } from './components/TryOutHero'
import { TryOutSteps } from './components/TryOutSteps'
import { TryOutRequirements } from './components/TryOutRequirements'
import { TryOutGear } from './components/TryOutGear'
import { TryOutAlternatives } from './components/TryOutAlternatives'
import { TryOutReviews } from './components/TryOutReviews'
import { TryOutFaq } from './components/TryOutFaq'
import { CtaBanner } from '#/components/CtaBanner'
import { ProgramCompare } from '#/components/ProgramCompare'

interface Props {
  data: TryOutData
}

export function TryOutPage({ data }: Props) {
  return (
    <div className="w-full">
      <TryOutHero data={data} />
      <TryOutSteps />
      <ProgramCompare active="try-out" />
      <TryOutRequirements />
      <TryOutGear />
      <TryOutAlternatives />
      <TryOutReviews />
      <TryOutFaq />
      <CtaBanner
        heading="Ready to Try Out?"
        description="Free to attend, results the same day. Register for the next tryout at Triangle Pool in Bellevue, WA."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        linkToRegister="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
        linkLabelRegister="See Tryout Dates"
        image="4"
        alt="Ready to try out? Seattle Synchro Novice team banner"
      />
    </div>
  )
}
