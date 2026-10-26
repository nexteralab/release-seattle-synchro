import { Fragment } from 'react'
import readyToJoin from '/images/image_back.png'
import type { CompetitiveData } from '../types'

interface Props {
  group: CompetitiveData['junior']
}

export function CompetitiveJunior({ group }: Props) {
  const coachLines = group.coaches.split('\n').filter(Boolean)

  return (
    <section id="junior" className="p-6 md:px-20 md:py-24 bg-[#f5f5f5] scroll-mt-24" aria-labelledby="group-junior">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <h2
              id="group-junior"
              className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
            >
              {group.title}
            </h2>
          </div>
          {group.description && (
            <p className="text-[#171717] text-[18px] leading-[26px] max-w-4xl">
              {group.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 md:p-8">
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
          <div className="bg-white rounded-3xl p-6 md:p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Workout Days
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              {group.workoutDays}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[#0A0A67] text-white">
          <img
            src={readyToJoin}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 bottom-[-40px] md:bottom-[-60px] w-80 sm:w-80 md:w-96 lg:w-[28rem] h-auto opacity-60 md:opacity-70"
          />
          <div className="relative flex flex-col gap-4 p-6 md:p-8 pb-52 sm:pb-[12rem] md:pb-12 md:pr-[26rem] lg:pr-[30rem]">
            <h3 className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-4">
              {group.highlightsTitle}
            </h3>
            <ul className="space-y-2 text-white/90 text-[16px]">
              {group.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div
                    className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                    aria-hidden="true"
                  >
                    ✓
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
