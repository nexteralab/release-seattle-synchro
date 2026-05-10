import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import amazonImage from "/images/fundraising/amazon.png";
import giveLivelyImage from "/images/fundraising/give.png";
import swimOutletImage from "/images/fundraising/swimoutlet.png";

const vp = { once: true, margin: "-60px" } as const;

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

type Partner = {
    name: string;
    image: string;
    alt: string;
    description: string;
    box: {
        label: string;
        highlight?: string;
        body: string;
    };
    href: string;
};

const partners: Partner[] = [
    {
        name: "AmazonSmile",
        image: amazonImage,
        alt: "AmazonSmile logo",
        description:
            "Please search for and select Seattle Synchronized Swim Team as your supported charity at Amazon Smile. Every time you shop, you will automatically support Seattle Synchro.",
        box: {
            label: "Donation rate",
            highlight: "0.5%",
            body: "of eligible purchases",
        },
        href: "https://smile.amazon.com",
    },
    {
        name: "Give with Bing",
        image: giveLivelyImage,
        alt: "Give with Bing logo",
        description:
            "Click the link below to go to Bing Give. Search and select Seattle Synchronized Swim Team Booster Club as your supported charity. Then start searching and support Seattle Synchro at the same time.",
        box: {
            label: "How it works",
            body: "Every search you make contributes to our team at no cost to you",
        },
        href: "https://rewards.bing.com/redeem/donate?form=gwbredirect",
    },
    {
        name: "SwimOutlet",
        image: swimOutletImage,
        alt: "SwimOutlet logo",
        description:
            "Support Seattle Synchro Swim Team by shopping at our store. A portion of all sales goes back to Seattle Synchro Swim Team.",
        box: {
            label: "What you'll find",
            body: "Swimwear, training gear, team merchandise, and more",
        },
        href: "https://www.swimoutlet.com/collections/seattlesynchro",
    },
];

export function FundraisingPartners() {
    return (
        <section
            className="p-6 md:px-20 md:py-24 bg-white"
            aria-labelledby="fundraising-partners-heading"
        >
            <div className="max-w-screen-lg mx-auto space-y-12">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    variants={stagger}
                    className="space-y-6"
                >
                    <motion.div variants={fadeUp} className="flex items-center gap-4">
                        <div
                            className="flex items-center justify-center w-10 h-10 rounded-lg"
                            style={{ background: "rgba(10,10,103,0.08)" }}
                        >
                            <ShoppingBag size={20} strokeWidth={1.75} color="#0A0A67" aria-hidden="true" />
                        </div>
                        <h2
                            id="fundraising-partners-heading"
                            className="font-bold text-[#0A0A67] uppercase"
                            style={{
                                fontSize: "clamp(20px, 2.5vw, 32px)",
                                letterSpacing: "-1.6px",
                            }}
                        >
                            Fundraising While We Shop or Search
                        </h2>
                    </motion.div>

                    <motion.div variants={fadeUp} className="w-10 h-1 bg-[#0A0A67]" />

                    <motion.p
                        variants={fadeUp}
                        className="max-w-3xl"
                        style={{
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: "#737373",
                        }}
                    >
                        You can help to raise funds for the Seattle Synchronized Swim Team just by
                        shopping with the businesses below or searching the internet. It's a win-win
                        and easy way to support our Booster Club. Please encourage your family and
                        friends to support the Seattle Synchronized Swim Team through these
                        fundraising partners.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {partners.map((partner) => (
                        <motion.article
                            key={partner.name}
                            variants={fadeUp}
                            className="group flex flex-col rounded-[10px] border border-[rgba(0,0,0,0.1)] bg-white p-6 gap-6 hover:border-[#0A0A67]/40 hover:shadow-[0_10px_25px_rgba(10,10,103,0.08)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-center h-20">
                                <img
                                    src={partner.image}
                                    alt={partner.alt}
                                    className="max-h-full max-w-[80%] object-contain"
                                    loading="lazy"
                                />
                            </div>

                            <p
                                className="text-center"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "14px",
                                    lineHeight: "22px",
                                    color: "#737373",
                                }}
                            >
                                {partner.description}
                            </p>

                            <div className="rounded-[8px] border border-[rgba(0,0,0,0.12)] px-5 py-4 flex flex-col gap-2 mt-auto">
                                <span
                                    className="text-[#021521] uppercase font-bold"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "12px",
                                        letterSpacing: "1.2px",
                                    }}
                                >
                                    {partner.box.label}
                                </span>
                                {partner.box.highlight ? (
                                    <div className="flex flex-col gap-1">
                                        <span
                                            className="font-bold text-[#021521]"
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: "32px",
                                                letterSpacing: "-1.4px",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {partner.box.highlight}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: "13px",
                                                lineHeight: "20px",
                                                color: "#737373",
                                            }}
                                        >
                                            {partner.box.body}
                                        </span>
                                    </div>
                                ) : (
                                    <span
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            color: "#737373",
                                        }}
                                    >
                                        {partner.box.body}
                                    </span>
                                )}
                            </div>

                            <a
                                href={partner.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-[#0A0A67] text-white py-4 hover:bg-[#0A0A67]/90 transition-colors"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "13px",
                                    letterSpacing: "2.6px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Start Shopping
                            </a>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
