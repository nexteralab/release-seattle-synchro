import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import type { BeginnerSubProgram } from '../types'

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

const FALLBACK: BeginnerSubProgram = {
    id: 'novice',
    name: 'Novice',
    ages: '5–10',
    coaches: 'Maya Reistad\nSophie Lin\nGiordana Ventura',
    workout_days_times: 'Wednesday and Fridays\n5:00-7:00pm',
    location:
        "Bellevue Aquatic Center\n(Outdoor pool, please be aware and prepare for Seattle's weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.",
    dates: 'March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th',
    cost:
        '$TBD monthly fee\nOne time registration fee\nThree quarterly pledges to the Booster Club (each around $250)\nOutfitting costs later during the season',
    registration: 'We will open registration soon during the first week of September.',
    first_practice_date_time: 'Wednesday, September 3rd\n6:00pm – 7:30pm',
    first_practice_address: 'Bellevue Aquatic Center\n601 143rd Ave NE, Bellevue, WA, 98007',
}

interface Props {
    program?: BeginnerSubProgram
}

export function BeginnerDetails({ program = FALLBACK }: Props = {}) {
    return (
        <section id="novice" className="p-6 md:px-12 lg:p-20 bg-[#F5F5F5] space-y-12 scroll-mt-24" aria-labelledby="details-heading">
            <div className="max-w-screen-lg mx-auto pt-8 space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2 className="font-bold text-primary text-[32px] tracking-[-1.6px] uppercase">
                        {program.name}
                    </h2>
                    <Link
                        to="/contact-us"
                        className="inline-block bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-primary transition-colors rounded-xs"
                    >
                        Contact Us
                    </Link>
                </div>
                <p className="text-[#171717] text-[16px] leading-[26px]">
                    The Novice team is our beginner level, competitive team. They perfect their swimming and beginner synchro skills.{" "}
                    <span className="font-semibold">
                        Swimmers should be able to swim four (4) laps of crawl stroke and 4 breaststroke (1 lap=25 yards) and be comfortable floating on his/her back.
                    </span>{" "}
                    Swimmers who have not participated in Sea Stars or a summer camp should schedule an assessment by contacting us at info@seattlesynchrosst.com Members of this team will attend several local competitions, and train from September to June.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white p-6 md:p-10">
                        <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                            Program Details
                        </h3>
                        <div className="space-y-6">
                            <DetailItem label="Ages" value={program.ages} />
                            <DetailLines label="Coach" value={program.coaches} />
                            <DetailLines label="Workout Days/Times" value={program.workout_days_times} />
                            <DetailLines label="Location & Address" value={program.location} />
                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-10">
                        <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                            Session Information
                        </h3>
                        <div className="space-y-6">
                            <DetailLines label="Dates" value={program.dates} />
                            <DetailLines label="Cost" value={program.cost} />
                            {program.registration && (
                                <DetailLines label="Registration" value={program.registration} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-screen-lg mx-auto bg-white p-6 md:p-10">
                    <h3
                        id="tryouts-heading"
                        className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8"
                    >
                        Tryouts Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
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
                                        <span className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
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
                                        <span className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">{quality}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {(program.first_practice_date_time || program.first_practice_address) && (
                    <div className="max-w-screen-lg mx-auto bg-[#0A0A67] p-6 md:p-10">
                        <h3
                            id="first-practice-heading"
                            className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-8"
                        >
                            First Practice Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                {program.first_practice_date_time && (
                                    <div className="space-y-2">
                                        <p className="font-bold text-white text-[16px] md:text-[18px] tracking-[1px] uppercase mb-3">
                                            Date & Time
                                        </p>
                                        {splitLines(program.first_practice_date_time).map((line, i) => (
                                            <p key={i} className="text-white/80 text-[14px] md:text-[16px] leading-[24px]">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <p className="font-bold text-white text-[16px] md:text-[18px] tracking-[1px] uppercase mb-3">What to Bring</p>
                                    <ul className="space-y-1 text-white/80 text-[14px] md:text-[16px] leading-[24px]">
                                        <li>Swim cap & goggles</li>
                                        <li>Practice suit</li>
                                        <li>Towel and water bottle</li>
                                        <li>Yoga mat & minimal clothes</li>
                                        <li>Water bottle</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-8">
                                {program.first_practice_address && (
                                    <div className="space-y-2">
                                        <p className="font-bold text-white text-[16px] md:text-[18px] tracking-[1px] uppercase mb-3">Location</p>
                                        {splitLines(program.first_practice_address).map((line, i) => (
                                            <p key={i} className="text-white/80 text-[14px] md:text-[16px] leading-[24px]">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <p className="font-bold text-white text-[16px] md:text-[18px] tracking-[1px] uppercase mb-3">What to Expect</p>
                                    <p className="text-white/80 text-[14px] md:text-[16px] leading-[24px]">
                                        Coaches will lead swimmers at the first practice in sequences. We will spend 1 hour on in-water synchro skills for the second hour of practice. Swimmers progress through act. Then it's a short land session for uniform shirts for the land portion. At the end of practice, coaches will meet swimmers out the front door where parents can pick them up.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-screen-lg mx-auto border-l-4 border-yellow-400 bg-yellow-50 px-5 py-4">
                    <p className="text-black text-[16px] md:text-[18px] leading-[24px]">
                        <span className="font-bold">Note:</span>{" "}
                        Schedule might change if swimmers are advanced to a different level depending on progress.
                    </p>
                </div>
            </div>
        </section>
    )
}

function splitLines(value: string): string[] {
    return value.split('\n').filter(Boolean)
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

function DetailLines({ label, value }: { label: string; value: string }) {
    const lines = splitLines(value)
    return (
        <div>
            <h4 className="font-bold text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-2">
                {label}
            </h4>
            {lines.length === 0 ? null : (
                <p className="text-[#737373] text-[14px] md:text-[16px] leading-[26px]">
                    {lines.map((line, i) => (
                        <Fragment key={i}>
                            {line}
                            {i < lines.length - 1 && <br />}
                        </Fragment>
                    ))}
                </p>
            )}
        </div>
    )
}
