import readyToJoin from '/images/image_back.png'

const BENEFITS = [
    "Focused work on specific skills and drills",
    "Faster progress on new movements and figures",
    "Personalized feedback without group distractions",
    "Flexible scheduling around your week",
    "Complements — never replaces — regular practice",
]

export function PrivateLessonsBenefits() {
    return (
        <section className="p-6 md:px-12 md:py-24 bg-white" aria-labelledby="benefits-heading">
            <div className="relative bg-[#0A0A67] p-6 md:p-8 text-white max-w-screen-lg mx-auto overflow-hidden">
                <div className="relative z-10 flex flex-col gap-4 md:w-[55%]">
                    <h2
                        id="benefits-heading"
                        className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-4"
                    >
                        Why private lessons work
                    </h2>
                    <ul className="space-y-2 text-white/90 text-[16px] md:text-[18px]">
                        {BENEFITS.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2">
                                <div
                                    className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                                    aria-hidden="true"
                                >
                                    ✓
                                </div>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <img
                    src={readyToJoin}
                    alt=""
                    aria-hidden="true"
                    className="absolute right-0 bottom-[-40px] md:bottom-[-80px] w-1/2 md:w-[48%] h-full object-contain object-right-bottom pointer-events-none"
                />
            </div>
        </section>
    )
}
