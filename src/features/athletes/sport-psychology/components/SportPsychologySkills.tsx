import { motion } from "framer-motion";
import {
    Target,
    Eye,
    TrendingUp,
    Crosshair,
    Activity,
    Shield,
    Users,
    type LucideIcon,
} from "lucide-react";

interface Skill {
    icon: LucideIcon;
    title: string;
    points: string[];
}

const skills: Skill[] = [
    {
        icon: Target,
        title: "Goal Setting",
        points: [
            "Creating effective short-term and long-term goals",
            "Developing action plans to achieve objectives",
            "Tracking progress and celebrating milestones",
            "Adjusting goals based on growth and development",
        ],
    },
    {
        icon: Eye,
        title: "Visualization & Mental Imagery",
        points: [
            "Techniques for mental rehearsal of routines",
            "Visualization for skill development and refinement",
            "Creating positive mental images",
            "Using imagery for competition preparation",
        ],
    },
    {
        icon: TrendingUp,
        title: "Confidence Building",
        points: [
            "Developing positive self-talk strategies",
            "Building self-efficacy through mastery experiences",
            "Overcoming self-doubt and negative thoughts",
            "Embracing challenges as growth opportunities",
        ],
    },
    {
        icon: Crosshair,
        title: "Focus & Concentration",
        points: [
            "Attention control techniques",
            "Staying present in the moment",
            "Managing distractions during training and competition",
            "Developing pre-performance routines",
        ],
    },
    {
        icon: Activity,
        title: "Managing Competition Anxiety",
        points: [
            "Understanding and normalizing pre-competition nerves",
            "Relaxation and breathing techniques",
            "Reframing anxiety as excitement and readiness",
            "Developing coping strategies for pressure situations",
        ],
    },
    {
        icon: Shield,
        title: "Resilience & Adversity",
        points: [
            "Bouncing back from setbacks and disappointments",
            "Learning from mistakes and failures",
            "Maintaining motivation during challenging times",
            "Building mental toughness",
        ],
    },
    {
        icon: Users,
        title: "Team Dynamics",
        points: [
            "Communication skills for effective teamwork",
            "Building trust and cohesion",
            "Supporting teammates",
            "Managing conflicts constructively",
        ],
    },
];

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const vp = { once: true, margin: "-60px" } as const;

export function SportPsychologySkills() {
    return (
        <section className="py-24 px-12 md:px-48 bg-[#f5f5f5]" aria-labelledby="skills-heading">
            <div className="max-w-screen-2xl mx-auto space-y-12">
                <motion.h2
                    id="skills-heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-bold text-[#0A0A67] uppercase"
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(22px, 3vw, 36px)",
                        letterSpacing: "-1.8px",
                    }}
                >
                    Mental Skills Resources
                </motion.h2>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.title} skill={skill} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    const Icon = skill.icon;

    return (
        <motion.article
            variants={cardVariant}
            whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
            transition={{ type: "tween", duration: 0.2 }}
            className="bg-white rounded-[10px] p-8 border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.07)] flex flex-col gap-6"
        >
            <div className="flex items-start gap-4">
                <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
                    style={{ background: "rgba(10,10,103,0.06)" }}
                >
                    <Icon size={20} strokeWidth={1.75} color="#0A0A67" aria-hidden="true" />
                </div>
                <div className="flex-1 flex items-start justify-between gap-2">
                    <h3
                        className="font-medium text-[#0A0A67]"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "18px",
                            lineHeight: "26px",
                            letterSpacing: "-0.4px",
                        }}
                    >
                        {skill.title}
                    </h3>
                    <span
                        className="flex-shrink-0 font-bold text-[#0A0A67]/20 leading-none mt-0.5"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "24px",
                            letterSpacing: "-1px",
                        }}
                        aria-hidden="true"
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
            </div>

            <ul className="space-y-2.5 pl-1">
                {skill.points.map((point) => (
                    <li
                        key={point}
                        className="flex items-start gap-2.5"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "22px", color: "#737373" }}
                    >
                        <span
                            className="flex-shrink-0 w-1 h-1 rounded-full bg-[#0A0A67]/40 mt-2"
                            aria-hidden="true"
                        />
                        {point}
                    </li>
                ))}
            </ul>
        </motion.article>
    );
}
