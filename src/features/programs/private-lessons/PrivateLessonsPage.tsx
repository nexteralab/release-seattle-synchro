import { CtaBanner } from "#/components/CtaBanner";
import { PrivateLessonsBenefits } from "./components/PrivateLessonsBenefits";
import { PrivateLessonsHero } from "./components/PrivateLessonsHero";
import { PrivateLessonsHowItWorks } from "./components/PrivateLessonsHowItWorks";
import { PrivateLessonsOverview } from "./components/PrivateLessonsOverview";

export function PrivateLessonsPage() {
    return (
        <div className="w-full">
            <PrivateLessonsHero />
            <PrivateLessonsOverview />
            <PrivateLessonsHowItWorks />
            <PrivateLessonsBenefits />
            <CtaBanner
                heading="Ready to book a private lesson?"
                description="Reach out and we'll match you with the right coach and time slot."
                linkToContact="/contact-us"
                linkLabelContact="Contact Us"
                linkVariantContact="primary"
                image="2"
                alt="Ready to book a private lesson banner"
            />
        </div>
    )
}
