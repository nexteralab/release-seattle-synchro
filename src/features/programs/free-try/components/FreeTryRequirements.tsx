import { CircleDot, Glasses, Package, Shirt, Wind, type LucideIcon } from 'lucide-react'

interface Requirement {
  icon: LucideIcon
  name: string
  description: string
  note?: string
  link?: string
}

const REQUIREMENTS: Requirement[] = [
  {
    icon: Shirt,
    name: 'Swim Suit',
    description:
      'A one-piece practice suit works best. Skip the two-piece, since swimmers spend a lot of time upside down.',
  },
  {
    icon: CircleDot,
    name: 'Swim Cap',
    description: 'Silicone or latex, either is fine. It keeps hair out of the face during figures.',
  },
  {
    icon: Glasses,
    name: 'Goggles',
    description: 'Any comfortable pair. Coaches will show swimmers when to wear them and when to take them off.',
  },
  {
    icon: Wind,
    name: 'Nose Clips',
    description: 'Essential for staying inverted comfortably. If you do not own one, we keep spares on deck.',
    note: 'Recommendations',
    link: 'https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW/ref=sr_1_5?th=1',
  },
  {
    icon: Package,
    name: 'Towel',
    description: 'Plus something warm to change into afterwards.',
  },
]

export function FreeTryRequirements() {
  return (
    <section
      className="p-6 md:p-12 md:px-20 md:py-24 bg-[#f5f5f5]"
      aria-labelledby="freetry-requirements-heading"
    >
      <div className="max-w-screen-lg mx-auto space-y-4 md:space-y-6">
        <h2
          id="freetry-requirements-heading"
          className="font-bold text-secondary text-[30px] md:text-[48px] tracking-[-2.4px] uppercase"
        >
          What Do You Need?
        </h2>
        <p className="max-w-2xl text-[#737373] text-[16px] md:text-[18px] leading-[26px] md:leading-[30px]">
          Everything on this list is easy to find, and nothing is expensive. If you are missing
          something on the day, tell a coach, we usually have spares.
        </p>

        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REQUIREMENTS.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1"
            >
              <div className="size-11 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                <item.icon size={22} strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-bold text-secondary text-[14px] tracking-[1.4px] uppercase">
                {item.name}
              </h3>
              <p className="mt-3 text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
                {item.description}
              </p>
              {item.note && item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  className="mt-2 inline-block underline text-secondary text-[13px] md:text-[14px] hover:text-primary transition-colors"
                >
                  {item.note}: View on Amazon
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
