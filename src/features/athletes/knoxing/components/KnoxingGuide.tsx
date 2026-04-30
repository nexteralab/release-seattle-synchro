import { motion } from "framer-motion";
import { Package, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";

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
    visible: { transition: { staggerChildren: 0.08 } },
};

const supplies: string[] = [
    "Gel (roughly 1–2 tubes) — enough for a single full application",
    "Rat-tail comb for clean parts and precise sections",
    "Firm-bristle brush to smooth the gel flat",
    "Hair net (goes over the gel once set)",
    "Several bobby pins or hair clips to hold sections",
    "Edge control or hairspray for fly-aways and finishing",
    "Paper towels to wipe excess gel from skin and tools",
    "Warm water and a small bowl to thin the gel if needed",
];

const steps: { title: string; items: string[] }[] = [
    {
        title: "Prepare Your Hair",
        items: [
            "Start with clean, slightly damp hair — gel adheres best when hair is not bone-dry.",
            "Detangle thoroughly with a comb from ends to roots to avoid bumps under the gel.",
            "Decide on your part; mark it cleanly with the rat-tail comb.",
            "Section hair into manageable parts and secure loose sections with clips.",
        ],
    },
    {
        title: "Apply the Gel",
        items: [
            "Scoop a generous amount of gel — more than you think you need for the first layer.",
            "Work gel evenly through each section using your fingers first, then smooth with the brush.",
            "Brush in one continuous direction toward the bun placement — no zig-zagging.",
            "Repeat with a second, thinner coat and smooth out any ridges or air bubbles.",
            "Gather all hair tightly and twist or braid it up into the bun position.",
        ],
    },
    {
        title: "Set and Secure",
        items: [
            "Wrap the hair net snugly over the bun and secure with bobby pins around the perimeter.",
            "Apply a thin layer of gel over the hair net to flatten it flush against the bun.",
            "Use edge control or extra gel on the hairline and any fly-aways.",
            "Let the gel set for at least 15–20 minutes before entering the water.",
            "Finish with a light coat of hairspray to lock everything in place.",
        ],
    },
];

const resources: { label: string; href: string }[] = [
    { label: "Knoxing tutorial video", href: "#" },
    { label: "Recommended gel brands", href: "#" },
    { label: "Hair care after competition", href: "#" },
];

