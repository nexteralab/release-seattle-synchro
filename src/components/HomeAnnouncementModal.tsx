import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import announcementImage from "/images/hero_summer.webp";

// ─── Configuración del anuncio ─────────────────────────────────────────────
// Edita aquí cuando cambie el anuncio. Cambia STORAGE_KEY (sufijo de versión)
// para que vuelva a aparecer a quienes ya lo cerraron antes.
const STORAGE_KEY = "ss-announcement-dismissed:summer-camp-2026-v1";
const SHOW_DELAY_MS = 1500;

const EYEBROW = "Limited Spots Available";
const TITLE = "Summer Camp 2026";
const DESCRIPTION =
    "Experience the magic of artistic swimming this summer. World-class coaching for all skill levels in the Pacific Northwest.";
const CTA_LABEL = "Learn More";
const CTA_TO = "/programs/summer-camp";
const IMAGE_ALT = "Seattle Synchro Summer Camp 2026";
// ───────────────────────────────────────────────────────────────────────────

export function HomeAnnouncementModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.localStorage.getItem(STORAGE_KEY) === "1") return;

        const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") dismiss();
        };
        document.addEventListener("keydown", onKey);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    function dismiss() {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, "1");
        }
        setOpen(false);
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="announcement-title"
                    className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <button
                        type="button"
                        aria-label="Close announcement"
                        onClick={dismiss}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
                    />

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative z-10 w-[min(100%,920px)] mx-3 mb-3 md:mb-0 md:mx-6 bg-white overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={dismiss}
                            className="absolute top-4 right-4 z-10 size-9 inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-secondary border border-black/10 transition-colors"
                        >
                            <X size={16} strokeWidth={2} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Image */}
                            <figure className="m-0 relative bg-secondary aspect-[4/3] md:aspect-auto md:min-h-[340px]">
                                <img
                                    src={announcementImage}
                                    alt={IMAGE_ALT}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
                            </figure>

                            {/* Content */}
                            <div className="p-7 md:p-10 flex flex-col gap-5 justify-center">
                                <div className="inline-block self-start px-3 py-1 bg-[#63ac23]">
                                    <span className="font-bold text-white text-[12px] tracking-[1.4px] uppercase">
                                        {EYEBROW}
                                    </span>
                                </div>

                                <h2
                                    id="announcement-title"
                                    className="font-bold text-secondary text-[32px] md:text-[44px] tracking-[-1.8px] uppercase leading-[1.05]"
                                >
                                    {TITLE}
                                </h2>

                                <p className="text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
                                    {DESCRIPTION}
                                </p>

                                <div className="flex flex-wrap gap-3 pt-1">
                                    <Link
                                        to={CTA_TO}
                                        onClick={dismiss}
                                        className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 font-bold text-[13px] tracking-[1.4px] uppercase hover:bg-primary/90 transition-colors"
                                    >
                                        {CTA_LABEL}
                                        <ArrowRight size={14} />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={dismiss}
                                        className="inline-flex items-center px-5 py-3 font-bold text-[13px] tracking-[1.4px] uppercase text-[#737373] hover:text-secondary transition-colors"
                                    >
                                        Not now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
