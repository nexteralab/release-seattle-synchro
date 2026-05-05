import heroImage from '/images/summer_camp.png'
import { motion } from 'motion/react'

const t = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const vp = { once: true }

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

export function SummerCampHero() {
  return (
    <section
      className="relative md:h-screen h-[50vh] flex items-center justify-center overflow-hidden"
      aria-label="Summer Camp hero"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Artistic swimming coach training kids poolside"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = HERO_IMAGE
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 text-center text-white px-12 md:px-48 space-y-10">
        <div className="bg-primary inline-block px-3 py-1">
          <span className="font-bold text-[#f5f5f5] text-[12px] tracking-[1.2px] uppercase">
            Limited Spots Available
          </span>
        </div>

        {/* H1 — primary SEO target for this page */}
        <header className="relative font-bold tracking-[-4.8px] uppercase leading-none flex flex-col items-center">
          <div className="relative z-10 flex flex-col items-center">
            <motion.p
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={vp}
              transition={t}
              className="text-[20px] md:text-[50px] tracking-[1.2px] uppercase"
            >
              Artistic Swimming
            </motion.p>
            <motion.h1
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={vp}
              transition={{ ...t, delay: 0.05 }}
              className="text-[50px] md:text-[96px] uppercase leading-none"
            >
              Summer Camp
            </motion.h1>
            <motion.p
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={vp}
              transition={{ ...t, delay: 0.1 }}
              className="text-[20px] md:text-[50px] tracking-[1.2px] uppercase"
            >
              for kids in Washington
            </motion.p>
          </div>
        </header>

        <a
          href="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-secondary px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:text-primary border border-secondary hover:border-primary transition-colors"
        >
          Register Now
        </a>
      </div>
    </section>
  )
}
