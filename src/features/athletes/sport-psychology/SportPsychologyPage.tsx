import { SportPsychologyHero } from "./components/SportPsychologyHero";
import { SportPsychologyIntro } from "./components/SportPsychologyIntro";
import { SportPsychologySkills } from "./components/SportPsychologySkills";

export function SportPsychologyPage() {
    return (
        <div className="w-full">
            <SportPsychologyHero />
            <SportPsychologyIntro />
            <SportPsychologySkills />
        </div>
    );
}
