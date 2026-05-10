import { CompetitiveHero } from './components/CompetitiveHero'
import { CompetitiveOverview } from './components/CompetitiveOverview'
import { Competitive12Under } from './components/Competitive12Under'
import { Competitive1315 } from './components/Competitive1315'
import { CompetitiveJunior } from './components/CompetitiveJunior'
import { CompetitiveSenior } from './components/CompetitiveSenior'
import { CtaBanner } from '#/components/CtaBanner'
import type { AgeGroup, AgeGroupId, CompetitiveConfig } from './types'

interface Props {
  config: CompetitiveConfig
}

const FALLBACK_GROUP = (id: AgeGroupId, name: string): AgeGroup => ({
  id,
  name,
  coaches: '',
  workout_days: '',
})

export function CompetitivePage({ config }: Props) {
  const byId = new Map(config.age_groups.map(g => [g.id, g]))
  const g12u = byId.get('12u') ?? FALLBACK_GROUP('12u', '12 & Under Age Group')
  const g1315 = byId.get('13-15') ?? FALLBACK_GROUP('13-15', '13–15 Age Group')
  const gJunior = byId.get('junior') ?? FALLBACK_GROUP('junior', 'Junior / 16–19 Age Group')

  return (
    <div className="w-full">
      <CompetitiveHero />
      <CompetitiveOverview />
      <Competitive12Under coaches={g12u.coaches} workoutDays={g12u.workout_days} />
      <Competitive1315 coaches={g1315.coaches} workoutDays={g1315.workout_days} />
      <CompetitiveJunior coaches={gJunior.coaches} workoutDays={gJunior.workout_days} />
      <CompetitiveSenior />
      <CtaBanner
        heading="Ready to Join?"
        description="Sign up for one of our competitive programs and discover the joy of artistic swimming."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        image="1"
        alt="Ready to Join? Competitive programs banner"
      />
    </div>
  )
}
