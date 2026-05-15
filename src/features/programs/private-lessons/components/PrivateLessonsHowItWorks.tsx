const STEPS = [
    {
        title: "Scheduled outside SST hours",
        body: "All private lessons must be scheduled outside of active Seattle Synchro Team (SST) practice hours so they never interfere with regular training.",
    },
    {
        title: "Priority to the swimmer's coach",
        body: "Whenever possible, private lessons should be taught by the swimmer's own coach to keep guidance consistent with their development plan.",
    },
    {
        title: "Alternate coach when needed",
        body: "If your coach is unavailable, another coach from our staff may be asked to teach the lesson, subject to availability.",
    },
]

export function PrivateLessonsHowItWorks() {
    return (
        <section className="p-6 md:px-12 md:py-24 bg-[#f5f5f5]" aria-labelledby="how-it-works-heading">
            <div className="max-w-screen-lg mx-auto space-y-10">
                <ol className="grid gap-6 md:grid-cols-3">
                    {STEPS.map((step) => (
                        <li
                            key={step.title}
                            className="bg-white p-6 md:p-8 border border-black/[0.06] rounded-lg flex flex-col gap-3"
                        >
                            <h3 className="font-bold text-secondary text-[18px] md:text-[20px] tracking-[-0.6px]">
                                {step.title}
                            </h3>
                            <p className="text-[#737373] text-[15px] leading-[24px]">{step.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
