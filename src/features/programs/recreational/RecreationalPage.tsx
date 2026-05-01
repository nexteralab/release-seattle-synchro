import { RecreationalHero } from './components/RecreationalHero'
import { RecreationalOverview } from './components/RecreationalOverview'
import { RecreationalSharksMermaids, RecreationalSeaStars } from './components/RecreationalSeaStar'
import { RecreationalDolphins } from './components/RecreationalDolphins'
import { CtaBanner } from '#/components/CtaBanner'

export function RecreationalPage() {
  return (
    <div className="w-full">
      <RecreationalHero />
      <RecreationalOverview />
      <RecreationalSeaStars />
      <RecreationalSharksMermaids />
      <RecreationalDolphins />
      <CtaBanner
        heading="Ready to Join?"
        description="Sign up for one of our recreational programs and discover the joy of artistic swimming."
        linkTo="/contact-us"
        linkLabel="Contact Us"
        image="3"
        alt="Ready to Join? Recreational programs banner"
      />
    </div>
  )
}
