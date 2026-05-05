import type { FreeTryData } from './types'
import { FreeTryHero } from './components/FreeTryHero'
import { FreeTryOverview } from './components/FreeTryOverview'
import { FreeTryRequirements } from './components/FreeTryRequirements'
import { CtaBanner } from '#/components/CtaBanner'


const consultDbDataFreeTry = {
  "nameProgram": "FREE TRY EVENT 2026",
  "description": "Join us on June 7th for a free introduction to the world of artistic swimming.",
  "linkTo": "https://www.gomotionapp.com/team/zzssst/controller/cms/admin/index#/classreg-shopping",
  "linkLabel": "Register Now",
  "linkVariant": "secondary",
  "linkToRegister": "https://www.gomotionapp.com/team/zzssst/controller/cms/admin/index#/classreg-shopping",
  "linkLabelRegister": "Register Now",
  "image": "4",
}

interface Props {
  data: FreeTryData
}

export function FreeTryPage({ data }: Props) {
  return (
    <div className="w-full">
      <FreeTryHero nameProgram={consultDbDataFreeTry.nameProgram} />
      <FreeTryOverview data={data} />
      <FreeTryRequirements requirements={data.requirements} />
      <CtaBanner
        heading="Ready to Dive In?"
        description="Spots are limited! Join us on June 7th for a free introduction to the world of artistic swimming."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        linkToRegister="https://www.gomotionapp.com/team/zzssst/controller/cms/admin/index#/classreg-shopping"
        linkLabelRegister="Register Now"
        image="4"
        alt="Ready to Dive In? Free Try 2026 banner"
      />
    </div>
  )
}
