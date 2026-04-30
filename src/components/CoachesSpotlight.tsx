import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

import { coaches } from "@/features/team/coaches/CoachesPage";

const imgPlaceholder = "https://images.unsplash.com/photo-1581423880338-b9e4f9718df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwYXRobGV0ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTE1NDI2MXww&ixlib=rb-4.1.0&q=80&w=1080";


export function CoachesSpotlight() {
    const [active, setActive] = useState(0);
    const coach = coaches[active];

    return (
        <div className="flex flex-col gap-8">
            {/* Thumbnails — arriba en mobile, abajo en desktop */}
            <div className="order-first lg:order-last flex items-center gap-3 overflow-x-auto px-2 py-2 lg:py-1 lg:pb-1 lg:flex-wrap">
                {coaches.map((c, i) => (
                    <button
                        key={c.name}
                        onClick={() => setActive(i)}
                        aria-label={`Ver ${c.name}`}
                        aria-pressed={i === active}
                        className="relative flex-shrink-0 w-14 h-14 rounded-full focus-visible:outline-2 focus-visible:outline-[#0A0A67]"
                    >
                        <motion.span
                            className="absolute inset-0 rounded-full border-2 border-[#0A0A67] pointer-events-none"
                            style={{ margin: "-3px" }}
                            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 0.85 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                        />
                        <img
                            src={c.image || imgPlaceholder}
                            alt={c.name}
                            className="w-full h-full object-cover object-top rounded-full transition-[filter] duration-300"
                            style={{ filter: i === active ? "none" : "grayscale(50%) opacity(0.7)" }}
                        />
                    </button>
                ))}

                <Link
                    to="/team/coaches"
                    className="ml-auto flex-shrink-0 inline-flex items-center gap-2 text-[#0A0A67] font-bold text-[13px] tracking-[1.3px] uppercase hover:gap-3 transition-all"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    Meet All Coaches
                    <ArrowRight size={14} aria-hidden="true" />
                </Link>
            </div>

            {/* Main spotlight */}
            <div className="order-last lg:order-first grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-[10px] min-h-[520px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                {/* Photo — 3/5 columns */}
                <div className="relative lg:col-span-3 h-90 lg:h-auto overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={active}
                            src={coach.image || imgPlaceholder}
                            alt={coach.name}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </AnimatePresence>

                    {/* Gradient overlay bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent lg:hidden" />
                </div>

                {/* Info — 2/5 columns */}
                <div className="lg:col-span-2 flex flex-col justify-between p-6 lg:p-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                            className="space-y-5 flex-1"
                        >
                            {/* Index pill */}
                            <span
                                className="font-bold text-[#0A0A67]/20 leading-none"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "36px",
                                    letterSpacing: "-1.5px",
                                }}
                                aria-hidden="true"
                            >
                                {String(active + 1).padStart(2, "0")} / {String(coaches.length).padStart(2, "0")}
                            </span>

                            <div className="space-y-1">
                                <h3
                                    className="font-bold text-[#0A0A67] uppercase"
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "clamp(22px, 2.5vw, 30px)",
                                        letterSpacing: "-1.4px",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {coach.name}
                                </h3>
                                <p
                                    className="font-medium text-[#737373]"
                                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                                >
                                    {coach.title}
                                </p>
                            </div>

                            <div className="w-8 h-px bg-[#0A0A67]/20" />

                            <p
                                className="text-[#737373] leading-relaxed"
                                style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "22px" }}
                            >
                                {coach.bio}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {coach.specialties.map((s) => (
                                    <span
                                        key={s}
                                        className="px-3 py-1 rounded-full text-[#0A0A67]"
                                        style={{
                                            background: "rgba(10,10,103,0.07)",
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: "12px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={`mailto:${coach.email}`}
                                className="inline-flex items-center gap-2 text-[#0A0A67]/60 hover:text-[#0A0A67] transition-colors"
                                style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px" }}
                            >
                                <Mail size={13} strokeWidth={1.75} aria-hidden="true" />
                                {coach.email}
                            </a>
                        </motion.div>
                    </AnimatePresence>

                    <Link
                        to="/team/coaches"
                        className="mt-8 inline-flex items-center gap-2 self-start bg-[#0A0A67] text-white px-6 py-3 font-bold text-[13px] tracking-[1.3px] uppercase hover:bg-[#0A0A67]/90 transition-colors"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Full Profile
                        <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                </div>
            </div>

        </div>
    );
}
