import { motion } from "framer-motion";
import imgSectionCoaches from "/images/coaches/hero.webp";
import imgDanielaGarmendia from "/images/coaches/daniela.webp";
import imgPatriciaCamaran from "/images/coaches/patricia.webp";
import imgMariaMoreno from "/images/coaches/maria_moreno.webp";
import imgLaceyEthier from "/images/coaches/lacey.webp";
import imgYukiMaekawa from "/images/coaches/yuki.webp";
import imgIvyHuang from "/images/coaches/ivy.webp";
import imgMayaReistad from "/images/coaches/maya.webp";
import imgGiordanaVentura from "/images/coaches/giordana.webp";
import imgSophieLin from "/images/coaches/sophie.webp";
import imgCarlieVasquez from "/images/coaches/carlie_vasquez.webp";
import { CtaBanner } from '#/components/CtaBanner'
import imgClaireEvans from "/images/coaches/claire_evans.webp";

interface Coach {
  id: number;
  name: string;
  title: string;
  email: string | null | undefined;
  bio: string;
  specialties: string[];
  certifications: string[];
  image: string;
}

export const coaches: Coach[] = [
  {
    id: 1,
    name: "Daniela Garmendia",
    title: "Head Coach & Owner",
    email: "info@seattlesynchro.com",
    bio: "Daniela is the Club's Head Coach and owner. She coaches a variety of programs and leads the 13-15 Youth Squad. Originally from Venezuela, Daniela competed internationally as part of the Venezuelan national team. In 2016 had her last appearance representing her country at the Olympic Qualifiers in Rio 2016. She also swam collegiate synchro at Lindenwood University where her team took home the title in 2014 and in 2015 won Senior Nationals. In 2017, she graduated with a Bachelor Degree in Athletic training and moved to the Northwest. Daniela also served as the Assistant Coach for the Junior National Team 2019 and again in 2022 for Junior Worlds. In addition to coaching, Daniela is a personal trainer. She enjoys choreographing, dancing, and has a particular interest in the developing of emotional intelligence through sports. Her hobbies are snowboarding with her husband Camran, hiking, and dancing.",
    certifications: ["Level 3 USA Artistic Swimming Coach", "DTC 2 STC 2", "Judge L 2F", "USA Artistic Swimming Skill Assessor", "Bachelor Degree in Athletic Training", "2025 West Zone Coach of the Year"],
    specialties: ["Choreographer", "Emotional Intelligence", "Artistic Impression", "Music Editor"],
    image: imgDanielaGarmendia,
  },
  {
    id: 2,
    name: "Patricia Camaran (Paty)",
    title: "Assistant Coach - Youth Team Lead",
    email: null,
    bio: "Patricia Camaran (Paty) is one of the club's assistant coaches and serves as lead coach for the Youth Team. Paty is a professional kinesiologist with over 10 years of experience. Her journey in the water began with artistic swimming, where she represented Venezuela internationally (2014-2015). More recently, she coached the Chilean National Artistic Swimming Team (2023-2024), attending the World Aquatics Championships in Fukuoka and Doha, as well as the 2023 Pan American Games. In addition to being a swimming instructor, she specializes in working with neurodivergent children. Paty enjoys spending her free time working out and watching podcasts.",
    certifications: ["Level 3 USA Artistic Swimming Coach", "DTC 2 STC 2", "Judge L 1F", "Bachelor Degree in Physical Therapy"],
    specialties: ["Neurodivergent Children", "Kinesiology"],
    image: imgPatriciaCamaran,
  },
  {
    id: 3,
    name: "Maria Romero (Coach Mafer)",
    title: "Assistant Coach - Junior Team Lead",
    email: null,
    bio: "Maria is one of the club's assistant coaches and serves as lead coach for the Junior Team. Maria Fernanda Romero Ochoa, a former member of the Venezuelan National artistic swimming team, has achieved excellence both as an athlete and a coach. She secured multiple medals in international competitions, including the Central American and South American championships. Served as head coach for the Elite Club for a year, focusing on enhancing athletes' basic skills. In 2021, Maria earned her bachelor's degree in physical therapy and worked with pediatric and geriatric patients for three years. Beyond her professional pursuits, she enjoys quality time with family, and loves CrossFit and dance. Maria's journey is a fusion of dedication and passion for artistry and physical vitality.",
    certifications: ["Level 3 USA Artistic Swimming Coach", "DTC 2 STC 2", "Judge L 1F"],
    specialties: ["Choreographer", "Nutrition"],
    image: imgMariaMoreno,
  },
  {
    id: 4,
    name: "Lacey Ethier",
    title: "Intermediate Lead Coach",
    email: null,
    bio: "Lacey Ethier has been an athlete, owner, and still serves as a coach for Seattle Synchro. Lacey has been coaching since 2007. She swam for Seattle Synchro from 1998-2002 and competed both nationally and internationally as well as at the 2003 Olympic Trials. Lacey owned the club from 2011 to 2022 and has been the foundation of our success. Ethier has served as assistant coach to the 12& U National team in 2012. Lacey is also the current Pacific Northwest Association Administrative Chair. She lives in Redmond with her husband Vincent, children Vivienne and Archer. Produced multiple national team athletes and two Olympic athletes.",
    certifications: ["Level 3 USA Artistic Swimming Coach", "Level 3F USA Artistic Swimming Judge", "USA Artistic Swimming Skill Assessor"],
    specialties: ["Olympic Trials Experience", "PNA Administrative Chair"],
    image: imgLaceyEthier,
  },
  {
    id: 5,
    name: "Jocilyn Sayler",
    title: "Junior Lead Coach",
    email: null,
    bio: "Jocilyn has coached for Seattle since 2010 and assists our junior team. Jocilyn competed for the majority of her synchro career at Seattle where she swam at several national level meets and US Opens. She also swam for WAVE Aquatics and high school swim teams, where she competed at WIAA State Championships in medley and backstroke events. She has enjoyed working with athletes both at home and abroad develop their talents and qualify for national teams. Her athletes consistently place in finals at Junior Olympics. Jocilyn has served as a coach for the US National Team, US National Team Program Manager and has a Master's degree in Sports Industry Management from Georgetown University. Jocilyn also serves as the Officials Chair for the Pacific Northwest Association and Vice President of Member Development for USA Artistic Swimming as part of the Board of Directors. Produced multiple national team athletes and two Olympic athletes.",
    certifications: ["Level 3 USA Artistic Swimming Coach", "Level 3 Judge", "Master's Degree in Sports Industry Management"],
    specialties: ["US National Team Experience", "USA Artistic Swimming Board of Directors"],
    image: "https://images.unsplash.com/photo-1581423880338-b9e4f9718df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwYXRobGV0ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTE1NDI2MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    name: "Yuki Maekawa",
    title: "Age Group Coach",
    email: null,
    bio: "Yuki Maekawa is Seattle Synchro's longest serving coach, having coached for the club since 1991. She will continue to assist a variety of teams throughout the year. She brings a vast wealth of knowledge to Seattle. Yuki was a member of the Japanese National team during the 1970s and in 2006 was awarded the United States Age Group Coach of the Year award. During her time at Seattle Synchro she has consistently placed swimmers in finals in both national, and international competition. Her daughters also swam for Seattle and went on to train at Stanford University, the University of Incarnate Word and Team USA. In addition to working with Seattle Synchro age groupers, Yuki also coaches a masters synchro program based on the eastside. She currently lives in Tukwila with her husband Zen and she enjoys traveling to Japan to visit her family. Produced multiple national team athletes and two Olympic athletes.",
    certifications: ["Level 3 USA Artistic Swimming Coach", "2006 US Age Group Coach of the Year"],
    specialties: ["Age Group Programs", "Japanese National Team Member", "33+ Years Experience", "Figures"],
    image: imgYukiMaekawa,
  },
  {
    id: 7,
    name: "Carlie Vasquez",
    title: "Swimming & Strengthening Coach",
    email: null,
    bio: "Carlie has been coaching for over 10 years. She has helped a number of athletes achieve great feats and get them at elite levels. She has a degree as an exercise specialist and uses that to create dryland workouts for teams and individuals. She currently coaches for Wave aquatics swimming and is the head coach for the High School team. She also works helping clients with aquatic therapeutic exercises and teaching kids on the spectrum how to swim. She has travelled to China while coaching a team of Washington State's elite athletes at an international meet.",
    specialties: ["Swimming Technique", "Head Coach for the High School team"],
    certifications: [],
    image: imgCarlieVasquez,
  },
  {
    id: 8,
    name: "Claire Evans",
    title: "Age Group Coach",
    email: null,
    bio: "Claire has been with the team since 2022, primarily helping out with the age group teams. Claire swam for the Pirouettes of Texas in Dallas for her entire age group career, and as a Pirouette was a South Zone champion in team, duet, and solo. Claire moved to Seattle from Nashville, TN, where she pursued a PhD in Political Science. Claire now works in Seattle at King County Metro Transit as a social science researcher.",
    image: imgClaireEvans,
    specialties: ["Political Science"],
    certifications: ["Level 3 USA Artistic Swimming Coach", "PhD in Political Science"],
  },
  {
    id: 9,
    name: "Ivy Huang",
    title: "Assistant Youth & 12U Coach",
    email: null,
    bio: "Ivy is a former athlete of Seattle Synchro, swimming with the club for 10 years. She has competed and medaled in numerous competitions, including Junior Olympics, Junior Nationals, and US Opens. She recently moved back to the Seattle area after finishing her undergraduate degree in Neuroscience at Northwestern University. Ivy will assist the youth and 12u teams for the 2024-2025 season.",
    image: imgIvyHuang,
    specialties: ["National competitor"],
    certifications: [],
  },
  {
    id: 10,
    name: "Maya Reistad",
    title: "Athlete & Novice Lead Coach",
    email: null,
    bio: "Maya Reistad, a 16-year-old swimmer, has been with Seattle Synchro for 8 years, advancing from novice to the junior age group. She has competed in numerous Junior Olympic and National competitions. Maya began assisting with coaching in her 6th year and started leading summer camps at Pro Club at age 14. Last year, she served as the novice coach for Seattle Synchro and plans to continue. She was also awarded club athlete of the year in 2024. Senior athlete and will graduate in 2026.",
    certifications: ["2024 Club Athlete of the Year"],
    image: imgMayaReistad,
    specialties: ["Junior Age Group", "National Competitor", "Gold Medalist at Junior Olympic Championship"],
  },
  {
    id: 11,
    name: "Giordana Ventura",
    title: "Intermediate & Novice Assistant Coach",
    email: null,
    bio: "Giordana has been coaching for three seasons and is the assistant coach of intermediate and novice teams. She swam with Seattle Synchro for 6 years. During that time, she learned valuable lessons about perseverance, respect, coordination, power, and teamwork. Although she no longer participates as a swimmer, Giordana now coaches, which allows her to continue learning from the sport while also teaching others. Senior athlete and will graduate in 2026.",
    image: imgGiordanaVentura,
    specialties: [],
    certifications: [],
  },
  {
    id: 12,
    name: "Sophie Lin",
    title: "Athlete & Novice Assistant Coach",
    email: null,
    bio: "Sophie's synchro journey started 8 years ago, and she is a member of the junior team at Seattle Synchro. She has competed at numerous nation-wide competitions and been invited to All-Star Camp and Elite Camp. Her team won gold at the 2023 and 2024 Junior Olympics Championships. Sophie has co-led and helped coach summer camps, summer conditioning, and 12U solos and duet. When she's not in the pool, Sophie enjoys baking, reading, solving puzzles, listening to music, making cards, and volunteering.",
    image: imgSophieLin,
    certifications: ["Level 2 Coach", "Judge L2", "DTC 1", "Pacific Northwest Athlete Representative", "2026 West Zone Athlete of the Year", "2023 & 2025 Athlete of the Year, Seattle Synchronized Swim Team", "2025 6th Place Solo & Team, Pan American Championship", "2023 & 2024 Gold Medalist at Junior Olympics Championship"],
    specialties: ["National Competitor"],
  },
];

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

