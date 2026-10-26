import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { RecreationalData } from '../types'

export function RecreationalFaq({ section }: { section: RecreationalData['faq'] }) {
  const [open, setOpen] = useState<number | null>(0)

  // Sin preguntas no hay sección.
  if (section.items.length === 0) return null

  return (
    <section className="p-6 md:px-12 lg:p-20 bg-[#f5f5f5]" aria-labelledby="recreational-faq-heading">
      <div className="max-w-screen-lg mx-auto">
        <h2
          id="recreational-faq-heading"
          className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase mb-8 md:mb-10"
        >
          {section.title}
        </h2>

        <div className="bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-6 md:px-10 max-w-[1000px]">
          {section.items.map(({ question: q, answer: a }, i) => (
            <div key={i} className={i > 0 ? 'border-t border-black/10' : ''}>
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

        {section.blogLabel && (
          <p className="mt-7 text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
            {section.blogLead}{' '}
            <Link to="/team/blog" className="text-secondary font-semibold hover:text-primary transition-colors">
              {section.blogLabel}
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
