import classImage from '/images/program_2.jpg'
import type { RecreationalData } from '../types'
import { LeadText } from './LeadText'

export function RecreationalClassLook({ section }: { section: RecreationalData['classLook'] }) {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="class-look-heading">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2
            id="class-look-heading"
            className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
          >
            {section.title}
          </h2>

          <div className="mt-6 flex gap-2 flex-wrap">
            {section.pills.map((pill, i) => (
              <span
                key={i}
                className="inline-flex items-center h-9 px-4 rounded-full bg-primary/15 text-primary font-bold text-[12px] tracking-[1.4px] uppercase"
              >
                {pill}
              </span>
            ))}
          </div>

          <p className="mt-6 text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
            {section.intro}
          </p>

          <ul className="mt-6 space-y-4">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-[13px] mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-[#737373] text-[16px] md:text-[17px] leading-[27px]">
                  <LeadText item={item} />
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 bg-[#f5f5f5] rounded-2xl px-6 py-5">
            <p className="text-secondary text-[16px] md:text-[17px] leading-[28px]">
              {section.callout}
            </p>
          </div>
        </div>

        <div className="relative w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden">
          <img
            src={classImage}
            alt="Recreational class practicing sculling in the pool"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
