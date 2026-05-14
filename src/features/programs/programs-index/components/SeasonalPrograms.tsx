import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import summerCampImg from "/images/hero_summer.webp";
import showsImg from "/images/shows_hero.jpg";
import eliteClinicImg from "/images/elite-clinc.webp";
import freeTryImg from "/images/image_free_try.webp";
import privateLessonsImg from "/images/program_2.jpg";

const t = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };
const vp = { once: true, margin: "-80px" };

interface SeasonalProgram {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    to: string;
    badge?: string;
}

const programs: SeasonalProgram[] = [
    {
        title: "Summer Camp",
        description:
            "Intensive summer training for swimmers of all levels — world-class coaching in the Pacific Northwest.",
        image: summerCampImg,
        imageAlt: "Seattle Synchro Summer Camp",
        to: "/programs/summer-camp",
        badge: "Seasonal",
    },
    {
        title: "Private Lessons",
        description:
            "One-on-one coaching to sharpen specific skills, drills, and new movements. A supplement to regular training.",
        image: privateLessonsImg,
        imageAlt: "Private artistic swimming lessons",
        to: "/programs/private-lessons",
        badge: "One-on-One",
    },
    {
        title: "Elite Clinic",
        description:
            "Short-format clinics with elite coaches focused on specific technical and artistic skills.",
        image: eliteClinicImg,
        imageAlt: "Seattle Synchro Elite Clinic",
        to: "/programs/elite-clinic",
        badge: "Clinic",
    },
    {
        title: "Shows",
        description:
            "Choreographed water performances combining technique, music, and artistic expression for events and celebrations.",
        image: showsImg,
        imageAlt: "Seattle Synchro Shows performance",
        to: "/programs/shows",
        badge: "Event",
    },
    {
        title: "Free Try",
        description:
            "Curious about artistic swimming? Try a free introductory class and see if it's the right fit.",
        image: freeTryImg,
        imageAlt: "Free Try class",
        to: "/programs/free-try",
        badge: "Free",
    },
];

export function SeasonalPrograms() {
    return (
        <section className="bg-[#f5f5f5] p-6 md:px-12 md:py-24" aria-labelledby="seasonal-heading">
            <div className="max-w-screen-lg mx-auto space-y-12">
                <div className="space-y-4 max-w-2xl">
                    <span className="inline-block px-3 py-1 bg-secondary text-white font-bold text-[12px] tracking-[1.4px] uppercase">
                        Seasonal & Special
                    </span>
                    <h2
                        id="seasonal-heading"
                        className="font-bold text-secondary text-[36px] md:text-[56px] tracking-[-2.4px] uppercase leading-[1.05]"
                    >
                        Camps, Clinics<br />& One-on-One
                    </h2>
                    <p className="text-[#737373] text-[16px] md:text-[17px] leading-[28px]">
                        Short-format programs and events that complement year-round training — perfect
                        as a starting point or as a supplement to regular practice.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((p, idx) => (
                        <motion.article
                            key={p.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={vp}
                            transition={{ ...t, delay: idx * 0.06 }}
                            className="bg-white group flex flex-col"
                        >
                            <Link to={p.to} className="block">
                                <figure className="m-0 relative overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.imageAlt}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {p.badge && (
                                        <span className="absolute top-3 left-3 bg-white text-secondary px-2.5 py-1 text-[10px] tracking-[1.2px] uppercase font-bold">
                                            {p.badge}
                                        </span>
                                    )}
                                </figure>
                                <div className="p-6 flex flex-col gap-3 flex-1">
                                    <h3 className="font-bold text-secondary text-[22px] tracking-[-1px] uppercase">
                                        {p.title}
                                    </h3>
                                    <p className="text-[#737373] text-[14px] leading-[24px] flex-1">
                                        {p.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 font-bold text-secondary group-hover:text-primary text-[12px] tracking-[1.2px] uppercase pt-2 group-hover:gap-3 transition-all">
                                        Learn More
                                        <ArrowRight size={12} />
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
