import { Link } from "@tanstack/react-router";

import readyToJoin from '/images/ready_to_join_3.png'
import type { RecreationalSubProgram } from '../types'


const SHARKS_MERMAIDS_FALLBACK: RecreationalSubProgram = {
  id: 'sharks-mermaids',
  name: 'Sharks & Mermaids',
  ages: '5–10',
  coach: 'Sophie Lin & Daniela Garmendia',
  workout_days_times: 'Saturdays 11:00am – 11:50am',
  schedule_note: 'No class Friday May 15th. Last class June 5th.',
  duration: '',
  cost: '$50 registration fee + $60 March dues',
  cost_note: 'Pool fees should be covered through one payment to the booster club (approximately $280)',
}

interface Props {
  program?: RecreationalSubProgram
}

export function RecreationalSharksMermaids({ program = SHARKS_MERMAIDS_FALLBACK }: Props = {}) {
  return (
    <section id="sharks-mermaids" className="p-6 md:px-12 lg:p-20 bg-[#F5F5F5] scroll-mt-24" aria-labelledby="sharks-mermaids-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2
              id="sharks-mermaids-heading"
              className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
            >
              {program.name}
            </h2>
            <a
              href="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
            >
              Register Now
            </a>
          </div>
          <p className="text-secondary text-[16px] md:text-[18px] leading-[26px]">
            These classes are designed for swimmers who have mastered crawl stroke, breaststroke and backstroke. They should be comfortable floating on their back and swimming.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProgramDetailsCard program={program} bg="white" />
          <RequiredSkillsCard bg="white" />
        </div>
      </div>
    </section>
  )
}

// ── Shared cards ──────────────────────────────────────────

function ProgramDetailsCard({
  program,
  bg,
}: {
  program: RecreationalSubProgram
  bg: 'white' | '#F5F5F5'
}) {
  return (
    <div className={bg === 'white' ? 'bg-white p-6 md:p-10' : 'bg-[#F5F5F5] p-6 md:p-10'}>
      <h3 className="font-bold text-secondary text-[16px] md:text-[20px] tracking-[-1px] uppercase mb-8">
        Program Details
      </h3>
      <div className="space-y-6">
        <DetailItem label="Ages" value={program.ages} />
        <DetailItem label="Coach" value={program.coach} />
        <div>
          <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
            Workout Days / Times
          </h4>
          <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px]">
            {program.workout_days_times}
          </p>
          {program.schedule_note && (
            <p className="text-[#737373] text-[14px] mt-2">{program.schedule_note}</p>
          )}
        </div>
        {program.duration && (
          <DetailItem label="Duration" value={program.duration} />
        )}
        <div>
          <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
            Cost
          </h4>
          <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px]">
            {program.cost}
          </p>
          {program.cost_note && (
            <p className="text-[#737373] text-[14px] mt-2">{program.cost_note}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function RequiredSkillsCard({ bg }: { bg: 'white' | '#F5F5F5' }) {
  return (
    <div className={bg === 'white' ? 'bg-white p-6 md:p-10' : 'bg-[#F5F5F5] p-6 md:p-10'}>
      <h3 className="font-bold text-secondary text-[16px] md:text-[20px] tracking-[-1px] uppercase mb-8">
        Required Swimming Skills
      </h3>
      <ul className="text-[#737373] text-[16px] md:text-[18px] leading-[26px] space-y-2">
        <li>• Swimmers must be safe in water and swim independently</li>
        <li>• 2 laps of crawl</li>
        <li>• 2 laps of breaststroke</li>
        <li>• 1 lap of backstroke</li>
        <li>• Float on back independently for 10 seconds</li>
        <li>• Tread water for 20 seconds</li>
      </ul>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
        {label}
      </h4>
      <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px]">{value}</p>
    </div>
  )
}
