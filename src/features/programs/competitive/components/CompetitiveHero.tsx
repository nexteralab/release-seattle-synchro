export function CompetitiveHero() {
  return (
    <section
      className="relative h-[280px] md:h-[390px] lg:h-[600px] flex items-end overflow-hidden"
      aria-label="Competitive Programs hero"
    >
      <div className="absolute">
        <img
          src="/images/competitive_hero.webp"
          alt="Seattle Synchro competitive swimmers training in the pool"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
