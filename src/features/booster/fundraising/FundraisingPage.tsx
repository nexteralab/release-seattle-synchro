import { CtaBanner } from "#/components/CtaBanner";
import { FundraisingHero } from "./components/FundraisingHero";
import { FundraisingPartners } from "./components/FundraisingPartners";

export function FundraisingPage() {
    return (
        <div className="w-full">
            <FundraisingHero />
            <FundraisingPartners />
            <CtaBanner
                heading="Have Questions About Donating?"
                description="We'd love to help. Reach out and we'll get back to you shortly."
                linkToContact="/contact-us"
                linkLabelContact="Contact Us"
                linkVariantContact="primary"
                image="3"
                alt="Support Seattle Synchro fundraising efforts"
            />
        </div>
    );
}
