import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import type { BeginnerSubProgram } from '../types'
import { splitParagraphs } from './BeginnerDetails'

interface Props {
    program: BeginnerSubProgram
}

export function BeginnerIntermediate({ program }: Props) {
    const paragraphs = splitParagraphs(program.description)
    return (
        <section id="intermediate" className="p-6 md:px-12 lg:p-20 bg-white space-y-12 scroll-mt-24" aria-labelledby="details-heading">
            <div className="max-w-screen-lg mx-auto pt-8 space-y-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2 className="font-bold text-primary text-[24px] md:text-[32px] tracking-[-1.2px] md:tracking-[-1.6px] uppercase">
                        {program.name}
                    </h2>
                    <Link
                        to="/contact-us"
                        className="inline-block bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-primary transition-colors rounded-full"
                    >
                        Contact Us
                    </Link>
                </div>
                {paragraphs.map((para, i) => (
                    <Fragment key={i}>
                        {i > 0 && <br />}
                        <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px]">
                            {para}
                        </p>
                    </Fragment>
                ))}
            </div>
            <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-[#F5F5F5] rounded-3xl p-6 md:p-10">
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

                <div className="bg-[#F5F5F5] rounded-3xl p-6 md:p-10">
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