export function KnoxingGuide() {
    return (
        <div className="w-full">
            {/* Intro */}
            <section className="py-24 px-12 md:px-48 bg-white" aria-labelledby="knoxing-intro-heading">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    variants={stagger}
                    className="max-w-screen-2xl mx-auto space-y-8"
                >
                    <motion.h2
                        id="knoxing-intro-heading"
                        variants={fadeUp}
                        className="font-bold text-[#0A0A67] uppercase"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "clamp(22px, 3.5vw, 42px)",
                            letterSpacing: "-2.1px",
                            lineHeight: 1.1,
                        }}
                    >
                        How to Gel Your Hair<br />for a Synchronized Swimming Meet
                    </motion.h2>

                    <motion.div variants={fadeUp} className="w-10 h-1 bg-[#0A0A67]" />

                    <motion.p
                        variants={fadeUp}
                        className="max-w-3xl"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: "#737373",
                        }}
                    >
                        Gelling — or "knoxing" — is an essential skill for every artistic swimmer. A well-set
                        bun stays secure through an entire routine, keeps hair out of your face, and gives your
                        performance a polished, competition-ready look. This guide walks you through everything
                        you need to achieve a rock-solid hold that will last from warm-up to the final bow.
                    </motion.p>
                </motion.div>
            </section>

            {/* What you'll need */}
            <section className="py-24 px-12 md:px-48 bg-[#f5f5f5]" aria-labelledby="supplies-heading">
                <div className="max-w-screen-2xl mx-auto space-y-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        variants={stagger}
                        className="flex items-center gap-4"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center justify-center w-10 h-10 rounded-lg"
                            style={{ background: "rgba(10,10,103,0.08)" }}
                        >
                            <Package size={20} strokeWidth={1.75} color="#0A0A67" aria-hidden="true" />
                        </motion.div>
                        <motion.h2
                            id="supplies-heading"
                            variants={fadeUp}
                            className="font-bold text-[#0A0A67] uppercase"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(20px, 2.5vw, 32px)",
                                letterSpacing: "-1.6px",
                            }}
                        >
                            Before You Start — What You'll Need
                        </motion.h2>
                    </motion.div>

                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                        {supplies.map((item, i) => (
                            <motion.li
                                key={i}
                                variants={fadeUp}
                                className="flex items-start gap-3 bg-white rounded-[10px] px-5 py-4 border border-[rgba(0,0,0,0.07)] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                            >
                                <span
                                    className="flex-shrink-0 font-bold text-[#0A0A67]/25 leading-none mt-0.5"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "18px",
                                        letterSpacing: "-0.5px",
                                    }}
                                    aria-hidden="true"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        color: "#737373",
                                    }}
                                >
                                    {item}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* Step-by-step */}
            <section className="py-24 px-12 md:px-48 bg-white" aria-labelledby="steps-heading">
                <div className="max-w-screen-2xl mx-auto space-y-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        variants={stagger}
                        className="flex items-center gap-4"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center justify-center w-10 h-10 rounded-lg"
                            style={{ background: "rgba(10,10,103,0.08)" }}
                        >
                            <CheckCircle2 size={20} strokeWidth={1.75} color="#0A0A67" aria-hidden="true" />
                        </motion.div>
                        <motion.h2
                            id="steps-heading"
                            variants={fadeUp}
                            className="font-bold text-[#0A0A67] uppercase"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(20px, 2.5vw, 32px)",
                                letterSpacing: "-1.6px",
                            }}
                        >
                            Ready to Get Started?
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        variants={stagger}
                        className="space-y-6"
                    >
                        {steps.map((step, si) => (
                            <motion.div
                                key={step.title}
                                variants={fadeUp}
                                className="rounded-[10px] border border-[rgba(0,0,0,0.08)] overflow-hidden"
                            >
                                {/* Step header */}
                                <div
                                    className="flex items-center gap-5 px-8 py-5"
                                    style={{ background: "#0A0A67" }}
                                >
                                    <span
                                        className="font-bold text-white/30 leading-none"
                                        style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: "28px",
                                            letterSpacing: "-1px",
                                        }}
                                        aria-hidden="true"
                                    >
                                        {String(si + 1).padStart(2, "0")}
                                    </span>
                                    <h3
                                        className="font-bold text-white uppercase"
                                        style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: "16px",
                                            letterSpacing: "1.6px",
                                        }}
                                    >
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Step items */}
                                <ul className="divide-y divide-[rgba(0,0,0,0.05)] bg-white">
                                    {step.items.map((item, ii) => (
                                        <li
                                            key={ii}
                                            className="flex items-start gap-4 px-8 py-4"
                                        >
                                            <span
                                                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                                style={{ background: "rgba(10,10,103,0.08)" }}
                                                aria-hidden="true"
                                            >
                                                <span
                                                    className="font-bold text-[#0A0A67]"
                                                    style={{ fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif" }}
                                                >
                                                    {ii + 1}
                                                </span>
                                            </span>
                                            <p
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: "15px",
                                                    lineHeight: "24px",
                                                    color: "#737373",
                                                }}
                                            >
                                                {item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Last but not least */}
            <section className="py-24 px-12 md:px-48 bg-[#f5f5f5]" aria-labelledby="resources-heading">
                <div className="max-w-screen-2xl mx-auto space-y-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        variants={stagger}
                        className="flex items-center gap-4"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center justify-center w-10 h-10 rounded-lg"
                            style={{ background: "rgba(10,10,103,0.08)" }}
                        >
                            <Sparkles size={20} strokeWidth={1.75} color="#0A0A67" aria-hidden="true" />
                        </motion.div>
                        <motion.h2
                            id="resources-heading"
                            variants={fadeUp}
                            className="font-bold text-[#0A0A67] uppercase"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(20px, 2.5vw, 32px)",
                                letterSpacing: "-1.6px",
                            }}
                        >
                            Last But Not Least!
                        </motion.h2>
                    </motion.div>

                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        variants={fadeUp}
                        className="max-w-2xl"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: "#737373",
                        }}
                    >
                        Practice makes perfect! The first time you gel your hair can feel tricky, but with a
                        little patience it becomes second nature. Don't hesitate to ask a teammate or coach for
                        help. Below are some helpful resources to keep your technique sharp.
                    </motion.p>

                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        variants={stagger}
                        className="flex flex-col gap-3"
                    >
                        {resources.map((res) => (
                            <motion.li key={res.label} variants={fadeUp}>
                                <a
                                    href={res.href}
                                    className="inline-flex items-center gap-2 group"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "15px",
                                        color: "#0A0A67",
                                    }}
                                >
                                    <ExternalLink
                                        size={14}
                                        strokeWidth={2}
                                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                                        aria-hidden="true"
                                    />
                                    <span className="underline underline-offset-4 decoration-[#0A0A67]/30 group-hover:decoration-[#0A0A67] transition-all">
                                        {res.label}
                                    </span>
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>
        </div>
    );
}
