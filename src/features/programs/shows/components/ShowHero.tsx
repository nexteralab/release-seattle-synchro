import imgShowHero from '/images/shows_hero.jpg'

export function ShowHero() {
    return (
        <section
            className="relative h-[60vh] min-h-[600px] flex items-end overflow-hidden"
            aria-label="Shows hero"
        >
            <div className="absolute inset-0">
                <img
                    src={imgShowHero}
                    alt="Seattle Synchro shows"
                    className="w-full h-full object-cover object-top"
                />
            </div>
        </section>
    )
}
