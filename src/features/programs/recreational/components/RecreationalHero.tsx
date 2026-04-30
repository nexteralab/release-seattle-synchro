import imgRecreationalHero from '/images/recreational_hero.webp'
export function RecreationalHero() {
  return (
    <section
      className="relative h-[280px] md:h-[390px] lg:h-[700px] flex items-end overflow-hidden"
      aria-label="Recreational Programs hero"
    >
      <div className="w-full h-full">
        <img src={imgRecreationalHero} alt="Seattle Synchro recreational swimmers in the pool" className="w-full h-full object-cover object-center" />
      </div>  
    </section>
  );
}
