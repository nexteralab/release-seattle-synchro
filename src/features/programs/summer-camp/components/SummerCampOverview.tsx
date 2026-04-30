import type { CampDetails } from '../types'

interface Props {
  details: CampDetails
}

export function SummerCampOverview({ details }: Props) {
  return (
    <section className="p-12 md:px-20 md:py-24 bg-white" aria-labelledby="overview-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2
              id="overview-heading"
              className="font-bold text-secondary text-[48px] tracking-[-2.4px] uppercase mb-8"
            >
              About the
              <br />
              Camp
            </h2>
            <div className="space-y-6 text-[#171717] text-[18px] leading-[29px]">
              <p>
                Dive into the world of artistic swimming at our recreational summer camp! Join us for
                a week of fun and creativity as we blend athleticism with artistry in the pool.
                Designed for swimmers of all levels, our camp offers expert instruction in technique,
                choreography, and teamwork.
              </p>
              <p>
                Participants will learn a routine set to music, develop their swimming skills, and
                unleash their creativity through water-based performances. Whether you're a beginner
                or have some experience, come make a splash with us this summer!
              </p>
              <p>
                Skills: campers will reinforce swimming technique, learn basic artistic swimming
                skills and a routine that will be performed at the end of the week.
              </p>
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-12">
            <h3 className="font-bold text-secondary text-[24px] tracking-[-1.2px] uppercase mb-8">
              Camp Details
            </h3>
            <div className="space-y-6">
              <DetailItem label="Ages" value={details.ages} />
              <DetailItem label="Skill Level" value={details.skillLevel} />
              <DetailItem label="Daily Schedule" value={details.schedule} />

              <div>
                <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                  Locations
                </h4>
                <div className="space-y-4">
                  {details.locations.map((loc) => (
                    <div key={loc.name}>
                      <p className="font-bold text-secondary mb-1 text-[16px]">
                        {loc.name}
                      </p>
                      <p className="text-[#737373] text-[16px]">
                        Dates: {loc.dates}
                      </p>
                      <p className="text-[#737373] text-[16px] whitespace-pre-line">
                        {loc.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
        {label}
      </h4>
      <p className="text-[#737373] text-[16px]">{value}</p>
    </div>
  )
}
