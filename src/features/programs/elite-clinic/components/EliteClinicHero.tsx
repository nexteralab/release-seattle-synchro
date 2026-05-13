import { motion } from 'motion/react'
import type { EliteClinicData } from '../types'
import img1 from '/images/elite-clinc.webp'

// Reemplazar esta imagen cuando esté el asset definitivo.

const t = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const vp = { once: true }

interface Props {
  data: EliteClinicData
}

export function EliteClinicHero({ data }: Props) {
  return (
    <section
      className="relative md:h-screen h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Elite Clinic hero"
    >
      <div className="absolute inset-0">
        <img
          src={img1}
          alt="Elite Clinic 2026"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A67]/40 via-[#0A0A67]/40 to-[#0A0A67]/50" />

      <div className="relative z-10 text-center text-white px-12 md:px-48 space-y-8 max-w-5xl">
        <motion.div
          whileInView={{ opacity: [0, 1], y: [-10, 0] }}
          viewport={vp}
          transition={t}
          className="inline-block bg-[#a3e635] text-[#0A0A67] px-4 py-1.5"
        >
          <span className="font-bold text-[12px] md:text-[14px] tracking-[2px] uppercase">
            International · Limited Spots Available
          </span>
        </motion.div>

        <header className="relative font-bold uppercase leading-none flex flex-col items-center gap-2">
          <motion.p
            whileInView={{ opacity: [0, 1], x: [-40, 0] }}
            viewport={vp}
            transition={t}
            className="text-[16px] md:text-[30px] tracking-[2px]"
          >
            Artistic Swimming
          </motion.p>
          <motion.h1
            whileInView={{ opacity: [0, 1], x: [-40, 0] }}
            viewport={vp}
            transition={{ ...t, delay: 0.05 }}
            className="text-[50px] md:text-[90px] tracking-[-4.8px] leading-none text-[#a3e635]"
          >
            {data.title}
          </motion.h1>
          <motion.p
            whileInView={{ opacity: [0, 1], x: [-40, 0] }}
            viewport={vp}
            transition={{ ...t, delay: 0.1 }}
            className="text-[14px] md:text-[20px] tracking-[1.6px] uppercase opacity-90 mt-2"
          >
            {data.subtitle}
          </motion.p>
        </header>

        <motion.div
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          viewport={vp}
          transition={{ ...t, delay: 0.15 }}
          className="inline-flex flex-col items-center gap-2 bg-[#a3e635]/15 border border-[#a3e635]/40 backdrop-blur-sm px-6 md:px-10 py-4 md:py-5 rounded-sm"
        >
          <p className="font-bold text-white text-[18px] md:text-[24px] tracking-[-0.4px]">
            {data.dates} · {data.time}
          </p>
          <p className="text-white/80 text-[13px] md:text-[15px]">
            📍 {data.location.venue} · {data.location.city}
          </p>
          <p className="text-white/70 text-[12px] md:text-[13px] uppercase tracking-[1.4px]">
            *Minimum: {data.minimumLevel}*
          </p>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          viewport={vp}
          transition={{ ...t, delay: 0.2 }}
        >
          <a
            href="https://www.seattlesynchrosst.com/page/system/classreg-shopping?classId=492122&subProgId=35900"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-secondary px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:text-primary border border-secondary hover:border-primary transition-colors"
          >
            Register Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}
