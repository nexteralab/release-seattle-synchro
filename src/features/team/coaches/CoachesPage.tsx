import { motion } from "framer-motion";
import imgSectionCoaches from "/images/coaches/hero.webp";
import { CtaBanner } from '#/components/CtaBanner'
import { usePublicCoaches } from './hooks/use-coaches'

const vp = { once: true, margin: "-80px" } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const fromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const fromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function CoachSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start animate-pulse">
      <div className="w-full h-[600px] bg-[#f5f5f5]" />
      <div className="flex flex-col gap-4 pt-4">
        <div className="h-8 w-3/4 bg-[#f5f5f5] rounded" />
        <div className="h-5 w-1/2 bg-[#f5f5f5] rounded" />
        <div className="space-y-2 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-[#f5f5f5] rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CoachesPage() {
  const { data: coaches, isLoading, isError } = usePublicCoaches()

  return (
    <div className="w-full">
      {/* Hero imagen */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={imgSectionCoaches}
          alt="Our Coaching Team"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* Hero texto */}
      <section className="p-6 md:px-20 md:py-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
          className="relative z-10 text-center space-y-4 md:space-y-6"
        >
          <motion.h1
            variants={fadeUp}
            className="font-bold text-[#0A0A67] text-[40px] md:text-[70px] tracking-[-1.8px] uppercase leading-[40px] md:leading-[72px]"
          >
            Our Coaching<br />Team
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-medium text-[#737373] text-[16px] md:text-[20px] tracking-[-0.5px] leading-[26px] md:leading-[32px] max-w-2xl mx-auto"
          >
            Meet the dedicated professionals who guide our athletes to excellence
          </motion.p>
        </motion.div>
      </section>

      {/* Coaches */}
      <section className="p-6 md:px-20 md:py-24 bg-white">
        <div className="space-y-24 max-w-screen-lg mx-auto">
          {isLoading && (
            <>
              <CoachSkeleton />
              <CoachSkeleton />
              <CoachSkeleton />
            </>
          )}

          {isError && (
            <p className="text-center text-[#737373] text-[16px] py-16">
              Unable to load coaches at this time. Please try again later.
            </p>
          )}

          {coaches?.map((coach, index) => {
            const isOdd = index % 2 === 1;
            const imgVariant = isOdd ? fromRight : fromLeft;
            const textVariant = isOdd ? fromLeft : fromRight;

            return (
              <div key={coach.id}>
                {index > 0 && (
                  <div className="flex lg:hidden items-center gap-3 mb-20">
                    <div className="flex-1 h-px bg-[#0A0A67]/15" />
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rotate-45 bg-[#0A0A67]/30" />
                      <div className="w-2 h-2 rotate-45 bg-[#0A0A67]" />
                      <div className="w-1 h-1 rotate-45 bg-[#0A0A67]/30" />
                    </div>
                    <div className="flex-1 h-px bg-[#0A0A67]/15" />
                  </div>
                )}

                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  variants={fadeUp}
                  className="block lg:hidden font-bold text-[#0A0A67] text-[28px] tracking-[-1.8px] uppercase mb-4"
                >
                  {coach.name}
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                  {/* Imagen */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    variants={imgVariant}
                    className={`order-1 ${isOdd ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <img
                      src={coach.image_url ?? undefined}
                      alt={coach.name}
                      className="w-full h-[600px] object-cover"
                    />
                  </motion.div>

                  {/* Contenido */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    variants={stagger}
                    className={`order-2 ${isOdd ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center`}
                  >
                    <motion.h2 variants={textVariant} className="hidden lg:block font-bold text-[#0A0A67] text-[28px] md:text-[48px] tracking-[-1.8px] uppercase mb-2">
                      {coach.name}
                    </motion.h2>
                    <motion.p variants={fadeUp} className="font-medium text-[#737373] text-[14px] md:text-[20px] tracking-[-0.5px] mb-2">
                      {coach.title}
                    </motion.p>
                    {coach.email && (
                      <motion.a
                        variants={fadeUp}
                        href={`mailto:${coach.email}`}
                        className="text-[#0A0A67] text-[14px] md:text-[16px] hover:underline mb-2"
                      >
                        {coach.email}
                      </motion.a>
                    )}
                    <motion.p variants={fadeUp} className="text-[#171717] text-[14px] md:text-[18px] leading-[26px] md:leading-[29px] text-justify lg:text-left mb-8">
                      {coach.bio}
                    </motion.p>

                    {coach.specialties?.length > 0 && (
                      <motion.div variants={fadeUp} className="mb-8">
                        <h3 className="font-bold text-[#171717] text-[14px] md:text-[16px] tracking-[1.6px] uppercase mb-4">
                          Specialties
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {coach.specialties.map((specialty, i) => (
                            <span key={i} className="bg-[#F5F5F5] px-4 py-2 font-medium text-[#171717] text-[12px] md:text-[14px]">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {coach.certifications?.length > 0 && (
                      <motion.div variants={fadeUp} className="mb-8">
                        <h3 className="font-bold text-[#171717] text-[14px] md:text-[16px] tracking-[1.6px] uppercase mb-4">
                          Certifications
                        </h3>
                        <ul className="space-y-2">
                          {coach.certifications.map((cert, i) => (
                            <li key={i} className="text-[#737373] text-[16px] leading-[26px] flex items-start gap-2">
                              <span className="text-[#171717] mt-1">•</span>
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner
        heading="Train with the Best"
        description="Our coaching staff is committed to helping you reach your full potential in artistic swimming. Join our programs today."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        image="2"
        alt="Train with the Best coaching staff banner"
      />
    </div>
  );
}
