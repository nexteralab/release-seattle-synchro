import { motion } from "motion/react";

const t = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };

export function ProgramsIndexHero() {
    return (
        <section
            className="relative bg-secondary text-white overflow-hidden"
            aria-label="Programs intro"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A67] via-secondary to-[#0A0A67]/80" />
            <div className="absolute -top-20 -right-20 size-[420px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-[420px] rounded-full bg-primary/10 blur-3xl" />

            <div className="relative max-w-screen-lg mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col items-start gap-6">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={t}
                    className="inline-block px-3 py-1 bg-primary text-white font-bold text-[12px] tracking-[1.4px] uppercase"
                >
                    Pathways for every swimmer
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...t, delay: 0.08 }}
                    className="font-bold text-white text-[56px] md:text-[96px] tracking-[-3.6px] uppercase leading-[1]"
                >
                    Programs
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...t, delay: 0.16 }}
                    className="text-white/80 text-[16px] md:text-[20px] leading-[30px] max-w-2xl"
                >
                    From your first day in the water to elite competition. Year-round commitment
                    programs, seasonal camps, and one-on-one coaching — choose the path that fits.
                </motion.p>
            </div>
        </section>
    );
}
