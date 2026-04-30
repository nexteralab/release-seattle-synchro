import { RecreationalHero } from './components/RecreationalHero'
import { RecreationalOverview } from './components/RecreationalOverview'
import { RecreationalSeaStar } from './components/RecreationalSeaStar'
import { RecreationalDolphins } from './components/RecreationalDolphins'
import { RecreationalCTA } from './components/RecreationalCTA'

export function RecreationalPage() {
  return (
    <div className="w-full">
      <RecreationalHero />
      <RecreationalOverview />
      <RecreationalSeaStar />
      <RecreationalDolphins />
      <RecreationalCTA />
    </div>
  )
}
