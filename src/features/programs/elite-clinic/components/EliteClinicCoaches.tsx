import { motion } from 'motion/react'
import type { EliteClinicData } from '../types'

const transition = { duration: 0.35, ease: [0.35, 0.85, 0.25, 1] as [number, number, number, number] }
const viewport = { once: true, margin: '-60px' }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition },
}

interface Props {
  data: EliteClinicData
}

export function EliteClinicCoaches({ data }: Props) {
  const headCoaches = data.coaches.filter((c) => c.role.toLowerCase().includes('head'))
  const assistantCoaches = data.coaches.filter((c) => !c.role.toLowerCase().includes('head'))

  return (
    <section
      className="p-6 md:p-12 md:px-20 md:py-24 bg-white"
      aria-labelledby="elite-clinic-coaches-heading"
    >
      <div className="max-w-screen-lg mx-auto">
        <motion.h2
          id="elite-clinic-coaches-heading"
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={viewport}
          transition={transition}
          className="font-bold text-secondary text-[30px] md:text-[48px] tracking-[-2.4px] uppercase mb-3"
        >
          Coaching Staff
        </motion.h2>
        <motion.p
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={viewport}
          transition={{ ...transition, delay: 0.05 }}
          className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-12"
        >
          Top-level coaches from around the world
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {headCoaches.map((coach) => (
            <CoachCard key={coach.name} name={coach.name} role={coach.role} primary />
          ))}
        </motion.div>

        {assistantCoaches.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="mt-10"
          >
            <p className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-5">
              Assistant Coaches
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assistantCoaches.map((coach) => (
                <motion.div
                  key={coach.name}
                  variants={itemVariants}
                  className="flex items-center gap-3 bg-secondary px-5 py-3 rounded-sm"
                >
                  <span className="text-white text-[18px]" aria-hidden="true">
                    ›
                  </span>
                  <span className="font-bold text-white text-[15px] md:text-[16px]">
                    {coach.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function CoachCard({
  name,
  role,
  primary = false,
}: {
  name: string
  role: string
  primary?: boolean
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={
        primary
          ? 'bg-secondary p-6 md:p-8 rounded-sm'
          : 'bg-white p-6 md:p-8 rounded-sm'
      }
    >
      <p
        className={
          primary
            ? 'font-bold text-white text-[11px] tracking-[1.6px] uppercase mb-2'
            : 'font-bold text-secondary text-[11px] tracking-[1.6px] uppercase mb-2'
        }
        style={primary ? { color: 'white' } : {}}
      >
        {role}
      </p>
      <p
        className={
          primary
            ? 'font-bold text-white text-[22px] md:text-[28px] tracking-[-0.8px]'
            : 'font-bold text-secondary text-[22px] md:text-[28px] tracking-[-0.8px]'
        }
      >
        {name}
      </p>
    </motion.div>
  )
}
