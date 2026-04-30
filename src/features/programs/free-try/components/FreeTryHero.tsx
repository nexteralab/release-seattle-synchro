import heroImage from '/images/image_free_try.webp'
import { motion } from 'motion/react'

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

const t = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const vp = { once: true }


export function FreeTryHero() {
  return (
    <section
      className="relative md:h-screen h-[50vh] flex items-center justify-center overflow-hidden"
      aria-label="Free Try hero"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Artistic swimming coach training kids poolside"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = HERO_FALLBACK
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <motion.div
        whileInView={{ opacity: [0, 1], x: [-40, 0] }}
        viewport={vp}
        transition={t}
        className="relative z-10 text-center text-white px-12 md:px-48 space-y-6 md:space-y-10"
      >
        <div className="bg-primary inline-block px-3 py-1">
          <span className="font-bold text-[#f5f5f5] text-[12px] tracking-[1.2px] uppercase">
            open house
          </span>
        </div>
        <h1 className="font-bold text-[50px] md:text-[96px] tracking-[-1px] md:tracking-[-3.2px] uppercase leading-none">
          free try<br />2026
        </h1>
        <a
          href="https://www.gomotionapp.com/team/zzssst/controller/cms/admin/index#/classreg-shopping"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-secondary px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:text-primary border border-secondary hover:border-primary transition-colors"
        >
          Sign Up For Free
        </a>
      </motion.div>
    </section>
  )
}
