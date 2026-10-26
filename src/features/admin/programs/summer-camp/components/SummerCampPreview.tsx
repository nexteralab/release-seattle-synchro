import { CtaBanner } from '#/components/CtaBanner'
import { Reviews } from '#/components/Reviews'
import { SummerCampHero } from '#/features/programs/summer-camp/components/SummerCampHero'
import { SummerCampOverview } from '#/features/programs/summer-camp/components/SummerCampOverview'
import { SummerCampDates } from '#/features/programs/summer-camp/components/SummerCampDates'
import { SummerCampRequirements } from '#/features/programs/summer-camp/components/SummerCampRequirements'
import type { SummerCampContent } from '#/features/programs/summer-camp/types'

interface Props {
  data: SummerCampContent
}

export function SummerCampPreview({ data }: Props) {
  // self-start: sin esto el panel toma la altura de la fila (la del formulario).
  return (
    <div className="hidden lg:flex self-start max-w-xl w-full shrink-0 border-l border-border bg-white flex-col">
      <div className="px-4 pt-5 pb-2 border-b border-border flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">
          Preview
        </p>
        <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#0A0A67]">
          Summer Camp
        </p>
      </div>

      {/* Sin overflow-y propio: el preview se mueve con el scroll principal del admin. */}
      <div className="overflow-x-hidden">
        <div className="brand-surface" style={{ zoom: '0.42' }}>
          <SummerCampHero hero={data.hero} />
          <SummerCampOverview overview={data.overview} details={data.details} sessions={data.sessions} />
          <SummerCampDates
            dates={data.dates}
            sessions={data.sessions}
            schedule={data.details.schedule}
            pricePerWeek={data.price_per_week}
          />
          <SummerCampRequirements requirements={data.requirements} />
          <Reviews bg="white" reviews={data.reviews} />
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
