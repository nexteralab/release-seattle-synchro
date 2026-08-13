import { Heart, House, Sparkles, Users, type LucideIcon } from 'lucide-react'

interface Audience {
  icon: LucideIcon
  lead: string
  rest: string
}

const AUDIENCE: Audience[] = [
  {
    icon: Heart,
    lead: 'Kids who love to swim but are not interested in competing.',
    rest: 'The water is the point, not the medal.',
  },
  {
    icon: Sparkles,
    lead: 'Beginners who want to try something new and creative.',
    rest: 'Artistic swimming adds expression to skills they already have.',
  },
  {
    icon: Users,
    lead: 'Swimmers who enjoy performing and teamwork,',
    rest: 'without the pressure of meets.',
  },
  {
    icon: House,
    lead: 'Families looking for a fun alternative',
    rest: 'to the typical kids swimming lessons Seattle families are used to.',
  },
]

export function RecreationalWhoFor() {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-[#f5f5f5]" aria-labelledby="who-for-heading">
      <div className="max-w-screen-lg mx-auto">
        <h2
          id="who-for-heading"
          className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
        >
          Who Is It For?
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCE.map((item) => (
            <div
              key={item.lead}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1"
            >
              <div className="size-11 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                <item.icon size={22} strokeWidth={2} />
              </div>
              <p className="mt-5 text-[#737373] text-[16px] leading-[27px]">
                <strong className="text-secondary font-semibold">{item.lead}</strong> {item.rest}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
