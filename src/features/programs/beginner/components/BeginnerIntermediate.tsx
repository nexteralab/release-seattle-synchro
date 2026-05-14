import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import type { BeginnerSubProgram } from '../types'

const FALLBACK: BeginnerSubProgram = {
    id: 'intermediate',
    name: 'Intermediate',
    ages: '7-12 years old',
    coaches: 'Lacey Ethier\nGiordana Ventura',
    workout_days_times: 'Mondays 7:00-9:00pm\nFridays 5:00-7:00pm',
    location:
        "Bellevue Aquatic Center\n(Outdoor pool, please be aware and prepare for Seattle's weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.",
    dates: 'March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th',
    cost: '$265 Per Month, $275 registration fee, outfitting costs & traveling costs.',
    registration: '',
    first_practice_date_time: '',
    first_practice_address: '',
}

interface Props {
    program?: BeginnerSubProgram
}

export function BeginnerIntermediate({ program = FALLBACK }: Props = {}) {
    return (
        <section id="intermediate" className="p-6 md:px-12 lg:p-20 bg-white space-y-12 scroll-mt-24" aria-labelledby="details-heading">
            <div className="max-w-screen-lg mx-auto pt-8 space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2 className="font-bold text-primary text-[24px] md:text-[32px] tracking-[-1.2px] md:tracking-[-1.6px] uppercase">
                        {program.name}
                    </h2>
                    <Link
                        to="/contact-us"
                        className="inline-block bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-primary transition-colors rounded-xs"
                    >
                        Contact Us
                    </Link>
                </div>
                <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px]">
                    The Intermediate team is another beginner level, competitive team. They perfect their swimming and artistic skills. Swimmers should be able to swim eight laps of crawl stroke and 4 breaststroke, and be comfortable floating on his/her back. Swimmers who have not participated in Sea Stars or a summer camp should schedule an assessment by contacting us at info@seattlesynchrosst.com. Members of this team will attend several local competitions, and train from September to June.
                </p>
            </div>
            <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-[#F5F5F5] p-6 md:p-10">
                    <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                        Program Details
                    </h3>
                    <div className="space-y-6">
                        <DetailItem label="Ages" value={program.ages} />
                        <DetailLines label="Coach" value={program.coaches} />
                        <DetailLines label="Workout Days/Times" value={program.workout_days_times} />
                        <DetailLines label="Location" value={program.location} />
                    </div>
                </div>

                <div className="bg-[#F5F5F5] p-6 md:p-10">
                    <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
                        Session Information
                    </h3>
                    <div className="space-y-6">
                        <DetailLines label="Dates" value={program.dates} />
                        <DetailLines label="Cost" value={program.cost} />
                    </div>
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
