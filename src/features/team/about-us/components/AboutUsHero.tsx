const HERO_IMAGE =
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920'

const heroImage = '/images/about_us_hero.webp'

export function AboutUsHero() {
  return (
    <section
      className="relative md:h-screen h-[35vh] flex items-center justify-center overflow-hidden"
      aria-label="About Us hero"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Seattle Synchro team at the pool"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </section>
  )
}
