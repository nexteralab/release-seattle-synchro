import readyToJoin from '/images/ready_to_join_4.png'

export function ShowOffer() {
    return (
        <section className="py-24 px-12 md:px-48 bg-white" aria-labelledby="offer-heading">
            <div className="relative bg-[#0A0A67] p-8 text-white pb-12"
                style={{
                    backgroundImage: `url(${readyToJoin})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right -80px bottom 40px',
                    backgroundSize: 'auto 50%',
                }}  >
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-4">
                        What we offer
                    </h3>
                    <ul className="space-y-2 text-white/90 text-[18px]">
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
            </div>
        </section>
    )
}