import heroImage from '/images/programs/download.webp'
import { motion } from 'motion/react'
import type { FreeTryHeroContent } from '../types'

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

const t = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const vp = { once: true }

interface Props {
  hero: FreeTryHeroContent
}

export function FreeTryHero({ hero }: Props) {
  // Sin imagen propia en base, se usa la del bundle.
  const src = hero.image || heroImage
  return (
    <section className="bg-white" aria-label="Free Try hero">
      <div className="p-6 pt-10 md:p-12 md:px-20 md:pt-16">
        <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[50vh] rounded-3xl overflow-hidden max-w-screen-xl mx-auto">
          <img
            src={src}
            alt="Artistic swimming coach training kids poolside"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = HERO_FALLBACK
            }}
          />
        </div>
      </div>

      <motion.div
        whileInView={{ opacity: [0, 1], y: [40, 0] }}
        viewport={vp}
        transition={t}
        className="max-w-screen-md mx-auto text-center px-6 md:px-12 pb-16 md:pb-24 space-y-6"
      >
        <div className="bg-primary/15 inline-block rounded-full px-5 py-2">
          <span className="font-bold text-primary text-[12px] tracking-[2.2px] uppercase">
            {hero.badge}
          </span>
        </div>
        <h1 className="font-medium text-secondary text-[38px] md:text-[64px] tracking-[-1.8px] leading-[1.08] text-balance">
          {hero.title}
        </h1>
        <p className="text-[#737373] text-[18px] leading-[30px]">
          {hero.description}
        </p>
        <div className="pt-4 flex flex-col items-center gap-4">
          <a
            href={hero.ctaUrl}
            target="_blank"
            rel="noopener"
            className="inline-block bg-secondary text-white rounded-full px-12 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-secondary/90 transition-colors"
          >
            {hero.ctaLabel}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
