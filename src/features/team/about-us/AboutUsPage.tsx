import { AboutUsHero } from './components/AboutUsHero'
import { AboutUsIntro } from './components/AboutUsIntro'
import { AboutUsMission } from './components/AboutUsMission'
import { AboutUsVision } from './components/AboutUsVision'
import { AboutUsValues } from './components/AboutUsValues'
import { AboutUsWhatWeDo } from './components/AboutUsWhatWeDo'
import { CtaBanner } from '#/components/CtaBanner'

export function AboutUsPage() {
  return (
    <div className="w-full">
      <AboutUsHero />
      <AboutUsIntro />
      <AboutUsMission />
      <AboutUsVision />
      <AboutUsValues />
      <AboutUsWhatWeDo />
      <CtaBanner
        heading="Do you want to learn more about us?"
        description="Join the next generation of champions. Our proven coaching and training programs have developed countless medal-winning athletes."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="primary"
        image="1"
        alt="Join Seattle Synchro team banner"
      />
    </div>
  )
}
