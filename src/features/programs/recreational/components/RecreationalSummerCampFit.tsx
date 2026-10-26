import { Link } from '@tanstack/react-router'
import campImage from '/images/image_summer_camp.jpg'
import type { RecreationalData } from '../types'

export function RecreationalSummerCampFit({ section }: { section: RecreationalData['summerCampFit'] }) {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="summer-camp-fit-heading">
      <div className="max-w-screen-lg mx-auto">
        <h2
          id="summer-camp-fit-heading"
          className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
        >
          {section.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#f5f5f5] rounded-3xl p-6 md:p-10">
            <p className="text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
              {section.intro}
            </p>
            <ul className="mt-6 space-y-3">
              {section.highlights.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="shrink-0 size-6 rounded-full bg-primary/18 text-primary flex items-center justify-center font-bold text-[13px] mt-0.5"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-secondary text-[16px] md:text-[17px] leading-[27px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
              {section.outro}
            </p>
            <Link
              to="/programs/summer-camp"
              className="inline-block mt-7 bg-white border border-secondary text-secondary rounded-full px-8 py-3 font-bold text-[13px] tracking-[1.8px] uppercase hover:bg-secondary hover:text-white transition-colors"
            >
              {section.ctaLabel}
            </Link>
          </div>

          <div className="relative w-full min-h-[300px] rounded-3xl overflow-hidden">
            <img
              src={campImage}
              alt="Summer camp showcase for families"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
