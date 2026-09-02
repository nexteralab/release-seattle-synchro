import { useState } from 'react'
import type { FreeTryFaqItem } from '../types'

interface Props {
  faqs: FreeTryFaqItem[]
}

export function FreeTryFaq({ faqs }: Props) {
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

        <div className="bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-6 md:px-10">
          {faqs.map(({ question, answer }, i) => (
            <div key={question} className={i > 0 ? 'border-t border-black/10' : ''}>
              <button
                type="button"
                onClick={() => setOpen((current) => (current === i ? null : i))}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-semibold text-secondary text-[16px] md:text-[17px] leading-[26px]">
                  {question}
                </span>
                <span className="shrink-0 size-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[18px] leading-none">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i ? (
                <p className="pb-7 max-w-2xl text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
                  {answer}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
