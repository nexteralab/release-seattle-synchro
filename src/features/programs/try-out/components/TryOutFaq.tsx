import { useState } from 'react'
import { motion } from 'motion/react'
import faqImage from '/images/programs/try-out/frequently.webp'

const vp = { once: true, margin: '-40px' }

const FAQS: [string, string][] = [
  [
    'Is the tryout the same as signing up for the team?',
    "No. The tryout is a separate event that you register for and attend. It is how our coaches determine your athlete's level. Team enrollment happens afterward, once her placement is confirmed.",
  ],
  ['How much does the tryout cost?', 'Nothing. Tryouts are free to attend.'],
  [
    'Do I have to register in advance?',
    'Yes, please register beforehand so our coaches know how many swimmers to expect. There is no fee and no limit on spots.',
  ],
  [
    'When do we find out her level?',
    'The same day. Coaches share the level placement with you at the pool right after the session, so you leave knowing where she stands.',
  ],
  ['Can parents watch?', 'Yes. Parents are welcome to stay on the pool deck during the tryout.'],
  [
    'Does she need previous artistic swimming experience?',
    'No. The tryout evaluates swimming ability only. Everything specific to artistic swimming is taught once she joins the team.',
  ],
  [
    'What if my daughter does not meet all the requirements?',
    'She has two good options. Our Summer Camp welcomes swimmers with no prior experience, and our recreational programs are non competitive classes where she can build the skills she needs. Many athletes take one of those paths and try out later.',
  ],
  [
    'Where are tryouts held?',
    'At Triangle Pool, 1919 108th Ave SE, Bellevue, WA. We welcome families from across the Eastside and Seattle, including Kirkland, Redmond, Issaquah, Sammamish, Mercer Island and Newcastle.',
  ],
  [
    'How often are tryouts held?',
    'Several times a year. Check the dates above, and if none of them work, contact us and we will let you know when the next one is scheduled.',
  ],
]

export function TryOutFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-labelledby="tryout-faq-heading">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 md:gap-16 items-start">
        <div>
          <motion.h2
            id="tryout-faq-heading"
            whileInView={{ opacity: [0, 1], x: [-40, 0] }}
            viewport={vp}
            transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
            className="font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase mb-10"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="border-t border-black/10">
            {FAQS.map(([q, a], i) => (
              <div key={q} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpen((current) => (current === i ? null : i))}
                  aria-expanded={open === i}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-semibold text-secondary text-[16px] md:text-[17px] leading-[26px]">
                    {q}
                  </span>
                  <span className="shrink-0 text-[#6FBE44] text-[22px] leading-none">
                    {open === i ? '−' : '+'}
                  </span>
                </button>
                {open === i ? (
                  <p className="pb-7 max-w-2xl text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
                    {a}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full h-[280px] lg:h-[420px] rounded-3xl overflow-hidden">
          <img
            src={faqImage}
            alt="Team training session"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
