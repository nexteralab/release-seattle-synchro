import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const FAQS: [string, string][] = [
  [
    'Is artistic swimming the same as synchronized swimming?',
    'Yes. Artistic swimming is the current official name for the Olympic sport most people still know as synchronized swimming, or sometimes water ballet. We use both terms, it is the same sport.',
  ],
  [
    'Does my child need swim team experience?',
    'No. Many recreational swimmers are trying artistic swimming for the very first time. What she does need are the swimming skills listed above: crawl stroke, breaststroke, backstroke, and comfort floating and swimming on her own.',
  ],
  [
    'Is it safe for beginners?',
    "Yes. Instructors tailor each class to the swimmers' comfort and skill level, and safety always comes first.",
  ],
  [
    'My daughter does gymnastics. Would this be a good fit?',
    'It is one of the best fits there is. Artistic swimming blends swimming, dance and gymnastics, so flexibility, body awareness and rhythm transfer directly. It is also much lower impact than tumbling.',
  ],
  [
    'Does recreational mean not serious?',
    'Not at all. Recreational swimmers learn real skills: body control, breath holding, treading water, and basic synchronized patterns. The difference is the goal. Recreational programs prioritize enjoyment and skill building over competition results.',
  ],
  [
    'Can recreational swimmers move to competitive teams later?',
    'Absolutely. Many competitive synchronized swimmers actually started out in a recreational program before deciding to pursue the sport more seriously. Some kids stick with the recreational track for years simply because they love it. Either path is completely valid.',
  ],
  [
    'Does she need to try out?',
    'No. There is no tryout for our recreational programs. As long as she meets the swimming skills listed above, she can register directly. Tryouts are only for the competitive team.',
  ],
  [
    'What does my child need to bring?',
    'A swimsuit, a swim cap, goggles, nose clips and a towel.',
  ],
]

export function RecreationalFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="p-6 md:px-12 lg:p-20 bg-[#f5f5f5]" aria-labelledby="recreational-faq-heading">
      <div className="max-w-screen-lg mx-auto">
        <h2
          id="recreational-faq-heading"
          className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase mb-8 md:mb-10"
        >
          Common Questions Parents Ask
        </h2>

        <div className="bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-6 md:px-10 max-w-[1000px]">
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

        <p className="mt-7 text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
          Want the full picture?{' '}
          <Link to="/team/blog" className="text-secondary font-semibold hover:text-primary transition-colors">
            Read our blog: What Recreational Artistic Swimming Looks Like →
          </Link>
        </p>
      </div>
    </section>
  )
}
