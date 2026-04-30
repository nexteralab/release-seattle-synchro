import { Link } from "@tanstack/react-router";

import readyToJoin from '/images/ready_to_join_3.png'


export function RecreationalSeaStar() {
  return (
    <section className="p-12 md:px-20 md:py-24 bg-[#F5F5F5]" aria-labelledby="seastar-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2
              id="seastar-heading"
              className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
            >
              Sharks & Mermaids
            </h2>
            <Link
              to="/booster/donate"
              className="bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
          <p className="text-[#171717] text-[18px] leading-[26px]">
            The Little Mermaids is the continuation of Sea Star. It is a hybrid program that transitions between recreational to beginner. The classes are specially designed for our young athletes age 5 to 11. They work on strengthening their swimming skills while learning synchro basics and a short routine to music. This is a non competitive program that runs from March to June. Members of this team will have the opportunity to perform the routine they learn throughout the season at our club's celebration swim on June 7th.
          </p>
          <p className="text-[#171717] text-[18px] leading-[26px]">
            Even though mermaids is our recreational program, it is important that the swimmers are able to swim independently and be safe in water.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-10">
            <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
              Program Details
            </h3>
            <div className="space-y-6">
              <DetailItem label="Ages" value="5–10" />
              <DetailItem label="Coach" value="Sophie Lin & Daniela Garmendia" />
              <div>
                <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                  Workout Days / Times
                </h4>
                <p className="text-[#737373] text-[16px]">
                  Saturdays 11:00am – 11:50am
                </p>
                <p className="text-[#737373] text-[14px] italic mt-2">
                  No class Friday May 15th. Last class June 5th.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                  Cost
                </h4>
                <p className="text-[#737373] text-[16px]">
                  $50 registration fee + $60 March dues
                </p>
                <p className="text-[#737373] text-[14px] italic mt-2">
                  Pool fees should be covered through one payment to the booster club (approximately $280)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10">
            <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
              Required Swimming Skills
            </h3>
            <ul className="text-[#737373] text-[16px] space-y-2">
              <li>• Swimmers must be safe in water and swim independently</li>
              <li>• 2 laps of crawl</li>
              <li>• 2 laps of breaststroke</li>
              <li>• 1 lap of backstroke</li>
              <li>• Float on back independently for 10 seconds</li>
              <li>• Tread water for 20 seconds</li>
            </ul>
          </div>
        </div>
        <div className="relative mt-8 bg-[#0A0A67] px-10 py-10 text-white overflow-hidden min-h-[220px]">
          {/* Content — capped width on desktop to leave room for the illustration */}

          <div className="relative flex flex-col gap-4">
            <h3 className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-4">
              Unique Opportunity
            </h3>
            <ul className="space-y-3 text-white/90 text-[16px]">
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

            {/* Decorative illustration — absolute bottom-right, hidden on mobile */}
            <img
              src={readyToJoin}
              alt=""
              aria-hidden="true"
              className="absolute bottom-[-100px] right-[-40px] h-full w-auto object-contain object-bottom pointer-events-none opacity-70"
            />

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
