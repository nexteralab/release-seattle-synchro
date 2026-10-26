import type { RecreationalData } from '../types'
import { BoldText } from './LeadText'

interface Props {
  overview: RecreationalData['overview']
  ages: string
}

export function RecreationalOverview({ overview, ages }: Props) {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="recreational-heading">
      <div className="max-w-screen-md mx-auto text-center">
        <div className="bg-primary/15 inline-block rounded-full px-5 py-2">
          <span className="font-bold text-primary text-[12px] tracking-[2.2px] uppercase">
            Ages {ages}
          </span>
        </div>
        <h1
          id="recreational-heading"
          className="mt-6 font-bold text-secondary text-[38px] md:text-[56px] tracking-[-1.8px] uppercase leading-[1.08]"
        >
          {overview.title}
        </h1>
        <p className="mt-5 font-bold text-primary text-[15px] md:text-[16px] tracking-[1.2px] uppercase">
          {overview.subtitle}
        </p>
        <p className="mt-8 text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
          <BoldText text={overview.body} />
        </p>
      </div>
    </section>
  )
}
