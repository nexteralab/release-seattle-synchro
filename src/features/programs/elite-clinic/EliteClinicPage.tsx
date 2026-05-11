import { CtaBanner } from '#/components/CtaBanner'
import { EliteClinicHero } from './components/EliteClinicHero'
import { EliteClinicOverview } from './components/EliteClinicOverview'
import { EliteClinicCoaches } from './components/EliteClinicCoaches'
import { EliteClinicDetails } from './components/EliteClinicDetails'
import type { EliteClinicData } from './types'

interface Props {
  data: EliteClinicData
}

export function EliteClinicPage({ data }: Props) {
  return (
    <div className="w-full">
      <EliteClinicHero data={data} />
      <EliteClinicOverview data={data} />
      <EliteClinicDetails data={data} />
      <EliteClinicCoaches data={data} />
      <CtaBanner
        heading="Limited Spots Available"
        description="Don't miss your chance to train with top-level coaches. Register now or contact us with any questions."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        linkToRegister={data.registerUrl}
        linkLabelRegister="Register Now"
        image="2"
        alt="Elite Clinic 2026 — register now"
      />
    </div>
  )
}
