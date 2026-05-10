import { motion } from 'motion/react'
import type { CampSession } from '../types'

const vp = { once: true, margin: '-50px' }
const t  = { duration: 0.4, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }

interface Props {
  sessions: CampSession[]
  schedule: string
  pricePerWeek: string
}

export function SummerCampDates({ sessions, schedule, pricePerWeek }: Props) {
  return (
    <section
      className="bg-[#0A0A67] px-6 py-16 md:px-20 md:py-24"
      aria-labelledby="dates-heading"
    >
      <div className="max-w-screen-lg mx-auto">

        {/* Kicker */}
        <motion.p
          whileInView={{ opacity: [0, 1], y: [16, 0] }}
          viewport={vp}
          transition={t}
          className="font-bold text-[#63AC23] text-[12px] tracking-[2.4px] uppercase mb-4"
        >
          Mark Your Calendar
        </motion.p>

        <motion.h2
          id="dates-heading"
          whileInView={{ opacity: [0, 1], y: [24, 0] }}
          viewport={vp}
          transition={{ ...t, delay: 0.05 }}
          className="font-bold text-white text-[30px] md:text-[56px] tracking-[-2px] uppercase leading-none mb-12 md:mb-16"
        >
          Two Sessions.<br className="hidden md:block" /> One Summer.
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
          {sessions.map((s, i) => {
            const [month, ...rest] = s.dates.split(' ')
            const dateRange = rest.join(' ')

            return (
              <motion.div
                key={s.name}
                whileInView={{ opacity: [0, 1], y: [32, 0] }}
                viewport={vp}
                transition={{ ...t, delay: 0.1 + i * 0.1 }}
                className="border border-white/20 p-8 md:p-10 flex flex-col gap-6 hover:border-[#63AC23] transition-colors duration-300"
              >
                {/* Session número */}
                <span className="font-bold text-[#63AC23] text-[11px] tracking-[2.2px] uppercase">
                  Session {i + 1}
                </span>

                {/* Fecha grande */}
                <div>
                  <p className="font-bold text-white/40 text-[13px] tracking-[1.3px] uppercase mb-1">
                    {month}
                  </p>
                  <p className="font-bold text-white text-[28px] md:text-[36px] tracking-[-1px] leading-none uppercase">
                    {dateRange}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/15" />

                {/* Info */}
                <div className="space-y-2 text-[15px]">
                  <p className="text-white font-semibold">{s.name}</p>
                  <p className="text-white/60 whitespace-pre-line text-[14px] leading-[22px]">
                    {s.address}
                  </p>
                  <p className="text-white/60 text-[14px]">{schedule}</p>
                </div>

                {/* Per-session CTA */}
                <a
                  href={s.register_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block bg-[#63AC23] text-white text-center px-6 py-3 font-bold text-[12px] tracking-[2.4px] uppercase hover:bg-[#4d8a18] transition-colors"
                >
                  Register
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Investment */}
        <motion.div
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          viewport={vp}
          transition={{ ...t, delay: 0.3 }}
          className="border-t border-white/15 pt-8"
        >
          <p className="text-white/50 text-[12px] tracking-[1.2px] uppercase mb-1">Investment</p>
          <p className="font-bold text-white text-[24px] tracking-[-0.5px]">{pricePerWeek}</p>
        </motion.div>

      </div>
    </section>
  )
}
