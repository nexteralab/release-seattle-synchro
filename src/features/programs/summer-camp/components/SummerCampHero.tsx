import heroImage from '/images/hero_summer.webp'
import { motion } from 'motion/react'

const t = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const vp = { once: true }

const HERO_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

// La imagen va contenida como en FreeTryHero — con margen, esquinas redondeadas
// y sin ocupar la pantalla entera — pero el texto sigue dentro de la imagen y
// centrado, no debajo.
export function SummerCampHero() {
  return (
    <section className="bg-white" aria-label="Summer Camp hero">
      <div className="p-6 pt-10 md:p-12 md:px-20 md:pt-16">
        <div className="relative w-full h-[42vh] md:h-[58vh] rounded-3xl overflow-hidden max-w-screen-xl mx-auto">
          <img
            src={heroImage}
            alt="Artistic swimming coach training kids poolside"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = HERO_IMAGE_FALLBACK
            }}
          />

          {/* El degradado existe para que el texto blanco se lea sobre la foto. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A67]/40 via-[#0A0A67]/40 to-[#0A0A67]/50" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 md:px-12 gap-5 md:gap-8">
            <div className="bg-primary rounded-full inline-block px-3 py-1">
              <span className="font-bold text-[#f5f5f5] text-[12px] tracking-[1.2px] uppercase">
                Limited Spots Available
              </span>
            </div>

            {/* H1 — objetivo SEO principal de esta página */}
            <header className="relative font-bold tracking-[-4.8px] leading-none flex flex-col items-center">
              <motion.p
                whileInView={{ opacity: [0, 1], x: [-40, 0] }}
                viewport={vp}
                transition={t}
                className="text-[20px] md:text-[30px] tracking-[1.2px]"
              >
                Artistic Swimming
              </motion.p>
              <motion.h1
                whileInView={{ opacity: [0, 1], x: [-40, 0] }}
                viewport={vp}
                transition={{ ...t, delay: 0.05 }}
                className="text-[46px] md:text-[80px] leading-none uppercase"
              >
                Summer Camp
              </motion.h1>
              <motion.p
                whileInView={{ opacity: [0, 1], x: [-40, 0] }}
                viewport={vp}
                transition={{ ...t, delay: 0.1 }}
                className="text-[20px] md:text-[30px] tracking-[1.2px]"
              >
                for kids in Washington
              </motion.p>
            </header>

            <a
              href="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
              target="_blank"
              rel="noopener"
              className="inline-block bg-white text-secondary rounded-full px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:text-primary border border-secondary hover:border-primary transition-colors"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
