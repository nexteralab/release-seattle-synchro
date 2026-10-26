import { CompetitivePage } from '#/features/programs/competitive/CompetitivePage'
import type { CompetitiveData } from '#/features/programs/competitive/types'

interface Props {
  data: CompetitiveData
}

export function CompetitivePreview({ data }: Props) {
  // self-start: sin esto el panel toma la altura de la fila (la del formulario).
  return (
    <div className="hidden lg:flex self-start max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          Competitive
        </p>
      </div>

      {/* Sin overflow-y propio: el preview se mueve con el scroll principal del admin. */}
      <div className="overflow-x-hidden">
        <div className="brand-surface" style={{ zoom: '0.42' }}>
          <CompetitivePage data={data} />
        </div>
      </div>
    </div>
  )
}
