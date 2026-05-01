import { Link } from "@tanstack/react-router";



export function BeginnerIntermediate() {
    return (
        <section className="p-6 md:px-12 lg:p-20 bg-white space-y-12" aria-labelledby="details-heading">
            <div className="max-w-screen-lg mx-auto pt-8 space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2 className="font-bold text-primary text-[24px] md:text-[32px] tracking-[-1.2px] md:tracking-[-1.6px] uppercase">
                        Intermediate
                    </h2>
                    <Link
                        to="/contact-us"
                        className="inline-block bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-primary transition-colors rounded-xs"
                    >
                        Contact Us
                    </Link>
                </div>
                <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px]">
                    The Intermediate team is another beginner level, competitive team. They perfect their swimming and artistic skills. Swimmers should be able to swim eight laps of crawl stroke and 4 breaststroke, and be comfortable floating on his/her back. Swimmers who have not participated in Sea Stars or a summer camp should schedule an assessment by contacting us at info@seattlesynchro.com. Members of this team will attend several local competitions, and train from September to June.
                </p>
            </div>
            <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-[#F5F5F5] p-6 md:p-10">
                    <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                        Program Details
                    </h3>
                    <div className="space-y-6">
                        <DetailItem label="Ages" value="7-12 years old" />
                        <div>
                            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
                                Coach
                            </h4>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                Lacey Ethier
                            </p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                Giordana Ventura
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
                                Workout Days/Times
                            </h4>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                Mondays 7:00-9:00pm
                            </p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                Fridays 5:00-7:00pm
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
                                Location
                            </h4>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                Bellevue Aquatic Center
                            </p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                (Outdoor pool, please be aware and prepare for Seattle's weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F5F5F5] p-6 md:p-10">
                        <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                        SESSION INFORMATION
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
                                DATES
                            </h4>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                March 28th
                            </p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                April 4th, 11th, 18th, 25th
                            </p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                May 2nd, 9th
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
                                COST
                            </h4>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                                $265 Per Month, $275 registration fee, outfitting costs & traveling costs.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}




function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
                {label}
            </h4>
            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">{value}</p>
        </div>
    )
}