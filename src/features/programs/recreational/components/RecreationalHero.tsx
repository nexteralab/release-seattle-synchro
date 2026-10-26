import heroImage from '/images/recreational_hero.webp'
import type { RecreationalData } from '../types'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

export function RecreationalHero({ hero }: { hero: RecreationalData['hero'] }) {
  return (
    <section className="bg-white" aria-label="Recreational Programs hero">
      <div className="p-6 pt-10 md:p-12 md:px-20 md:pt-16">
        <div className="relative w-full h-[42vh] md:h-[58vh] rounded-3xl overflow-hidden max-w-screen-xl mx-auto">
          <img
            // Sin imagen propia en base, se usa la del bundle.
            src={hero.image || heroImage}
            alt={hero.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = HERO_IMAGE
            }}
          />
        </div>
      </div>
    </section>
  )
}
