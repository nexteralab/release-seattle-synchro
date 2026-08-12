import { motion } from 'motion/react'

const vp = { once: true, margin: '-40px' }

const STEPS = [
  {
    title: 'Register for a Tryout',
    body: 'Pick a date below and sign up online. There is no cost and no cap on spots, but we do ask that you register beforehand.',
  },
  {
    title: 'Attend and Be Evaluated',
    body: 'A short session in the water. Coaches assess the swimming and water skills listed further down this page.',
  },
  {
    title: 'Get Her Level the Same Day',
    body: "No waiting on an email. Coaches share your athlete's level placement with you at the pool, right after the session.",
  },
]

export function TryOutSteps() {
  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-labelledby="tryout-steps-heading">
      <div className="max-w-screen-lg mx-auto">
        <motion.h2
          id="tryout-steps-heading"
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={vp}
          transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
          className="font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase"
        >
          The Tryout Is a Separate Event
        </motion.h2>
        <p className="mt-6 max-w-2xl text-[#737373] text-[15px] md:text-[17px] leading-[28px]">
          Attending a tryout is how your athlete joins the team. It is a short evaluation session
          where our coaches determine her level. Registering for the tryout is not the same as
          enrolling in the Novice Team, and you need to register in advance so we know how many
          swimmers to expect.
        </p>

        <div className="mt-8 inline-flex items-center h-11 px-6 border border-[#6FBE44] rounded-full font-bold text-[13px] tracking-[2.2px] uppercase text-[#5AA836]">
          Free to Attend
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              whileInView={{ opacity: [0, 1], y: [24, 0] }}
              viewport={vp}
              transition={{ duration: 0.3, ease: [0.35, 0.85, 0.25, 1], delay: i * 0.08 }}
            >
              <div
                className="size-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[18px]"
                aria-hidden="true"
              >
                {i + 1}
              </div>
              <h3 className="mt-6 font-bold text-secondary text-[15px] tracking-[1.2px] uppercase">
                {step.title}
              </h3>
              <p className="mt-3 text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
