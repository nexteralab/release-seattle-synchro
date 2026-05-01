import { CtaBanner } from "#/components/CtaBanner";
import { BeginnerDetails } from "./components/BeginnerDetails";
import { BeginnerHero } from "./components/BeginnerHero";
import { BeginnerIntermediate } from "./components/BeginnerIntermediate";
import { BeginnerOverview } from "./components/BeginnerOverview";

export function BeginnerPage() {
    return (
        <div className="w-full">
            <BeginnerHero />
            <BeginnerOverview />
            <BeginnerDetails />
            <BeginnerIntermediate />
            <CtaBanner
                heading="Ready to Join?"
                description="Sign up for one of our recreational programs and discover the joy of artistic swimming."
                linkTo="/contact-us"
                linkLabel="Contact Us"
                linkVariant="primary"
                image="3"
                alt="Ready to Join? Beginner programs banner"
            />
        </div>
    )
}