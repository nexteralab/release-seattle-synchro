import type { RecreationalSubProgram } from '../types'
import { SHARKS_MERMAIDS_FALLBACK } from './RecreationalSeaStar'

interface Props {
  program?: RecreationalSubProgram
}

export function RecreationalOverview({ program = SHARKS_MERMAIDS_FALLBACK }: Props = {}) {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="recreational-heading">
      <div className="max-w-screen-md mx-auto text-center">
        <div className="bg-primary/15 inline-block rounded-full px-5 py-2">
          <span className="font-bold text-primary text-[12px] tracking-[2.2px] uppercase">
            Ages {program.ages}
          </span>
        </div>
        <h1
          id="recreational-heading"
          className="mt-6 font-bold text-secondary text-[38px] md:text-[56px] tracking-[-1.8px] uppercase leading-[1.08]"
        >
          Recreational Artistic Swimming Programs
        </h1>
        <p className="mt-5 font-bold text-primary text-[15px] md:text-[16px] tracking-[1.2px] uppercase">
          Non-competitive programs designed for fun, fitness, and skill development
        </p>
        <p className="mt-8 text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
          Designed for swimmers ages {program.ages}, this non-competitive program builds a strong
          foundation in <strong className="text-secondary font-semibold">artistic swimming</strong>,
          the Olympic sport also known as{' '}
          <strong className="text-secondary font-semibold">synchronized swimming</strong>, through
          fun, fitness, and progressive skill development. There are no judges, no scores, and no
          pressure to win. Instead, the focus is on movement, music, teamwork, and having a good
          time in the water. It is the perfect starting point for young athletes who dream of one
          day joining a competitive team.
        </p>
      </div>
    </section>
  )
}
