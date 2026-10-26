import { Fragment } from 'react'
import type { BeginnerData } from '../types'

export function BeginnerOverview({ overview }: { overview: BeginnerData['overview'] }) {
    const titleLines = overview.title.split('\n')
    return (
        <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="beginner-heading">
            <div className="max-w-screen-lg mx-auto space-y-6">
                <h1
                    id="beginner-heading"
                    className="font-bold text-secondary text-[40px] md:text-[72px] tracking-[-2.8px] uppercase mb-4 text-center"
                >
                    {titleLines.map((line, i) => (
                        <Fragment key={i}>
                            {line}
                            {i < titleLines.length - 1 && <br />}
                        </Fragment>
                    ))}
                </h1>
                <p className="text-secondary text-[16px] md:text-[18px] leading-[26px] text-center">
                    {overview.description}
                </p>
            </div>
        </section>
    )
}
