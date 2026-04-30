import heroImage from '/images/image_free_try.webp'

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

export function FreeTryHero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Free Try hero"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Artistic swimming coach training kids poolside"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = HERO_FALLBACK
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 text-center text-white px-12 md:px-48">
        <div className="bg-primary inline-block px-3 py-1 mb-6">
          <span className="font-bold text-[#f5f5f5] text-[12px] tracking-[1.2px] uppercase">
            open house
          </span>
        </div>
        <h1 className="font-bold text-[clamp(2.5rem,7vw,5.5rem)] tracking-[-3.6px] uppercase leading-none mb-6">
          free try<br />2026
        </h1>
        <a
          href="#details"
          className="inline-block bg-white text-[#021521] px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-gray-100 transition-colors"
        >
          See Details
        </a>
      </div>
    </section>
  )
}
