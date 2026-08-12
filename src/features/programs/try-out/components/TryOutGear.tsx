import { motion } from 'motion/react'

const vp = { once: true, margin: '-40px' }

interface GearItem {
  name: string
  note?: string
  link?: string
}

const GEAR: GearItem[] = [
  { name: 'Swim Suit' },
  {
    name: 'Nose Clips',
    note: 'Recommendations',
    link: 'https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW/ref=sr_1_5?th=1',
  },
  { name: 'Swim Cap' },
  { name: 'Towel' },
  { name: 'Goggles' },
]

export function TryOutGear() {
  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-labelledby="tryout-gear-heading">
      <div className="max-w-screen-lg mx-auto">
        <motion.h2
          id="tryout-gear-heading"
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={vp}
          transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
          className="font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase mb-12"
        >
          What Do You Need?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GEAR.map((item, i) => (
            <motion.div
              key={item.name}
              whileInView={{ opacity: [0, 1], y: [16, 0] }}
              viewport={vp}
              transition={{ duration: 0.3, ease: [0.35, 0.85, 0.25, 1], delay: i * 0.06 }}
              className="flex gap-4 items-center bg-white border border-black/[0.08] rounded-lg p-5 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="bg-[#6FBE44] text-white size-7 shrink-0 rounded-full flex items-center justify-center font-bold"
                aria-hidden="true"
              >
                ✓
              </div>
              <div>
                <h3 className="font-bold text-secondary text-[16px] md:text-[18px]">{item.name}</h3>
                {item.note && item.link ? (
                  <p className="text-[#737373] text-[14px] md:text-[15px] leading-[24px]">
                    {item.note}{' '}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener"
                      className="underline hover:text-primary transition-colors"
                    >
                      View on Amazon
                    </a>
                  </p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
