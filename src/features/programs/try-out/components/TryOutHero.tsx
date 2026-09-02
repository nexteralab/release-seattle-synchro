import { motion } from 'motion/react'
import type { TryOutData } from '../types'
import heroImage from '/images/programs/tryout.webp'

const t = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const vp = { once: true }

interface Props {
  data: TryOutData
}

export function TryOutHero({ data }: Props) {
  return (
    <section className="bg-white" aria-labelledby="tryout-hero-heading">
      {/* Imagen principal — mismo layout contenido que Free Try, Summer Camp
          y Elite Clinic: con margen, esquinas redondeadas y sin pantalla completa. */}
      <div className="p-6 pt-10 md:p-12 md:px-20 md:pt-16">
        <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh] rounded-3xl overflow-hidden max-w-screen-xl mx-auto">
          <img
            src={heroImage}
            alt="Seattle Synchro swimmers at a tryout session"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-start">

          {/* Left: info */}
          <motion.div
            whileInView={{ opacity: [0, 1], x: [-40, 0] }}
            viewport={vp}
            transition={t}
          >
            <h1
              id="tryout-hero-heading"
              className="font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase mb-3"
            >
              How to join the team!
            </h1>
            <p className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-8">
              Designed for Future Champions
            </p>

            <div className="space-y-6 mb-10">
              <DetailItem label="Ages" value={data.ages} />
              <DetailItem label="When" value={data.when} />
            </div>

            <div className="bg-secondary p-4 md:p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white text-[20px]">🛡️</span>
                <h2 className="font-bold text-white text-[14px] tracking-[1.4px] uppercase">
                  Join Seattle Synchro's Novice Team
                </h2>
              </div>
              <p className="text-white/90 text-[15px] leading-[24px] italic">
                "Safety is our priority. Participants MUST be able to swim 4 laps of crawl stroke,
                breaststroke and backstroke unassisted. See the full requirements below."
              </p>
            </div>
          </motion.div>

          {/* Right: location card */}
          <motion.div
            whileInView={{ opacity: [0, 1], x: [40, 0] }}
            viewport={vp}
            transition={t}
            className="bg-[#f5f5f5] rounded-3xl overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <p className="font-bold text-secondary text-[12px] tracking-[1.4px] uppercase mb-4">
                Location Details
              </p>
              <div className="flex items-start gap-3 mb-4">
                <span className="text-secondary text-[18px] mt-0.5">📍</span>
                <div>
                  <p className="font-bold text-secondary text-[14px] md:text-[16px] mb-1">{data.location.name}</p>
                  <p className="text-[#737373] text-[14px] md:text-[16px] leading-[24px]">
                    {data.location.address}
                  </p>
                </div>
              </div>
            </div>
            <img
              src={data.heroImage}
              alt={data.location.name}
              className="w-full h-[250px] object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-1">
        {label}
      </h3>
      <p className="text-[#737373] text-[14px] md:text-[16px]">{value}</p>
    </div>
  )
}
