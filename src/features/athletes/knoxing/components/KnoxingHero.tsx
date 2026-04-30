import { motion } from "framer-motion";

export function KnoxingHero() {
    return (
        <section
            className="relative flex items-center justify-center overflow-hidden"
            style={{ minHeight: "50vh", background: "#0A0A67" }}
            aria-label="Knoxing hero"
        >
            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.8) 79px, rgba(255,255,255,0.8) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.8) 79px, rgba(255,255,255,0.8) 80px)",
                }}
            />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0A0A67] to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 flex flex-col items-center text-center px-12 md:px-48 py-24 gap-6"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-bold text-white uppercase leading-none"
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(42px, 6vw, 72px)",
                        letterSpacing: "-3.6px",
                    }}
                >
                    Knoxing
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-16 h-px bg-white/40"
                />

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="text-white/70 text-center"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                    }}
                >
                    Hair preparation for artistic swimmers
                </motion.p>
            </motion.div>
        </section>
    );
}
