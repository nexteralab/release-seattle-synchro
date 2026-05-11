import { motion } from 'motion/react'
import { Sparkles, TrendingUp, Tag } from 'lucide-react'
import type { EliteClinicData } from '../types'

const transition = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const viewport = { once: true, margin: '-60px' }

interface Props {
  data: EliteClinicData
}

export function EliteClinicOverview({ data }: Props) {
  return (
    <section
      className="p-6 md:p-12 md:px-20 md:py-24 bg-white"
      aria-labelledby="elite-clinic-overview-heading"
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: description */}
          <div>
            <motion.h2
              id="elite-clinic-overview-heading"
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={viewport}
              transition={transition}
              className="font-bold text-secondary text-[30px] md:text-[48px] tracking-[-2.4px] uppercase mb-4"
            >
              About the Clinic
            </motion.h2>
            <motion.p
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={viewport}
              transition={{ ...transition, delay: 0.1 }}
              className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-6"
            >
              Led by Top-Level Coaches
            </motion.p>
            <motion.p
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={viewport}
              transition={{ ...transition, delay: 0.15 }}
              className="text-[#171717] text-[16px] md:text-[18px] leading-[29px] mb-8"
            >
              {data.description}
            </motion.p>

            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              viewport={viewport}
              transition={{ ...transition, delay: 0.2 }}
              className="grid grid-cols-1 gap-4"
            >
              <Objective icon={<Sparkles size={16} />} text={data.objectives[0]} />
              <Objective icon={<TrendingUp size={16} />} text={data.objectives[1]} />
              <Objective icon={<Tag size={16} />} text={data.objectives[2]} />
            </motion.div>
          </div>

          {/* Right: pricing */}
          <motion.div
            whileInView={{ opacity: [0, 1], x: [40, 0] }}
            viewport={viewport}
            transition={{ ...transition, delay: 0.1 }}
            className="bg-[#0A0A67] text-white p-6 md:p-10 rounded-sm space-y-6"
          >
            <div>
              <p className="font-bold text-[#a3e635] text-[12px] tracking-[1.6px] uppercase mb-3">
                Pricing
              </p>
              <p className="font-bold text-white text-[40px] md:text-[56px] tracking-[-2px] leading-none">
                {data.pricing.basePrice}
              </p>
              <p className="text-white/60 text-[14px] mt-1">per athlete</p>
            </div>

            <div className="h-px bg-white/15" />

            <div className="space-y-4">
              <p className="font-bold text-white text-[14px] tracking-[1.4px] uppercase">
                Available Discounts
              </p>
              <DiscountRow
                badge="12% OFF"
                title="Early Bird"
                description={data.pricing.earlyBird}
                accent="#a3e635"
              />
              <DiscountRow
                badge="10% OFF"
                title="Before June 1st"
                description={data.pricing.standardDiscount}
                accent="white"
              />
            </div>

            <div className="pt-2">
              <a
                href={data.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#a3e635] text-[#0A0A67] px-6 py-3.5 font-bold text-[13px] tracking-[2px] uppercase hover:bg-white transition-colors"
              >
                Secure Your Spot
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function Objective({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-[#f5f5f5] px-4 py-3 rounded-sm">
      <span className="text-secondary shrink-0">{icon}</span>
      <span className="text-secondary text-[14px] md:text-[15px] font-medium">{text}</span>
    </div>
  )
}

function DiscountRow({
  badge,
  title,
  description,
  accent,
}: {
  badge: string
  title: string
  description: string
  accent: '#a3e635' | 'white'
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="shrink-0 inline-block px-2.5 py-1 font-bold text-[11px] tracking-[1.2px] uppercase rounded-sm"
        style={{
          background: accent === '#a3e635' ? '#a3e635' : 'rgba(255,255,255,0.12)',
          color: accent === '#a3e635' ? '#0A0A67' : 'white',
        }}
      >
        {badge}
      </span>
      <div className="flex-1">
        <p className="font-bold text-white text-[14px] mb-0.5">{title}</p>
        <p className="text-white/70 text-[13px] leading-[20px]">{description}</p>
      </div>
    </div>
  )
}
