import { FreeTryOverview } from '#/features/programs/free-try/components/FreeTryOverview'
import { FreeTryRequirements } from '#/features/programs/free-try/components/FreeTryRequirements'
import type { FreeTryData } from '#/features/programs/free-try/types'

interface Props {
  data: FreeTryData
}

export function FreeTryPreview({ data }: Props) {
  return (
    <div className="hidden lg:flex max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          Free Try
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div style={{ zoom: '0.42' }}>
          <FreeTryOverview data={data} />
          <FreeTryRequirements />
        </div>
      </div>
    </div>
  )
}
