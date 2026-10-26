import type { CompetitiveData } from '../types'

interface Props {
  senior: CompetitiveData['senior']
}

export function CompetitiveSenior({ senior }: Props) {
  return (
    <section id="senior" className="p-6 md:px-20 md:py-24 bg-white scroll-mt-24" aria-labelledby="group-senior">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
          <h2
            id="group-senior"
            className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
          >
            {senior.title}
          </h2>
        </div>
        <p className="text-[#171717] text-[18px] leading-[26px] max-w-4xl">
          {senior.description}
        </p>
      </div>
    </section>
  )
}
