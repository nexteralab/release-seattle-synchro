import { Heart, House, Sparkles, Users } from 'lucide-react'
import type { RecreationalData } from '../types'
import { LeadText } from './LeadText'

// Íconos fijos de diseño: rotan por posición si se agregan tarjetas.
const ICONS = [Heart, Sparkles, Users, House]

export function RecreationalWhoFor({ section }: { section: RecreationalData['whoFor'] }) {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-[#f5f5f5]" aria-labelledby="who-for-heading">
      <div className="max-w-screen-lg mx-auto">
        <h2
          id="who-for-heading"
          className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
        >
          {section.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {section.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:-translate-y-1"
              >
                <div className="size-11 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <p className="mt-5 text-[#737373] text-[16px] leading-[27px]">
                  <LeadText item={item} />
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
