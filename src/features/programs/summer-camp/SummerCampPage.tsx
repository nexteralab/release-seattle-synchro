import type { SummerCampContent } from './types'
import { SummerCampHero } from './components/SummerCampHero'
import { SummerCampDates } from './components/SummerCampDates'
import { SummerCampOverview } from './components/SummerCampOverview'
import { SummerCampRequirements } from './components/SummerCampRequirements'
import { LocationsSection } from './locations/LocationsSection'
import { CtaBanner } from '#/components/CtaBanner'

interface Props {
  content: SummerCampContent
}

export function SummerCampPage({ content }: Props) {
  return (
    <div className="w-full">
      <SummerCampHero />
      <SummerCampOverview
        details={content.details}
        sessions={content.sessions}
      />
      <SummerCampDates
        sessions={content.sessions}
        schedule={content.details.schedule}
        pricePerWeek={content.price_per_week}
      />
      <SummerCampRequirements />
      <LocationsSection />
      <CtaBanner
        heading="Ready to Dive In?"
        description="Spots fill up quickly! Register now to secure your place in our 2026 Summer Camp program."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        linkToRegister="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
        linkLabelRegister="Register Now"
        image="1"
        alt="Ready to Dive In? Summer Camp 2026 banner"
      />
    </div>
  )
}
