import { Link } from "@tanstack/react-router";
import type { RecreationalSubProgram } from '../types'

const FALLBACK: RecreationalSubProgram = {
  id: 'dolphins',
  name: 'Dolphins',
  ages: '6–12',
  coach: 'TBD',
  workout_days_times: 'Not available - TBD',
  schedule_note: '',
  duration: '8-week session',
  cost: '$150 + $15 registration fee',
  cost_note: '',
}

interface Props {
  program?: RecreationalSubProgram
}

export function RecreationalDolphins({ program = FALLBACK }: Props = {}) {
  return (
    <section id="dolphins" className="p-6 md:px-12 lg:p-20 bg-[#F5F5F5] scroll-mt-24" aria-labelledby="dolphins-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2
              id="dolphins-heading"
              className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
            >
              {program.name}
            </h2>
            <Link
              to="/contact-us"
              className="bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-secondary text-[16px] md:text-[18px] leading-[26px]">
            Dolphins is our swimming class for swimmers who would like to practice Artistic Swimming but that still need to work on on mastering crawl stroke, breast stroke and back stroke. They should be comfortable floating on their back and swimming under water. Participants will also learn basic sculling and work on flexibility.
          </p>
          <p className="text-secondary text-[16px] md:text-[18px] leading-[26px]">
            The Dolphin program is a non-competitive program where swimmers learn basic swimming and synchro skills. Lessons run in 8 week sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-6 md:p-10">
            <h3 className="font-bold text-secondary text-[16px] md:text-[20px] tracking-[-1px] uppercase mb-8">
              Program Details
            </h3>
            <div className="space-y-6">
              <DetailItem label="Ages" value={program.ages} />
              <DetailItem label="Coach" value={program.coach} />
              <div>
                <h4 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
                  Workout Days / Times
                </h4>
                <p className="text-secondary text-[16px] md:text-[18px] leading-[26px]">
                  {program.workout_days_times}
                </p>
                {program.schedule_note && (
                  <p className="text-secondary text-[14px] mt-2">{program.schedule_note}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10">
            <h3 className="font-bold text-secondary text-[16px] md:text-[20px] tracking-[-1px] uppercase mb-8">
              Required Swimming Skills
            </h3>
            <div className="space-y-6">
              {program.duration && (
                <DetailItem label="Duration" value={program.duration} />
              )}
              <div>
                <h4 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
                  Cost
                </h4>
                <p className="text-secondary text-[16px] md:text-[18px] leading-[26px]">
                  {program.cost}
                </p>
                {program.cost_note && (
                  <p className="text-secondary text-[14px] mt-2">{program.cost_note}</p>
                )}
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
      <h4 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
        {label}
      </h4>
      <p className="text-secondary text-[16px] md:text-[18px] leading-[26px]">{value}</p>
    </div>
  )
}
