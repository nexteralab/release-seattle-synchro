import { CtaBanner } from "#/components/CtaBanner";
import { BeginnerDetails } from "./components/BeginnerDetails";
import { BeginnerHero } from "./components/BeginnerHero";
import { BeginnerIntermediate } from "./components/BeginnerIntermediate";
import { BeginnerOverview } from "./components/BeginnerOverview";
import type { BeginnerData } from "./types";

interface Props {
    data: BeginnerData
}

export function BeginnerPage({ data }: Props) {
    return (
        <div className="w-full">
            <BeginnerHero hero={data.hero} />
            <BeginnerOverview overview={data.overview} />
            <BeginnerDetails data={data} />
            <BeginnerIntermediate program={data.intermediate} />
            <CtaBanner
                heading={data.banner.heading}
                description={data.banner.description}
                linkToContact="/contact-us"
                linkLabelContact={data.banner.contactLabel}
                linkVariantContact="primary"
                image={data.banner.image}
                alt={data.banner.heading}
            />
        </div>
    )
}
