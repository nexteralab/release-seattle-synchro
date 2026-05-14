import imgPrivateLessonsHero from '/images/content.webp'

const HERO_IMAGE =
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600'

export function PrivateLessonsHero() {
    return (
        <section
            className="relative md:h-[80vh] h-[40vh] flex items-center justify-center overflow-hidden"
            aria-label="Private Lessons hero"
        >
            <div className="absolute inset-0">
                <img
                    src={imgPrivateLessonsHero}
                    alt="Seattle Synchro private lessons"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = HERO_IMAGE
                    }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        </section>
    )
}
