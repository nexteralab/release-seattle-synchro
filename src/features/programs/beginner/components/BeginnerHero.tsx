import imgBeginnerHero from '/images/beginner_hero.jpg'

export function BeginnerHero() {
    return (
        <section
            className="relative h-[60vh] min-h-[600px] flex items-end overflow-hidden"
            aria-label="Beginner hero"
        >
            <div className="w-full h-full">
                <img
                    src={imgBeginnerHero}
                    alt="Seattle Synchro beginner"
                    className="w-full h-full object-cover object-center"
                />
            </div>
        </section>
    )
}
