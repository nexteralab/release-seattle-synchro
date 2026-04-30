import { BeginnerDetails } from "./components/BeginnerDetails";
import { BeginnerHero } from "./components/BeginnerHero";
import { BeginnerIntermediate } from "./components/BeginnerIntermediate";
import { BeginnerOverview } from "./components/BeginnerOverview";
import { ReadyToJoin } from "./components/ReadyToJoin";

export function BeginnerPage() {
    return (
        <div className="w-full">
            <BeginnerHero />
            <BeginnerOverview />
            <BeginnerDetails />
            <BeginnerIntermediate />
            <ReadyToJoin />
        </div>
    )
}