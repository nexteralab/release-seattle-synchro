import type { FreeTryData } from './types'
import { FreeTryHero } from './components/FreeTryHero'
import { FreeTryOverview } from './components/FreeTryOverview'
import { FreeTrySafety } from './components/FreeTrySafety'
import { FreeTryRequirements } from './components/FreeTryRequirements'
import { FreeTryFaq } from './components/FreeTryFaq'
import { CtaBanner } from '#/components/CtaBanner'


const consultDbDataFreeTry = {
  "nameProgram": "Free try",
  "description": "Join us for a free introduction to the world of artistic swimming.",
  "linkTo": "https://www.seattlesynchrosst.com/page/system/classreg-shopping",
  "linkLabel": "Register Now",
  "linkVariant": "secondary",
  "linkToRegister": "https://www.seattlesynchrosst.com/page/system/classreg-shopping",
  "linkLabelRegister": "Register Now",
  "image": "4",
}

interface Props {
  data: FreeTryData
}

export function FreeTryPage({ data }: Props) {
  return (
    <div className="w-full">
      <FreeTryHero
        nameProgram={consultDbDataFreeTry.nameProgram}
        description={consultDbDataFreeTry.description}
        date={data.date}
        time={data.time}
        linkToRegister={consultDbDataFreeTry.linkToRegister}
        linkLabelRegister={consultDbDataFreeTry.linkLabelRegister}
      />
      <FreeTryOverview data={data} />
      <FreeTrySafety />
      <FreeTryRequirements />
      <FreeTryFaq />
      <CtaBanner
        heading="Ready to Dive In?"
        description="Spots are limited! Join us for a free introduction to the world of artistic swimming."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        linkToRegister="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
        linkLabelRegister="Register Now"
        image="4"
        alt="Ready to Dive In? Free Try 2026 banner"
      />
    </div>
  )
}
