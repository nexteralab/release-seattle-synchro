import { Link } from "@tanstack/react-router";

import readyToJoin from '/images/ready_to_join_3.png'
import type { RecreationalSubProgram } from '../types'

const SEA_STARS_FALLBACK: RecreationalSubProgram = {
  id: 'sea-stars',
  name: 'Sea Stars',
  ages: '5–10',
  coach: 'Sophie Lin & Daniela Garmendia',
  workout_days_times: 'Fridays 4:00-5:00pm',
  schedule_note: 'No class Friday May 15th. Last class June 5th.',
  duration: '',
  cost: '$50 registration fee + $60 March dues',
  cost_note: 'Pool fees should be covered through one payment to the booster club (approximately $280)',
}

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
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="sharks-mermaids-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2
              id="sharks-mermaids-heading"
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
          <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px]">
            The Little Mermaids is the continuation of Sea Stars Program. It is a hybrid program that transitions between recreational to beginner. The classes are specially designed for our young athletes age 5 to 11. They work on strengthening their swimming skills while learning synchro basics and a short routine to music. This is a non competitive program that runs from March to June. Members of this team will have the opportunity to perform the routine they learn throughout the season at our club's celebration swim on June 7th.
          </p>
          <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px]">
            Even though mermaids is our recreational program, it is important that the swimmers are able to swim independently and be safe in water.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProgramDetailsCard program={program} bg="#F5F5F5" />
          <RequiredSkillsCard bg="#F5F5F5" />
        </div>

        <div className="relative mt-8 overflow-hidden bg-[#0A0A67] text-white">
          <img
            src={readyToJoin}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 bottom-[-40px] md:bottom-[-60px] w-80 sm:w-80 md:w-96 lg:w-[28rem] h-auto opacity-60 md:opacity-70"
          />
          <div className="relative flex flex-col gap-4 p-6 md:p-10 pb-60 sm:pb-[10rem] md:pb-12 md:pr-[26rem] lg:pr-[30rem]">
            <h3 className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-4">
              Unique Opportunity
            </h3>
            <ul className="space-y-3 text-white/90 text-[16px] md:text-[18px] leading-[26px]">
              {[
                'Limited-spot mermaid artistic swimming experience',
                'Performance opportunity',
                'Skill development + choreography',
                'Refined swimming technique & foundational water skills',
                'Confidence-building aquatic artistry',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div
                    className="bg-[#6abf4b] size-6 flex items-center justify-center font-bold shrink-0 rounded-full text-white text-[12px] mt-0.5"
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

export function RecreationalSeaStars({ program = SEA_STARS_FALLBACK }: Props = {}) {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-[#F5F5F5]" aria-labelledby="sea-stars-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2
              id="sea-stars-heading"
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
            Sea Star is our non-competitive/recreational program. Lessons run in 8 week sessions from January-June. This program is for kids who have mastered the basic strokes but have no experience in Artistic Swimming. An athlete should be able to swim two laps of crawl stroke and breaststroke as well as feel comfortable floating on his/her back.
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
      <h4 className="font-bold text-[#737373] text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
        {label}
      </h4>
      <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px]">{value}</p>
    </div>
  )
}
