import { Fragment } from 'react'

interface Props {
  coaches: string
  workoutDays: string
}

export function Competitive1315({ coaches, workoutDays }: Props) {
  const coachLines = coaches.split('\n').filter(Boolean)

  return (
    <section className="p-6 md:px-20 md:py-24 bg-white" aria-labelledby="group-1315">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
          <h2
            id="group-1315"
            className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
          >
            13–15 Age Group
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#f5f5f5] p-6 md:p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Coaches
            </h3>
            <p className="text-[#737373] text-[16px] leading-[24px]">
              {coachLines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < coachLines.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="bg-[#f5f5f5] p-6 md:p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Workout Days
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              {workoutDays}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
