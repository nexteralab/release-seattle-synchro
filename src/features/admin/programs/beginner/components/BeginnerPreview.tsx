import { BeginnerDetails } from '#/features/programs/beginner/components/BeginnerDetails'
import { BeginnerIntermediate } from '#/features/programs/beginner/components/BeginnerIntermediate'
import type { BeginnerSubProgram } from '#/features/programs/beginner/types'
import type { ProgramPath } from '../schema'

interface Props {
  activeTab: ProgramPath
  novice: BeginnerSubProgram
  intermediate: BeginnerSubProgram
}

export function BeginnerPreview({ activeTab, novice, intermediate }: Props) {
  const activeName = activeTab === 'novice' ? novice.name : intermediate.name

  return (
    <div className="hidden lg:flex max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          {activeName}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div style={{ zoom: '0.42' }}>
          {activeTab === 'novice' ? (
            <BeginnerDetails program={novice} />
          ) : (
            <BeginnerIntermediate program={intermediate} />
          )}
        </div>
      </div>
    </div>
  )
}
