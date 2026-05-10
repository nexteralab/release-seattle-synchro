import { Competitive12Under } from '#/features/programs/competitive/components/Competitive12Under'
import { Competitive1315 } from '#/features/programs/competitive/components/Competitive1315'
import { CompetitiveJunior } from '#/features/programs/competitive/components/CompetitiveJunior'
import type { AgeGroup, AgeGroupId } from '#/features/programs/competitive/types'

interface Props {
  activeTab: AgeGroupId
  groups: AgeGroup[]
}

export function CompetitivePreview({ activeTab, groups }: Props) {
  const byId = new Map(groups.map(g => [g.id, g]))
  const active = byId.get(activeTab)

  return (
    <div className="hidden lg:flex max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          {active?.name ?? activeTab}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div style={{ zoom: '0.42' }}>
          {activeTab === '12u' && (
            <Competitive12Under
              coaches={active?.coaches ?? ''}
              workoutDays={active?.workout_days ?? ''}
            />
          )}
          {activeTab === '13-15' && (
            <Competitive1315
              coaches={active?.coaches ?? ''}
              workoutDays={active?.workout_days ?? ''}
            />
          )}
          {activeTab === 'junior' && (
            <CompetitiveJunior
              coaches={active?.coaches ?? ''}
              workoutDays={active?.workout_days ?? ''}
            />
          )}
        </div>
      </div>
    </div>
  )
}
