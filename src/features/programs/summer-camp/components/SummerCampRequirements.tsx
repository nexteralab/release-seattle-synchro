import type { CampRequirement } from '../types'
import { motion } from 'motion/react'

const vp = { once: true, margin: '-40px' }

interface Props {
  requirements: CampRequirement[]
}

export function SummerCampRequirements({ requirements }: Props) {
  const half = Math.ceil(requirements.length / 2)
  const left = requirements.slice(0, half)
  const right = requirements.slice(half)

  return (
    <section
      className="p-6 md:p-12 md:px-20 md:py-24 bg-[#f5f5f5]"
      aria-labelledby="requirements-heading"
    >
      <div className="max-w-screen-lg mx-auto">
        <motion.h2
          id="requirements-heading"
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={vp}
          transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
          className="font-bold text-[#0A0A67] text-[30px] md:text-[48px] tracking-[-2.4px] uppercase mb-12"
        >
          What Do You Need?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RequirementList items={left} />
          <RequirementList items={right} />
        </div>
      </div>
    </section>
  )
}

function RequirementList({ items }: { items: CampRequirement[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          whileInView={{ opacity: [0, 1], x: [-24, 0] }}
          viewport={vp}
          transition={{ duration: 0.3, ease: [0.35, 0.85, 0.25, 1], delay: i * 0.07 }}
          className="flex gap-4"
        >
          <div
            className="bg-primary text-white size-6 md:size-8 shrink-0 flex items-center justify-center font-bold"
            aria-hidden="true"
          >
            ✓
          </div>
          <div>
            <h3 className="font-bold text-[#171717] text-[16px] md:text-[18px] mb-1">
              {item.name}
            </h3>
            {item.note && item.link ? (
              <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                {item.note}{' '}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#0A0A67] transition-colors"
                >
                  View on Amazon
                </a>
              </p>
            ) : item.note ? (
              <p className="text-[#737373] text-[16px] leading-[26px]">
                {item.note}
              </p>
            ) : null}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
