import heroImage from '/images/image_free_try.webp'
import { motion } from 'motion/react'

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

const t = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const vp = { once: true }

interface Props {
  nameProgram: string
  description: string
  date: string
  time: string
  linkToRegister: string
  linkLabelRegister: string
}

export function FreeTryHero({ nameProgram, description, date, time, linkToRegister, linkLabelRegister }: Props) {
  return (
    <section className="bg-white" aria-label="Free Try hero">
      <div className="p-6 pt-10 md:p-12 md:px-20 md:pt-16">
        <div className="relative w-full h-[42vh] md:h-[58vh] rounded-lg overflow-hidden max-w-screen-xl mx-auto">
          <img
            src={heroImage}
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
        <div className="bg-primary/15 inline-block px-5 py-2">
          <span className="font-bold text-primary text-[12px] tracking-[2.2px] uppercase">
            Open House
          </span>
        </div>
        <h1 className="font-bold text-secondary text-[38px] md:text-[64px] tracking-[-1.8px] uppercase leading-[1.08]">
          {nameProgram}
        </h1>
        <p className="text-[#737373] text-[18px] leading-[30px]">
          {description}
        </p>
        <div className="pt-4 flex flex-col items-center gap-4">
          <a
            href={linkToRegister}
            target="_blank"
            rel="noopener"
            className="inline-block bg-secondary text-white px-12 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-secondary/90 transition-colors"
          >
            {linkLabelRegister}
          </a>
          <p className="text-[#a1a1a1] text-[14px] font-medium tracking-[0.4px]">
            Next free trial: {date} · {time}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
