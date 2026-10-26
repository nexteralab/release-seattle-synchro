import { Fragment } from 'react'
import type { CompetitiveGroup } from '../types'

interface Props {
  group: CompetitiveGroup
}

export function Competitive12Under({ group }: Props) {
  const coachLines = group.coaches.split('\n').filter(Boolean)

  return (
    <section id="12-under" className="p-6 md:px-20 md:py-24 bg-[#f5f5f5] scroll-mt-24" aria-labelledby="group-12u">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
          <h2
            id="group-12u"
            className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
          >
            {group.title}
          </h2>
        </div>
        {group.description && (
          <p className="text-[#171717] text-[18px] leading-[26px] max-w-4xl mb-12">
            {group.description}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Coaches
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              {coachLines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < coachLines.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Workout Days
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              {group.workoutDays}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
