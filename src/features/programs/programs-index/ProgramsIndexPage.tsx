import { CtaBanner } from "#/components/CtaBanner";
import { ProgramsIndexHero } from "./components/ProgramsIndexHero";
import { SeasonalPrograms } from "./components/SeasonalPrograms";
import { YearRoundProgramRow } from "./components/YearRoundProgramRow";

import beginnerImg from "/images/beginner_hero.jpg";
import recreationalImg from "/images/recreational_hero.webp";
import competitiveImg from "/images/competitive_hero.webp";

export function ProgramsIndexPage() {
    return (
        <div className="w-full">
            <ProgramsIndexHero />

            <YearRoundProgramRow
                eyebrow="Year-Round · Sept to June"
                title="Beginner"
                description="Build foundations. Strokes, sculls, breath control and basic figures in a supportive group setting. Two paths depending on prior skill level."
                image={beginnerImg}
                imageAlt="Beginner artistic swimming program"
                to="/programs/beginner"
                background="white"
                imageRight={false}
                subPrograms={[
                    { label: "Novice", hash: "novice" },
                    { label: "Intermediate", hash: "intermediate" },
                ]}
            />

            <YearRoundProgramRow
                eyebrow="Year-Round · Recreational"
                title="Recreational"
                description="Non-competitive programs for swimmers learning artistic swimming basics. Three age-based groups with rolling sessions throughout the year."
                image={recreationalImg}
                imageAlt="Recreational artistic swimming program"
                to="/programs/recreational"
                background="muted"
                imageRight
                subPrograms={[
                    { label: "Sea Stars", hash: "sea-stars" },
                    { label: "Sharks & Mermaids", hash: "sharks-mermaids" },
                    { label: "Dolphins", hash: "dolphins" },
                ]}
            />

            <YearRoundProgramRow
                eyebrow="Year-Round · Competitive"
                title="Competitive"
                description="Elite training for swimmers aiming at national and international competition. Four age groups, structured by USA Artistic Swimming age categories."
                image={competitiveImg}
                imageAlt="Competitive artistic swimming program"
                to="/programs/competitive"
                background="white"
                imageRight={false}
                subPrograms={[
                    { label: "12 & Under", hash: "12-under" },
                    { label: "13 – 15", hash: "13-15" },
                    { label: "Junior", hash: "junior" },
                    { label: "Senior", hash: "senior" },
                ]}
            />

            <SeasonalPrograms />

            <CtaBanner
                heading="Not sure where to start?"
                description="Tell us about the swimmer and we'll help you pick the right program."
                linkToContact="/contact-us"
                linkLabelContact="Contact Us"
                linkVariantContact="primary"
                image="1"
                alt="Contact Seattle Synchro to choose a program"
            />
        </div>
    );
}
