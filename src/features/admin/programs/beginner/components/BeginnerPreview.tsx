import { BeginnerPage } from '#/features/programs/beginner/BeginnerPage'
import type { BeginnerData } from '#/features/programs/beginner/types'

interface Props {
  data: BeginnerData
}

export function BeginnerPreview({ data }: Props) {
  // self-start: sin esto el panel es un flex item con align-items:stretch y
  // toma la altura de la fila (la del formulario), no la suya.
  return (
    <div className="hidden lg:flex self-start max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          Beginner
        </p>
      </div>

      {/* Sin overflow-y propio: el preview se mueve con el scroll principal del admin. */}
      <div className="overflow-x-hidden">
        <div className="brand-surface" style={{ zoom: '0.42' }}>
          <BeginnerPage data={data} />
        </div>
      </div>
    </div>
  )
}
