import gymImage from '/images/content.webp'
import type { RecreationalData } from '../types'
import { LeadText } from './LeadText'

export function RecreationalGymnasticsFit({ section }: { section: RecreationalData['gymnasticsFit'] }) {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="gymnastics-fit-heading">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden order-2 lg:order-1">
          <img
            src={gymImage}
            alt="Athlete in a vertical position during artistic swimming practice"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="font-bold text-primary text-[13px] tracking-[2.2px] uppercase">
            {section.kicker}
          </div>
          <h2
            id="gymnastics-fit-heading"
            className="mt-3 font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
          >
            {section.title}
          </h2>

          <div className="mt-6 flex gap-2 flex-wrap items-center">
            {section.inputs.map((input, i) => (
              <span
                key={i}
                className="inline-flex items-center h-10 px-4 rounded-full border-[1.5px] border-secondary text-secondary font-bold text-[12px] tracking-[1.4px] uppercase"
              >
                {input}
              </span>
            ))}
            <span className="inline-flex items-center h-10 px-4 rounded-full bg-primary text-white font-bold text-[12px] tracking-[1.4px] uppercase">
              {section.result}
            </span>
          </div>

          <p className="mt-6 text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
            {section.body}
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
        </div>
      </div>
    </section>
  )
}
