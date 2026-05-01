import readyToJoin from '/images/image_back.png'

export function ShowOffer() {
    return (
        <section className="p-6 md:px-12 md:py-24 bg-white" aria-labelledby="offer-heading">
            <div className="relative bg-[#0A0A67] p-6 md:p-8 text-white max-w-screen-lg mx-auto overflow-hidden">
                <div className="relative z-10 flex flex-col gap-4 md:w-[55%]">
                    <h3 className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-4">
                        What we offer
                    </h3>
                    <ul className="space-y-2 text-white/90 text-[16px] md:text-[18px]">
                        <li className="flex items-start gap-2">
                            <div
                                className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                                aria-hidden="true"
                            >
                                ✓
                            </div>
                            <span>11 months of training per year</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div
                                className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                                aria-hidden="true"
                            >
                                ✓
                            </div>
                            <span>Minimum of 8 meets per year</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div
                                className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                                aria-hidden="true"
                            >
                                ✓
                            </div>
                            <span>Elite level training and competition</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div
                                className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                                aria-hidden="true"
                            >
                                ✓
                            </div>
                            <span>Pathway to US National Teams</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div
                                className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                                aria-hidden="true"
                            >
                                ✓
                            </div>
                            <span>Minimum age: 14 years old</span>
                        </li>
                    </ul>

                </div>
                <img
                    src={readyToJoin}
                    alt="Ready to Join"
                    className="absolute right-0 bottom-[-40px] md:bottom-[-80px] w-1/2 md:w-[48%] h-full object-contain object-right-bottom pointer-events-none"
                />
            </div>
        </section>
    )
}