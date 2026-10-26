import type { SummerCampContent } from './types'
import { SummerCampHero } from './components/SummerCampHero'
import { SummerCampDates } from './components/SummerCampDates'
import { SummerCampOverview } from './components/SummerCampOverview'
import { SummerCampRequirements } from './components/SummerCampRequirements'
import { CtaBanner } from '#/components/CtaBanner'
import { Reviews } from '#/components/Reviews'

interface Props {
  content: SummerCampContent
}

export function SummerCampPage({ content }: Props) {
  return (
    <div className="w-full">
      <SummerCampHero hero={content.hero} />
      <SummerCampOverview
        overview={content.overview}
        details={content.details}
        sessions={content.sessions}
      />
      <SummerCampDates
        dates={content.dates}
        sessions={content.sessions}
        schedule={content.details.schedule}
        pricePerWeek={content.price_per_week}
      />
      <SummerCampRequirements requirements={content.requirements} />
      <Reviews bg="white" reviews={content.reviews} />
      <CtaBanner
        heading={content.banner.heading}
        description={content.banner.description}
        linkToContact="/contact-us"
        linkLabelContact={content.banner.contactLabel}
        linkVariantContact="secondary"
        linkToRegister={content.banner.registerUrl}
        linkLabelRegister={content.banner.registerLabel}
        image={content.banner.image}
        alt={content.banner.heading}
      />
    </div>
  )
}
