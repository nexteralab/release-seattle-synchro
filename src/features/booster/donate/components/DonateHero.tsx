const heroImage = '/images/hero_donate.webp'

export function DonateHero() {
  return (
    <section
      className="relative md:h-[60vh] h-[40vh] flex items-center justify-center overflow-hidden"
      aria-label="Recreational Programs hero"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Artistic swimming coach training kids poolside"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.src = heroImage
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </section>
  )
}
