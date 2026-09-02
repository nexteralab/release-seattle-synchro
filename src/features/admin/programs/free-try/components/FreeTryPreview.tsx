import { CtaBanner } from '#/components/CtaBanner'
import { FreeTryFaq } from '#/features/programs/free-try/components/FreeTryFaq'
import { FreeTryHero } from '#/features/programs/free-try/components/FreeTryHero'
import { FreeTrySafety } from '#/features/programs/free-try/components/FreeTrySafety'
import { FreeTryOverview } from '#/features/programs/free-try/components/FreeTryOverview'
import { FreeTryRequirements } from '#/features/programs/free-try/components/FreeTryRequirements'
import type { FreeTryData } from '#/features/programs/free-try/types'

interface Props {
  data: FreeTryData
}

export function FreeTryPreview({ data }: Props) {
  // self-start: sin esto el panel es un flex item con align-items:stretch y
  // toma la altura de la fila (la del formulario), no la suya.
  return (
    <div className="hidden lg:flex self-start max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          Free Try
        </p>
      </div>

      {/* Sin overflow-y propio: el preview crece completo y se mueve con el
          scroll principal del admin. Dos barras de scroll en la misma pantalla
          quedan feas. overflow-x sí, porque el zoom 0.42 desborda a lo ancho. */}
      <div className="overflow-x-hidden">
        <div className="brand-surface" style={{ zoom: '0.42' }}>
          <FreeTryHero hero={data.hero} />
          <FreeTryOverview data={data} />
          <FreeTrySafety safety={data.safety} />
          <FreeTryRequirements />
          <FreeTryFaq faqs={data.faq} />
          <CtaBanner
            heading={data.banner.heading}
            description={data.banner.description}
            linkToContact="/contact-us"
            linkLabelContact={data.banner.contactLabel}
            linkVariantContact="secondary"
            linkToRegister={data.banner.registerUrl}
            linkLabelRegister={data.banner.registerLabel}
            image={data.banner.image}
            alt={data.banner.heading}
          />
        </div>
      </div>
    </div>
  )
}
