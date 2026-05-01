import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'

import img1 from '/images/ready_to_join_1.png'
import img2 from '/images/ready_to_join_2.png'
import img3 from '/images/ready_to_join_3.png'
import img4 from '/images/ready_to_join_4.png'

const images = { '1': img1, '2': img2, '3': img3, '4': img4 }

const t = { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
const vp = { once: true, margin: '-60px' }

type Variant = 'primary' | 'secondary'

const btnClass: Record<Variant, string> = {
  primary: 'inline-block bg-white text-secondary px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-white/90 transition-colors hover:text-primary border border-secondary hover:border-primary',
  secondary: 'inline-block bg-transparent border border-white text-white px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase transition-colors hover:text-primary hover:border-primary',
}

interface Props {
  heading: string
  description: string
  linkToContact: string
  linkLabelContact: string
  linkVariantContact?: Variant
  linkToRegister?: string
  linkLabelRegister?: string
  linkRegisterVariant?: Variant
  alt: string
  image: '1' | '2' | '3' | '4'
}

export function CtaBanner({
  heading, description,
  linkToContact, linkLabelContact, linkVariantContact = 'secondary',
  linkToRegister, linkLabelRegister, linkRegisterVariant = 'primary',
  image, alt,
}: Props) {
  return (
    <section
      className="relative px-6 pt-10 pb-[300px] md:px-20 md:pt-24 md:pb-24 bg-[#0A0A67] overflow-hidden min-h-[300px]"
      aria-label={heading}
    >
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-screen-lg mx-auto">
        <motion.h2
          whileInView={{ opacity: [0, 1], y: [40, 0] }}
          viewport={vp}
          transition={t}
          className="font-bold text-white text-[30px] md:text-[48px] tracking-[-2.4px] uppercase"
        >
          {heading}
        </motion.h2>
        <motion.p
          whileInView={{ opacity: [0, 1], y: [40, 0] }}
          viewport={vp}
          transition={{ ...t, delay: 0.1 }}
          className="text-white/80 text-[16px] md:text-[20px] leading-[32px] max-w-2xl"
        >
          {description}
        </motion.p>
        <motion.div
          whileInView={{ opacity: [0, 1], y: [40, 0] }}
          viewport={vp}
          transition={{ ...t, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {linkToRegister && (
              <Link
                to={linkToRegister}
                target="_blank"
                rel="noopener noreferrer"
                className={btnClass[linkRegisterVariant]}
              >
                {linkLabelRegister}
              </Link>
            )}
            <Link
              to={linkToContact}
              className={btnClass[linkVariantContact]}
            >
              {linkLabelContact}
            </Link>
          </div>
        </motion.div>
      </div>
      <img
        src={images[image]}
        alt={alt}
        aria-hidden="true"
        className="block absolute bottom-[-40px] md:bottom-[-120px] left-1/2 -translate-x-1/2 h-[300px] min-w-[200px] max-w-[500px] md:max-w-[1200px] md:h-[500px] md:left-auto md:translate-x-0 md:right-[-80px] object-contain object-bottom pointer-events-none opacity-60 md:opacity-70"
      />
    </section>
  )
}
