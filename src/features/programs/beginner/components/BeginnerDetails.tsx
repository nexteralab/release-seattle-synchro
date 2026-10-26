import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import type { BeginnerData } from '../types'

interface Props {
    data: BeginnerData
}

export function BeginnerDetails({ data }: Props) {
    const program = data.novice
    const { tryouts, first_practice } = data
    const paragraphs = splitParagraphs(program.description)
    return (
        <section id="novice" className="p-6 md:px-12 lg:p-20 bg-[#F5F5F5] space-y-12 scroll-mt-24" aria-labelledby="details-heading">
            <div className="max-w-screen-lg mx-auto pt-8 space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2 className="font-bold text-primary text-[32px] tracking-[-1.6px] uppercase">
                        {program.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/contact-us"
                            className="inline-block bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-primary transition-colors rounded-full"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
                <p className="text-[#171717] text-[16px] leading-[26px]">
                    {paragraphs.map((para, i) => (
                        <Fragment key={i}>
                            {para}
                            {i < paragraphs.length - 1 && <><br /><br /></>}
                        </Fragment>
                    ))}
                </p>
           
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white rounded-3xl p-6 md:p-10">
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

                    <div className="bg-white rounded-3xl p-6 md:p-10">
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

                <div className="max-w-screen-lg mx-auto bg-white rounded-3xl p-6 md:p-10">
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
                                {tryouts.swimming_skills.map((skill) => (
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
                                {tryouts.personal_qualities.map((quality) => (
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

                {/* El tryout es la puerta de entrada al equipo: quien lee los
                    requisitos necesita saber a dónde ir después. */}
                <div className="max-w-screen-lg mx-auto bg-[#0A0A67] rounded-3xl p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-white mb-4">
                                <Info size={16} strokeWidth={2} />
                                <span className="font-bold text-[12px] tracking-[1.4px] uppercase">
                                    Before You Join
                                </span>
                            </div>
                            <p className="text-white/85 text-[15px] md:text-[16px] leading-[26px] max-w-xl">
                                {tryouts.before_you_join}
                            </p>
                        </div>
                        <Link
                            to="/programs/try-out"
                            className="shrink-0 self-start md:self-auto inline-block bg-white text-[#0A0A67] px-8 py-4 font-bold text-[13px] tracking-[1.8px] uppercase hover:bg-white/90 transition-colors rounded-full"
                        >
                            Go to Tryouts
                        </Link>
                    </div>
                </div>

                {(program.first_practice_date_time || program.first_practice_address) && (
                    <div className="max-w-screen-lg mx-auto bg-[#0A0A67] rounded-3xl p-6 md:p-10">
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
                                        {first_practice.what_to_bring.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
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
                                        {splitLines(first_practice.what_to_expect).map((line, i, all) => (
                                            <Fragment key={i}>
                                                {line}
                                                {i < all.length - 1 && <br />}
                                            </Fragment>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {data.note && (
                    <div className="max-w-screen-lg mx-auto border-l-4 border-yellow-400 bg-yellow-50 px-5 py-4">
                        <p className="text-black text-[16px] md:text-[18px] leading-[24px]">
                            <span className="font-bold">Note:</span>{" "}
                            {data.note}
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

function splitLines(value: string): string[] {
    return value.split('\n').filter(Boolean)
}

export function splitParagraphs(value: string): string[] {
    return value.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
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
