import { KnoxingHero } from "./components/KnoxingHero";
import { KnoxingGuide } from "./components/KnoxingGuide";

export function KnoxingPage() {
    return (
        <div className="w-full">
            <KnoxingHero />
            <KnoxingGuide />
        </div>
    );
}
