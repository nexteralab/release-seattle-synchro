import { CompetitiveHero } from './components/CompetitiveHero'
import { CompetitiveOverview } from './components/CompetitiveOverview'
import { Competitive12Under } from './components/Competitive12Under'
import { Competitive1315 } from './components/Competitive1315'
import { CompetitiveJunior } from './components/CompetitiveJunior'
import { CompetitiveSenior } from './components/CompetitiveSenior'
import { CtaBanner } from '#/components/CtaBanner'

export function CompetitivePage() {
  return (
    <div className="w-full">
      <CompetitiveHero />
      <CompetitiveOverview />
      <Competitive12Under />
      <Competitive1315 />
      <CompetitiveJunior />
      <CompetitiveSenior />
      <CtaBanner
        heading="Ready to Join?"
        description="Sign up for one of our competitive programs and discover the joy of artistic swimming."
        linkTo="/contact-us"
        linkLabel="Contact Us"
        image="1"
        alt="Ready to Join? Competitive programs banner"
      />
    </div>
  )
}
