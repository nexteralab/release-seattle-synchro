import { EliteClinicHero } from '#/features/programs/elite-clinic/components/EliteClinicHero'
import { EliteClinicOverview } from '#/features/programs/elite-clinic/components/EliteClinicOverview'
import { EliteClinicDetails } from '#/features/programs/elite-clinic/components/EliteClinicDetails'
import { EliteClinicCoaches } from '#/features/programs/elite-clinic/components/EliteClinicCoaches'
import type { EliteClinicData } from '#/features/programs/elite-clinic/types'
import { HARDCODED_DEFAULTS } from '../elite-clinic-admin.service'
import type { EliteClinicFormValues } from '../schema'

export type EliteClinicTab = 'hero' | 'overview' | 'details' | 'coaches'

const TAB_LABEL: Record<EliteClinicTab, string> = {
  hero: 'Hero',
  overview: 'Overview',
  details: 'Details',
  coaches: 'Coaches',
}

interface Props {
  activeTab: EliteClinicTab
  values: EliteClinicFormValues
}

function buildPreviewData(values: EliteClinicFormValues): EliteClinicData {
  // Mergea los campos editables con los hardcoded (subtitle, location, objectives, packingList)
  return {
    ...values,
    ...HARDCODED_DEFAULTS,
  }
}

export function EliteClinicPreview({ activeTab, values }: Props) {
  const data = buildPreviewData(values)

  return (
    <div className="hidden lg:flex max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          {TAB_LABEL[activeTab]}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div style={{ zoom: '0.42' }}>
          {activeTab === 'hero' && <EliteClinicHero data={data} />}
          {activeTab === 'overview' && <EliteClinicOverview data={data} />}
          {activeTab === 'details' && <EliteClinicDetails data={data} />}
          {activeTab === 'coaches' && <EliteClinicCoaches data={data} />}
        </div>
      </div>
    </div>
  )
}
