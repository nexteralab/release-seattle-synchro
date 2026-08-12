import { motion } from 'motion/react'

const vp = { once: true, margin: '-40px' }

const SWIMMING_SKILLS = [
  '4 laps of crawl',
  '4 laps of breaststroke (with the appropriate kick)',
  '4 laps of backstroke',
  '1 lap of butterfly',
]

const WATER_SKILLS = [
  'Must be able to independently float on back for 30 seconds',
  'Must be able to tread water for 30 seconds',
  'Must be able to follow instructions',
]

export function TryOutRequirements() {
  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="tryout-requirements-heading">
      <div className="max-w-screen-lg mx-auto">
        <motion.h2
          id="tryout-requirements-heading"
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={vp}
          transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
          className="font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase"
        >
          Tryout Requirements
        </motion.h2>
        <p className="mt-5 text-[#737373] text-[15px] md:text-[17px] leading-[28px]">
          To be evaluated, your athlete must be able to complete the following.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <SkillList title="Swimming Skills" items={SWIMMING_SKILLS} />
          <SkillList title="Water Skills" items={WATER_SKILLS} />
        </div>
      </div>
    </section>
  )
}

function SkillList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold text-secondary text-[13px] md:text-[14px] tracking-[1.4px] uppercase pb-3 border-b-2 border-secondary">
        {title}
      </h3>
      <ul className="mt-6 space-y-5">
        {items.map((item, i) => (
          <motion.li
            key={item}
            whileInView={{ opacity: [0, 1], x: [-16, 0] }}
            viewport={vp}
            transition={{ duration: 0.3, ease: [0.35, 0.85, 0.25, 1], delay: i * 0.06 }}
            className="flex gap-3 items-start"
          >
            <span
              className="shrink-0 mt-0.5 size-[22px] rounded-full bg-[#6FBE44]/[0.18] text-[#5AA836] flex items-center justify-center font-bold text-[13px]"
              aria-hidden="true"
            >
              +
            </span>
            <span className="text-secondary text-[15px] md:text-[17px] leading-[26px] font-medium">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
