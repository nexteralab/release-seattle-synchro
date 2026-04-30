import type { FreeTryRequirement } from '../types'

interface Props {
  requirements: FreeTryRequirement[]
}

export function FreeTryRequirements({ requirements }: Props) {
  const half = Math.ceil(requirements.length / 2)
  const left = requirements.slice(0, half)
  const right = requirements.slice(half)

  return (
    <section
      className="p-6 md:p-12 md:px-20 md:py-24 bg-[#f5f5f5]"
      aria-labelledby="freetry-requirements-heading"
    >
      <div className="max-w-screen-lg mx-auto space-y-6 md:space-y-12">
        <h2
          id="freetry-requirements-heading"
          className="font-bold text-[#0A0A67] text-[30px] md:text-[48px] tracking-[-2.4px] uppercase"
        >
          What Do You Need?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RequirementList items={left} />
          <RequirementList items={right} />
        </div>
      </div>
    </section>
  )
}

function RequirementList({ items }: { items: FreeTryRequirement[] }) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.name} className="flex gap-4">
          <div
            className="bg-primary text-white size-6 md:size-8 shrink-0 flex items-center justify-center font-bold"
            aria-hidden="true"
          >
            ✓
          </div>
          <div>
            <h3 className="font-bold text-[#171717] text-[14px] md:text-[18px] mb-1">{item.name}</h3>
            {item.note && item.link ? (
              <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                {item.note}{' '}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[12px] md:text-[14px] hover:text-[#0A0A67] transition-colors"
                >
                  View on Amazon
                </a>
              </p>
            ) : item.note ? (
              <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">{item.note}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
