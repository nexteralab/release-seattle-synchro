import type { FreeTryData } from '../types'
import imageFreeTry from '/images/piscina.webp'
import { Award, Calendar, MapPin } from 'lucide-react'

interface Props {
  data: FreeTryData
}

export function FreeTryOverview({ data }: Props) {
  return (
    <section id="details" className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-labelledby="freetry-overview-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Left: marketing copy */}
          <div>
            <h2
              id="freetry-overview-heading"
              className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase mb-6"
            >
              Come Try Artistic Swimming for Free
            </h2>
            <div className="space-y-5">
              <p className="text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
                Artistic swimming is the only sport that asks an athlete to be a swimmer, a dancer
                and a gymnast at the same time. Our free trial is a short, welcoming introduction
                to what that actually feels like: sculling, basic figures, a first attempt at
                holding a position upside down, and a genuine sense of whether this is the sport
                your child has been looking for.
              </p>
              <p className="text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
                Sessions are led by Seattle Synchro coaches, the same staff who train our
                competitive athletes, including former national team competitors. Groups are kept
                small so every swimmer gets real attention in the water instead of waiting in line
                at the wall.
              </p>
              <p className="text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
                The trial is the easiest, lowest-risk way to find out if your swimmer belongs in
                the water with us, no experience required.
              </p>
            </div>
          </div>

          {/* Right: info cards */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-2 text-secondary mb-6">
                <Award size={20} strokeWidth={2} />
                <span className="font-bold text-[14px] tracking-[1.4px] uppercase">
                  Designed for Future Champions
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-black/10 pb-4">
                  <span className="font-bold text-secondary text-[13px] tracking-[1.4px] uppercase">Ages</span>
                  <span className="text-secondary text-[16px] md:text-[18px] font-semibold">{data.ages}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-bold text-secondary text-[13px] tracking-[1.4px] uppercase">Cost</span>
                  <span className="text-secondary text-[16px] md:text-[18px] font-semibold">Free, no card required</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-2 text-secondary mb-6">
                <Calendar size={20} strokeWidth={2} />
                <span className="font-bold text-[14px] tracking-[1.4px] uppercase">Upcoming Session</span>
              </div>
              <span className="inline-flex items-center h-8 px-3 rounded-full bg-secondary/10 text-secondary font-bold text-[12px] tracking-[1.4px] uppercase">
                Save the date
              </span>
              <p className="mt-4 text-secondary text-[16px] md:text-[18px] font-semibold leading-[26px]">
                {data.date} · {data.time}
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-3xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-secondary mb-4">
                  <MapPin size={18} strokeWidth={2} />
                  <span className="font-bold text-[12px] tracking-[1.4px] uppercase">Location Details</span>
                </div>
                <p className="font-bold text-secondary text-[14px] md:text-[16px] mb-1">{data.location.name}</p>
                <p className="text-[#737373] text-[14px] md:text-[16px] leading-[24px] whitespace-pre-line">
                  {data.location.address}
                </p>
              </div>
              <img
                src={imageFreeTry}
                alt={data.location.name}
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
