import type { CampDetails, CampSession } from '../types'
import { motion } from 'motion/react'

const transition = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const viewport = { once: true, margin: '-60px' }

interface Props {
  body: string
  details: CampDetails
  sessions: CampSession[]
}

export function SummerCampOverview({ body, details, sessions }: Props) {
  const paragraphs = body.split(/\n\s*\n/).filter(Boolean)

  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white peer-[.header-fixed]/header:mt-16" aria-labelledby="overview-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2
              id="overview-heading"
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={viewport}
              transition={transition}
              className="font-bold text-secondary text-[30px] md:text-[48px] tracking-[-2.4px] uppercase mb-4 md:mb-8"
            >
              About the Camp
            </motion.h2>
            <motion.div
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={viewport}
              transition={{ ...transition, delay: 0.1 }}
              className="space-y-6 text-[#171717] text-[16px] md:text-[18px] leading-[29px]"
            >
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">{p}</p>
              ))}
            </motion.div>
          </div>

          <div className="bg-[#f5f5f5] p-6 md:p-12">
            <motion.h3
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={viewport}
              transition={transition}
              className="font-bold text-secondary text-[24px] tracking-[-1.2px] uppercase mb-8"
            >
              Camp Details
            </motion.h3>
            <div className="space-y-6">
              <DetailItem label="Ages" value={details.ages} />
              <DetailItem label="Skill Level" value={details.skill_level} />
              <DetailItem label="Daily Schedule" value={details.schedule} />

              <motion.div
                whileInView={{ opacity: [0, 1], x: [-40, 0] }}
                viewport={viewport}
                transition={{ ...transition, delay: 0.2 }}
              >
                <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                  Locations
                </h4>
                <div className="space-y-4">
                  {sessions.map((s) => (
                    <div key={s.name}>
                      <p className="font-bold text-secondary mb-1 text-[16px]">
                        {s.name}
                      </p>
                      <p className="text-[#737373] text-[16px]">
                        Dates: {s.dates}
                      </p>
                      <p className="text-[#737373] text-[16px] whitespace-pre-line">
                        {s.address}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
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
