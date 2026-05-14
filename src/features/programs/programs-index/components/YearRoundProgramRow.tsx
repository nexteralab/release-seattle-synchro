import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const t = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };
const vp = { once: true, margin: "-80px" };

export interface SubProgramChip {
    label: string;
    /** Hash anchor on the program detail page, without `#`. */
    hash: string;
}

export interface YearRoundProgramRowProps {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    /** Detail page route, e.g. "/programs/beginner". */
    to: string;
    subPrograms: SubProgramChip[];
    /** When true, image renders on the right (md+). */
    imageRight?: boolean;
    /** Background color for the section. */
    background?: "white" | "muted";
}

export function YearRoundProgramRow({
    eyebrow,
    title,
    description,
    image,
    imageAlt,
    to,
    subPrograms,
    imageRight = false,
    background = "white",
}: YearRoundProgramRowProps) {
    const bgClass = background === "white" ? "bg-white" : "bg-[#f5f5f5]";

    return (
        <section className={`${bgClass} p-6 md:px-12 md:py-24`} aria-label={title}>
            <div className="max-w-screen-lg mx-auto">
                <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${imageRight ? "" : "lg:[&>figure]:order-2"
                        }`}
                >
                    <motion.figure
                        initial={{ opacity: 0, x: imageRight ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={vp}
                        transition={t}
                        className="m-0 overflow-hidden"
                    >
                        <img
                            src={image}
                            alt={imageAlt}
                            className="w-full h-[280px] md:h-[440px] object-cover"
                            loading="lazy"
                        />
                    </motion.figure>

                    <motion.div
                        initial={{ opacity: 0, x: imageRight ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={vp}
                        transition={{ ...t, delay: 0.1 }}
                        className="flex flex-col gap-5"
                    >
                        <span className="inline-block self-start px-3 py-1 bg-primary text-white font-bold text-[12px] tracking-[1.4px] uppercase">
                            {eyebrow}
                        </span>

                        <h2 className="font-bold text-secondary text-[36px] md:text-[56px] tracking-[-2.4px] uppercase leading-[1.05]">
                            {title}
                        </h2>

                        <p className="text-[#737373] text-[16px] md:text-[17px] leading-[28px] max-w-xl">
                            {description}
                        </p>

                        <ul className="flex flex-wrap gap-2 list-none p-0 m-0 pt-2" aria-label={`${title} sub-programs`}>
                            {subPrograms.map((sp) => (
                                <li key={sp.hash}>
                                    <Link
                                        to={to}
                                        hash={sp.hash}
                                        className="group inline-flex items-center gap-2 border border-secondary/15 hover:border-primary bg-white px-4 py-2 text-secondary hover:text-primary text-[13px] tracking-[0.5px] font-medium transition-colors"
                                    >
                                        {sp.label}
                                        <ArrowRight
                                            size={12}
                                            className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-3">
                            <Link
                                to={to}
                                className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 font-bold text-[13px] tracking-[1.4px] uppercase hover:bg-primary hover:text-white transition-colors"
                            >
                                Learn More
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
