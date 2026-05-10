import { CtaBanner } from "#/components/CtaBanner";
import { BeginnerDetails } from "./components/BeginnerDetails";
import { BeginnerHero } from "./components/BeginnerHero";
import { BeginnerIntermediate } from "./components/BeginnerIntermediate";
import { BeginnerOverview } from "./components/BeginnerOverview";
import type { BeginnerConfig } from "./services/beginner.service";
import type { BeginnerSubProgram, BeginnerSubProgramId } from "./types";

interface Props {
    config: BeginnerConfig
}

const FALLBACK_PROGRAM = (id: BeginnerSubProgramId, name: string): BeginnerSubProgram => ({
    id,
    name,
    ages: '',
    coaches: '',
    workout_days_times: '',
    location: '',
    dates: '',
    cost: '',
    registration: '',
    first_practice_date_time: '',
    first_practice_address: '',
})

export function BeginnerPage({ config }: Props) {
    const byId = new Map(config.sub_programs.map(p => [p.id, p]))
    const novice = byId.get('novice') ?? FALLBACK_PROGRAM('novice', 'Novice')
    const intermediate = byId.get('intermediate') ?? FALLBACK_PROGRAM('intermediate', 'Intermediate')

    return (
        <div className="w-full">
            <BeginnerHero />
            <BeginnerOverview />
            <BeginnerDetails program={novice} />
            <BeginnerIntermediate program={intermediate} />
            <CtaBanner
                heading="Ready to Join?"
                description="Sign up for one of our recreational programs and discover the joy of artistic swimming."
                linkToContact="/contact-us"
                linkLabelContact="Contact Us"
                linkVariantContact="primary"
                image="3"
                alt="Ready to Join? Beginner programs banner"
            />
        </div>
    )
}