export function CoachesPage() {
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

      {/* Lead Coaches */}
      <section className="p-6 md:px-20 md:py-24 bg-white">
        <div className="space-y-24 max-w-screen-lg mx-auto">
          {coaches.map((coach, index) => {
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
                {/* Nombre visible solo en mobile, encima de la foto */}
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  variants={fadeUp}
                  className="block lg:hidden font-bold text-[#0A0A67] text-[28px] tracking-[-1.8px] uppercase mb-4"
                >
                  {coach.name}
                </motion.h2>

                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start"
                >
                  {/* Imagen */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    variants={imgVariant}
                    className={`order-1 ${isOdd ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <img
                      src={coach.image}
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
                    <motion.a
                      variants={fadeUp}
                      href={`mailto:${coach.email}`}
                      className="text-[#0A0A67] text-[14px] md:text-[16px] hover:underline mb-2"
                    >
                      {coach.email}
                    </motion.a>
                    <motion.p variants={fadeUp} className="text-[#171717] text-[14px] md:text-[18px] leading-[26px] md:leading-[29px] text-justify lg:text-left mb-8">
                      {coach.bio}
                    </motion.p>

                    {coach.specialties && coach.specialties.length > 0 && (
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

                    {coach.certifications && coach.certifications.length > 0 && (
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
        linkTo="/contact-us"
        linkLabel="Contact Us"
        image="2"
        alt="Train with the Best coaching staff banner"
      />
    </div>
  );
}
