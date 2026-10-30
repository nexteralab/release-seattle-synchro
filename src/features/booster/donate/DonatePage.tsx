import { CtaBanner } from '#/components/CtaBanner'
import { DonateHero } from './components/DonateHero'
import { DonateSupportTeam } from './components/DonateSupportTeam'
import { DonateBouster } from './components/DonateBouster'
import type { BoosterDocs } from '../booster.service'

export function DonatePage({ documents }: { documents: BoosterDocs }) {
  return (
    <div className="w-full">
      <DonateHero />
      <DonateSupportTeam />
      <DonateBouster documents={documents} />
      <CtaBanner
        heading="Every donation makes a difference"
        description="Help us keep artistic swimming thriving in the Pacific Northwest. Your support funds scholarships, equipment, and travel for our athletes."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="primary"
        image="2"
        alt="Support Seattle Synchro Booster Club"
      />
    </div>
  )
}
