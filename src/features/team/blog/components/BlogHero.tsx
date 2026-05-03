import { motion } from 'motion/react'

const vp = { once: true, margin: '-60px' } as const

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export function BlogHero() {
  return (
    <section className="relative bg-[#030213] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A67]/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 px-12 md:px-48 max-w-screen-2xl mx-auto py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-['Space_Grotesk',sans-serif] font-bold text-white/40 text-[12px] tracking-[3px] uppercase mb-4"
          >
            Seattle Synchro
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-['Space_Grotesk',sans-serif] font-bold text-white text-[48px] md:text-[72px] tracking-[-2px] uppercase leading-[1.05] mb-6"
          >
            Stories &<br />Updates
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-['Inter',sans-serif] text-white/60 text-[16px] md:text-[18px] leading-[1.7] max-w-xl"
          >
            News, training insights and stories from the Seattle Synchro community.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
