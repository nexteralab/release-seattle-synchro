import { Link } from "@tanstack/react-router";

const swimmingSkills = [
    "4 laps of crawl",
    "4 laps of a backstroke (with the appropriate kick)",
    "4 laps of backstroke",
    "1 lap of eggbeater",
    "1 lap of butterfly",
    "Must be able to independently float on back for 30 seconds",
    "Must be able to tread water for 30 seconds",
    "Must be able to follow instructions",
];

const personalQualities = [
    "Coachability — openness to feedback, willingness to try corrections, and eagerness to improve",
    "Focus and listening — ability to follow directions in a group setting",
    "Respectful behavior — toward coaches, teammates, and the space",
];

export function BeginnerDetails() {
    return (
        <section className="p-12 md:px-20 md:py-24 bg-[#F5F5F5] space-y-12" aria-labelledby="details-heading">
            <div className="max-w-screen-lg mx-auto pt-8 space-y-10">
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="font-bold text-primary text-[32px] tracking-[-1.6px] uppercase">
                    Novice
                </h2>
                <Link
                    to="/contact-us"
                    className="inline-block bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-primary transition-colors rounded-xs"
                >
                    Contact Us
                </Link>
            </div>
            <p className="text-[#171717] text-[16px] leading-[26px]">
                The Novice team is our beginner level, competitive team. They perfect their swimming and beginner synchro skills. {" "}
                <span className="font-semibold">
                    Swimmers should be able to swim four (4) laps of crawl stroke and 4 breaststroke (1 lap=25 yards) and be comfortable floating on his/her back.
                </span>{" "}
                Swimmers who have not participated in Sea Stars or a summer camp should schedule an assessment by contacting us at info@seattlesynchro.com Members of this team will attend several local competitions, and train from September to June.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-10">
                    <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                        Program Details
                    </h3>
                    <div className="space-y-6">
                        <DetailItem label="Ages" value="5–10" />
                        <div>
                            <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                                Coach
                            </h4>
                            <p className="text-[#737373] text-[16px]">
                                Maya Reistad
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                Sophie Lin
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                Giordana Ventura
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                                Workout Days/Times
                            </h4>
                            <p className="text-[#737373] text-[16px]">
                                Wednesday and Fridays
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                5:00-7:00pm
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                                Location &amp; Address
                            </h4>
                            <p className="text-[#737373] text-[16px]">
                                Bellevue Aquatic Center
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                (Outdoor pool, please be aware and prepare for Seattle's weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10">
                    <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                        SESSION INFORMATION
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                                DATES
                            </h4>
                            <p className="text-[#737373] text-[16px]">
                                March 28th
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                April 4th, 11th, 18th, 25th
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                May 2nd, 9th
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                                COST
                            </h4>
                            <p className="text-[#737373] text-[16px]">
                                $TBD monthly fee
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                One time registration fee
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                Three quarterly pledges to the Booster Club (each around $250)
                            </p>
                            <p className="text-[#737373] text-[14px]">
                                Outfitting costs later during the season
                            </p>

                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                                REGISTRATION
                            </h4>
                            <p className="text-[#737373] text-[16px]">
                                We will open registration soon during the first week of September.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="max-w-screen-lg mx-auto bg-white p-10">
                <h3
                    id="tryouts-heading"
                    className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8"
                >
                    Tryouts Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                            Swimming Skills
                        </h4>
                        <ul className="space-y-3">
                            {swimmingSkills.map((skill) => (
                                <li key={skill} className="flex items-start gap-3">
                                    <div
                                        className="text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full text-[20px] mt-0.5"
                                        aria-hidden="true"
                                    >
                                        •
                                    </div>
                                    <span className="text-[#737373] text-[16px] leading-[26px]">{skill}</span>
                                </li>
                            ))}

                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                            Personal Qualities
                        </h4>
                        <ul className="space-y-3">
                            {personalQualities.map((quality) => (
                                <li key={quality} className="flex items-start gap-3">
                                    <div
                                        className="text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full text-[20px] mt-0.5"
                                        aria-hidden="true"
                                    >
                                        •
                                    </div>
                                    <span className="text-[#737373] text-[16px] leading-[26px]">{quality}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-lg mx-auto bg-[#0A0A67] p-10">
                <h3
                    id="first-practice-heading"
                    className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-8"
                >
                    First Practice Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Columna izquierda */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <p className="font-bold text-white text-[14px] tracking-[1px] uppercase mb-3">Date &amp; Time</p>
                            <p className="text-white/80 text-[15px] leading-[24px]">Wednesday, September 3rd</p>
                            <p className="text-white/80 text-[15px] leading-[24px]">6:00pm – 7:30pm</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-bold text-white text-[14px] tracking-[1px] uppercase mb-3">What to Bring</p>
                            <ul className="space-y-1 text-white/80 text-[15px] leading-[24px]">
                                <li>Swim cap &amp; goggles</li>
                                <li>Practice suit</li>
                                <li>Towel and water bottle</li>
                                <li>Yoga mat &amp; minimal clothes</li>
                                <li>Water bottle</li>
                            </ul>
                        </div>
                    </div>
                    {/* Columna derecha */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <p className="font-bold text-white text-[14px] tracking-[1px] uppercase mb-3">Location</p>
                            <p className="text-white/80 text-[15px] leading-[24px]">Bellevue Aquatic Center</p>
                            <p className="text-white/80 text-[15px] leading-[24px]">601 143rd Ave NE, Bellevue, WA, 98007</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-bold text-white text-[14px] tracking-[1px] uppercase mb-3">What to Expect</p>
                            <p className="text-white/80 text-[15px] leading-[24px]">
                                Coaches will lead swimmers at the first practice in sequences. We will spend 1 hour on in-water synchro skills for the second hour of practice. Swimmers progress through act. Then it's a short land session for uniform shirts for the land portion. At the end of practice, coaches will meet swimmers out the front door where parents can pick them up.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto border-l-4 border-yellow-400 bg-yellow-50 px-5 py-4">
                <p className="text-black text-[15px] leading-[24px]">
                    <span className="font-bold">Note:</span>{" "}
                    Schedule might change if swimmers are advanced to a different level depending on progress.
                </p>
            </div>
        </section>
    )
}


function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
                {label}
            </h4>
            <p className="text-[#737373] text-[16px]">{value}</p>
        </div>
    )
}