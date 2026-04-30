import heroImage from '/images/contact-us.jpg'

export function ContactHero() {
  return (
    <section className="relative max-h-[580px] min-h-[380px] h-[55vh] overflow-hidden flex items-end">
      <img
        src={heroImage}
        alt="Seattle Synchro contact"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#021521]/70 via-[#021521]/20 to-transparent" />

      <div className="relative z-10 w-full px-12 md:px-48 pb-12 max-w-screen-2xl mx-auto">
        <p
          className="font-bold text-white/50 text-[13px] tracking-[2px] uppercase mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Seattle Synchro
        </p>
        <h1
          className="font-medium text-white text-[48px] md:text-[64px] tracking-[-2.4px] uppercase leading-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Get in touch
        </h1>
      </div>
    </section>
  )
}
