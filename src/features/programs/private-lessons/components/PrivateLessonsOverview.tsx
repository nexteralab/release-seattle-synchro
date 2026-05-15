import { Link } from "@tanstack/react-router";

export function PrivateLessonsOverview() {
    return (
        <section className="p-6 md:px-12 md:py-24 bg-white" aria-labelledby="private-lessons-heading">
            <div className="max-w-screen-lg mx-auto space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h1
                        id="private-lessons-heading"
                        className="font-bold text-secondary text-[48px] tracking-[-2.4px] uppercase"
                    >
                        Private Lessons
                    </h1>
                    <Link
                        to="/contact-us"
                        className="bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
                    >
                        Request a Lesson
                    </Link>
                </div>
                <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px]">
                    Coaches are available on a limited basis for private lessons. They are an excellent
                    way to focus on specific skills, drills, and new movements without the distractions
                    of a normal practice.
                </p>
                <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px]">
                    Private lessons do not replace the benefits of scheduled practice, however, and
                    should be used as supplements to proper training never a substitute.
                </p>
            </div>
        </section>
    )
}
