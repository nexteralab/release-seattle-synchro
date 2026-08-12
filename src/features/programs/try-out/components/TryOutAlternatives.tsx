import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'

const vp = { once: true, margin: '-40px' }

const ALTERNATIVES = [
  {
    title: 'Summer Camp',
    body: 'No prior experience needed. Kids learn sculling, floating and simple group routines set to music, and the week ends with a low stakes showcase for family and friends.',
    cta: 'Explore Summer Camp',
    to: '/programs/summer-camp',
  },
  {
    title: 'Recreational Programs',
    body: 'Non competitive classes for ages 5 to 10. No judges and no scores, just movement, music and teamwork. Many athletes build their skills here first, then try out.',
    cta: 'See Recreational Programs',
    to: '/programs/recreational',
  },
]

export function TryOutAlternatives() {
  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-labelledby="tryout-alternatives-heading">
      <div className="max-w-screen-lg mx-auto">
        <motion.h2
          id="tryout-alternatives-heading"
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={vp}
          transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
          className="font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase"
        >
          Not Ready for the Tryout?
        </motion.h2>
        <p className="mt-5 max-w-2xl text-[#737373] text-[15px] md:text-[17px] leading-[28px]">
          Every athlete starts somewhere. If your swimmer does not meet the requirements yet,
          these two programs are built exactly for that.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {ALTERNATIVES.map((item, i) => (
            <motion.div
              key={item.title}
              whileInView={{ opacity: [0, 1], y: [16, 0] }}
              viewport={vp}
              transition={{ duration: 0.3, ease: [0.35, 0.85, 0.25, 1], delay: i * 0.08 }}
              className="bg-white border-t-4 border-[#6FBE44] rounded-lg p-6 md:p-8 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-bold text-secondary text-[20px] md:text-[22px] tracking-[-0.4px]">
                {item.title}
              </h3>
              <p className="mt-4 text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
                {item.body}
              </p>
              <Link
                to={item.to}
                className="inline-block mt-6 font-bold text-secondary text-[13px] tracking-[1.4px] uppercase hover:text-[#171717] transition-colors"
              >
                {item.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
