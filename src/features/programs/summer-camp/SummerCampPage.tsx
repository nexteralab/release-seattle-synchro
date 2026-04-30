import type { SummerCampData } from './types'
import { SummerCampHero } from './components/SummerCampHero'
import { SummerCampOverview } from './components/SummerCampOverview'
import { SummerCampRequirements } from './components/SummerCampRequirements'
import { CtaBanner } from '#/components/CtaBanner'

interface Props {
  data: SummerCampData
}

export function SummerCampPage({ data }: Props) {
  return (
    <div className="w-full">
      <SummerCampHero />
      <SummerCampOverview details={data.details} />
      <SummerCampRequirements requirements={data.requirements} />
      <CtaBanner
        heading="Ready to Dive In?"
        description="Spots fill up quickly! Register now to secure your place in our 2026 Summer Camp program."
        linkTo="/contact-us"
        linkLabel="Contact Us"
        linkVariant="secondary"
        linkToRegister="https://www.seattlesynchro.com/page/system/classreg-shopping"
        linkLabelRegister="Register Now"
        image="1"
        alt="Ready to Dive In? Summer Camp 2026 banner"
      />
    </div>
  )
}
