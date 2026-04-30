import { CompetitiveHero } from './components/CompetitiveHero'
import { CompetitiveOverview } from './components/CompetitiveOverview'
import { Competitive12Under } from './components/Competitive12Under'
import { Competitive1315 } from './components/Competitive1315'
import { CompetitiveJunior } from './components/CompetitiveJunior'
import { CompetitiveSenior } from './components/CompetitiveSenior'
import { ReadyToJoin } from './components/ReadyToJoin'

export function CompetitivePage() {
  return (
    <div className="w-full">
      <CompetitiveHero />
      <CompetitiveOverview />
      <Competitive12Under />
      <Competitive1315 />
      <CompetitiveJunior />
      <CompetitiveSenior />
      <ReadyToJoin />
    </div>
  )
}
