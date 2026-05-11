import { motion } from 'motion/react'
import { Mail, MapPin, Package } from 'lucide-react'
import type { EliteClinicData } from '../types'

const transition = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const viewport = { once: true, margin: '-60px' }

interface Props {
  data: EliteClinicData
}

export function EliteClinicDetails({ data }: Props) {
  return (
    <section
      className="p-6 md:p-12 md:px-20 md:py-24 bg-[#f5f5f5]"
      aria-labelledby="elite-clinic-details-heading"
    >
      <div className="max-w-screen-lg mx-auto space-y-12">
        <motion.h2
          id="elite-clinic-details-heading"
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={viewport}
          transition={transition}
          className="font-bold text-secondary text-[30px] md:text-[48px] tracking-[-2.4px] uppercase"
        >
          Camp Details
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Manager */}
          <motion.div
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            viewport={viewport}
            transition={{ ...transition, delay: 0.1 }}
            className="bg-white p-6 md:p-8 rounded-sm"
          >
            <div className="flex items-center gap-2 text-secondary mb-4">
              <Mail size={16} />
              <p className="font-bold text-[12px] tracking-[1.4px] uppercase">Camp Manager</p>
            </div>
            <p className="font-bold text-secondary text-[16px] md:text-[18px] mb-1">
              {data.manager.name}
            </p>
            <p className="text-[#737373] text-[14px] md:text-[15px] mb-3">
              {data.manager.role}
            </p>
            <a
              href={`mailto:${data.manager.email}`}
              className="text-secondary text-[13px] md:text-[14px] underline underline-offset-2 decoration-secondary/40 hover:decoration-secondary transition-all"
            >
              {data.manager.email}
            </a>
          </motion.div>

          {/* Facilities */}
          <motion.div
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            viewport={viewport}
            transition={{ ...transition, delay: 0.15 }}
            className="bg-white p-6 md:p-8 rounded-sm"
          >
            <div className="flex items-center gap-2 text-secondary mb-4">
              <MapPin size={16} />
              <p className="font-bold text-[12px] tracking-[1.4px] uppercase">Facilities</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-bold text-secondary text-[14px] mb-0.5">Pool</p>
                <p className="text-[#737373] text-[13px] md:text-[14px] leading-[20px]">
                  {data.location.poolAddress}
                </p>
              </div>
              <div>
                <p className="font-bold text-secondary text-[14px] mb-0.5">Special Activities</p>
                <p className="text-[#737373] text-[13px] md:text-[14px] leading-[20px]">
                  {data.location.crossfitAddress}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Packing List */}
          <motion.div
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            viewport={viewport}
            transition={{ ...transition, delay: 0.2 }}
            className="bg-white p-6 md:p-8 rounded-sm"
          >
            <div className="flex items-center gap-2 text-secondary mb-4">
              <Package size={16} />
              <p className="font-bold text-[12px] tracking-[1.4px] uppercase">Packing List</p>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
              {data.packingList.map((item) => (
                <li
                  key={item}
                  className="text-[#737373] text-[13px] md:text-[14px] leading-[20px] flex items-start gap-1.5"
                >
                  <span className="text-secondary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
