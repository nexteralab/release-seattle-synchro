import {
  RecreationalSharksMermaids,
} from '#/features/programs/recreational/components/RecreationalSeaStar'
import type {
  RecreationalSubProgram,
  RecreationalSubProgramId,
} from '#/features/programs/recreational/types'

interface Props {
  activeTab: RecreationalSubProgramId
  programs: RecreationalSubProgram[]
}

export function RecreationalPreview({ activeTab, programs }: Props) {
  const byId = new Map(programs.map(p => [p.id, p]))
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
          {active && activeTab === 'sharks-mermaids' && (
            <RecreationalSharksMermaids program={active} />
          )}
        </div>
      </div>
    </div>
  )
}
