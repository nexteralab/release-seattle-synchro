import { Link } from "@tanstack/react-router";

export function ShowOverview() {
    return (
        <section className="py-24 px-12 md:px-48 bg-white" aria-labelledby="overview-heading">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2
                        id="overview-heading"
                        className="font-bold text-secondary text-[48px] tracking-[-2.4px] uppercase"
                    >
                        Shows
                    </h2>
                    <Link
                        to="/contact-us"
                        className="bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
                <p className="text-[#171717] text-[18px] leading-[26px]">
                    We offer artistic swimming shows ideal for sports events, celebrations, festivals, and special occasions.
                </p>
                <p className="text-[#171717] text-[18px] leading-[26px]">
                    Our swimmers combine technique, music, and artistic expression to create a unique visual experience in the water, featuring synchronized choreography and a high athletic level.
                </p>
                <p className="text-[#171717] text-[18px] leading-[26px]">
                    The show can be adapted to different types of events and audiences, providing an elegant, dynamic, and entertaining performance.
                </p>
            </div>
        </section>
    )
}