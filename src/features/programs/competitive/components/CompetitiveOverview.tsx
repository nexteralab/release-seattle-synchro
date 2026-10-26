import type { CompetitiveData } from '../types'

interface Props {
  overview: CompetitiveData['overview']
}

export function CompetitiveOverview({ overview }: Props) {
  const paragraphs = overview.body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

  return (
    <section className="p-6 md:px-20 md:py-24 bg-white" aria-labelledby="overview-heading">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="font-bold text-secondary text-[40px] md:text-[72px] tracking-[-2.8px] uppercase mb-8 text-center">
          {overview.title}
        </h1>
        <h2
          id="overview-heading"
          className="font-bold text-secondary text-[20px] leading-[26px] md:text-[48px] tracking-[-1.8px] uppercase mb-8"
        >
          {overview.heading}
        </h2>
        <div className="max-w-5xl space-y-6 text-secondary text-[16px] md:text-[18px] leading-[26px]">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}
