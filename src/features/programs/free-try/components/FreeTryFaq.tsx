import { useState } from 'react'

const FAQS: [string, string][] = [
  [
    'Does my child need swimming experience to try artistic swimming?',
    'Yes, some. Swimmers must be able to complete one full lap of front crawl and one lap of breaststroke on their own, without stopping or holding the wall. Beyond that, no artistic swimming experience is needed at all, the trial is built for complete beginners to the sport.',
  ],
  [
    'How much does the free trial cost?',
    'Nothing. The trial session is completely free and there is no obligation to enroll afterwards. We do not ask for payment details to reserve a spot.',
  ],
  [
    'What ages is the trial for?',
    'Our trial sessions are designed for swimmers aged 7 to 11. If your child is outside that range and interested in artistic swimming, contact us and we can point you to the right program.',
  ],
  [
    'What is artistic swimming, exactly?',
    'Artistic swimming, formerly called synchronized swimming, combines swimming, dance and gymnastics into one sport. Athletes perform choreographed routines in the water, often upside down and without touching the bottom. It builds remarkable breath control, core strength, flexibility and teamwork.',
  ],
  [
    'Can I stay and watch?',
    'Yes, and we encourage it. There is spectator seating on deck. It is the best way to see whether the sport clicks for your child and to ask our coaches questions afterwards.',
  ],
  [
    'What happens after the trial?',
    'If your swimmer loves it, our coaches will recommend which program fits, whether Beginner, Recreational or Competitive, based on what they saw in the water. There is no pressure and no sales pitch.',
  ],
  [
    'What if the trial date does not work for us?',
    'Get in touch and we will let you know as soon as the next date is scheduled, or arrange for your swimmer to observe a regular practice in the meantime.',
  ],
  [
    'Is artistic swimming safe for kids?',
    'Yes. Every session is run by certified coaches with lifeguard coverage on deck, and the swimming prerequisite exists precisely so that every participant is comfortable and safe in the water.',
  ],
]

export function FreeTryFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-labelledby="freetry-faq-heading">
      <div className="max-w-screen-lg mx-auto">
        <h2
          id="freetry-faq-heading"
          className="font-bold text-secondary text-[30px] md:text-[48px] tracking-[-2.4px] uppercase mb-8 md:mb-10"
        >
          Frequently Asked Questions
        </h2>

        <div className="bg-white rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-6 md:px-10">
          {FAQS.map(([q, a], i) => (
            <div key={q} className={i > 0 ? 'border-t border-black/10' : ''}>
              <button
                type="button"
                onClick={() => setOpen((current) => (current === i ? null : i))}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-semibold text-secondary text-[16px] md:text-[17px] leading-[26px]">
                  {q}
                </span>
                <span className="shrink-0 size-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[18px] leading-none">
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
    </section>
  )
}
