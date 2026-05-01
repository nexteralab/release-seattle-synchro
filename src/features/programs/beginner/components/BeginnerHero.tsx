import imgBeginnerHero from '/images/beginner_hero.jpg'

const HERO_IMAGE =
    'https://images.unsplash.com/photo-1774009304081-ca87dd2f5d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMGNvYWNoJTIwcG9vbHNpZGUlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080'

export function BeginnerHero() {
    return (
        <section
            className="relative md:h-[80vh] h-[40vh] flex items-center justify-center overflow-hidden"
            aria-label="Beginner hero"
        >
            <div className="absolute inset-0">
                <img
                    src={imgBeginnerHero}
                    alt="Seattle Synchro beginner"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = HERO_IMAGE
                    }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </section>
    )
}
