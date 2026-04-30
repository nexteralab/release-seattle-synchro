import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const vp = { once: true, margin: "-60px" } as const;

export function SportPsychologyIntro() {
    return (
        <section className="py-24 px-12 md:px-48 bg-white" aria-labelledby="mental-game-heading">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                variants={stagger}
                className="max-w-screen-2xl mx-auto space-y-8"
            >
                <motion.h2
                    id="mental-game-heading"
                    variants={fadeInUp}
                    className="font-bold text-[#0A0A67] uppercase"
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 4vw, 48px)",
                        letterSpacing: "-2.4px",
                        lineHeight: 1.1,
                    }}
                >
                    Develop Your Mental Game
                </motion.h2>

                <motion.div variants={fadeInUp} className="w-10 h-1 bg-[#0A0A67]" />

                <motion.p
                    variants={fadeInUp}
                    className="max-w-3xl"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        lineHeight: "26px",
                        color: "#737373",
                    }}
                >
                    In order to perform well athletically, swimmers must develop physical and psychological skills.
                    From concentration and visualization to motivation and stress management. It is important that
                    each athlete is aware of their mental game to ensure optimal performance as well as mental
                    well-being. Many of these skills are naturally developed through the practice of the sport.
                    However, here you will find helpful links to articles and videos.
                </motion.p>
            </motion.div>
        </section>
    );
}
