import { motion } from 'motion/react'
import imgYuki from '/images/coaches/yuki.webp'
import { CtaBanner } from '#/components/CtaBanner'
import heroImage from '/images/hall_of_fame.webp'

import imgKeana from '/images/health/health_1.webp'
import imgAudrei from '/images/health/health_2.webp'
import imgYulia from '/images/health/yulia.png'

const HERO_IMG = 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=1920&q=80'

const vp = { once: true, margin: '-40px' } as const
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const medals = [
  { type: 'B', label: 'Bronze Medal', year: '1974', event: 'Pan Pacific Championships', location: 'Hilo, Hawaii' },
  { type: 'B', label: 'Bronze Medal', year: '1976', event: 'Pan Pacific Championships', location: 'Nagoya, Japan' },
  { type: 'B', label: 'Bronze Medal', year: '1977', event: 'Pan Pacific Championships', location: 'Mexico City, Mexico' },
  { type: 'S', label: 'Silver Medal', year: '2023', event: 'Christchurch, New Zealand', location: 'Team Technical' },
]

const medalsKeanaAudrei = [
  { type: 'S', label: 'Silver Medal', year: '2024', event: 'Olympic Games', location: 'Paris, France', count: 1 },
]

const medalStyle: Record<string, { bg: string; text: string; border: string }> = {
  G: { bg: 'linear-gradient(135deg, #FDC700 0%, #D08700 100%)', text: '#FFFFFF', border: '#D4AF37' },
  S: { bg: 'linear-gradient(135deg, #D1D5DC 0%, #6A7282 100%)', text: '#FFFFFF', border: '#9CA3AF' },
  B: { bg: 'linear-gradient(135deg, #FF8904 0%, #F54900 100%)', text: '#FFFFFF', border: '#CD7F32' },
}

const stats = [
  { count: 2, type: 'G', label: 'Gold' },
  { count: 1, type: 'S', label: 'Silver' },
  { count: 1, type: 'B', label: 'Bronze' },
]

const statsKeana = [
  { count: 1, type: 'S', label: 'Silver' },
]

export function HallOfFamePage() {
  return (
    <div className="w-full bg-white">

      {/* ── HERO ── */}

      <section
        className="relative md:h-[60vh] h-[40vh] flex items-center justify-center overflow-hidden"
        aria-label="Competitive Programs hero"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Artistic swimming coach training kids poolside"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.src = HERO_IMG
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </section>

      {/* Hero texto */}
      <section className="p-6 md:px-20 md:pt-20 md:pb-12 bg-white">
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
            Hall of Fame
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-medium text-[#737373] text-[16px] md:text-[20px] tracking-[-0.5px] leading-[26px] md:leading-[32px] max-w-2xl mx-auto"
          >
            The Seattle Synchronized Swim Team has produced many fine athletes and coaches over those years, including athletes who have competed internationally for the United States. Thank you to all the great athletes and coaches that have been a part of this team!
          </motion.p>
        </motion.div>
      </section>


      {/* ── MAIN CONTENT — two column ── */}
      <section className="px-6 md:px-20 py-16 md:pb-24 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start">

            {/* LEFT — photo + medals */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-8"
            >
              {/* Photo */}
              <motion.img
                variants={fadeUp}
                src={imgYuki}
                alt="Coach Yuki Maekawa"
                className="w-full aspect-[4/5] object-cover"
              />

              {/* Championship Medals */}
              <motion.div variants={fadeUp}>
                <h3 className=" font-medium text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-5">
                  Championship Medals
                </h3>
                <div className="space-y-3">
                  {medals.map((m, i) => {
                    const s = medalStyle[m.type]
                    return (
                      <div key={i} className="flex items-center gap-3 bg-[#F5F5F5] p-3">
                        <div
                          className="size-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[16px] md:text-[18px]"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {m.type}
                        </div>
                        <div className="min-w-0 w-full space-y-2">
                          <div className="flex items-center gap-2 justify-between">
                            <p className=" font-bold text-[#171717] text-[16px] md:text-[18px] tracking-[-0.1px]">{m.label}</p>
                            <p className="font-bold text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{m.year}</p>
                          </div>
                          <div className="flex items-start flex-col">
                            <p className="text-[#171717] text-[14px] md:text-[16px] leading-[1.5]">{m.event}</p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{m.location}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="flex items-center flex-wrap md:flex-nowrap gap-5 pt-2 border-t border-black/[0.06]">
                {stats.map(s => {
                  const c = medalStyle[s.type]
                  return (
                    <div key={s.type} className="flex items-center gap-2">
                      <div
                        className="size-7 rounded-full flex items-center justify-center  font-bold text-[11px]"
                        style={{ background: c.bg, color: c.text, border: `1.5px solid ${c.border}` }}
                      >
                        {s.type}
                      </div>
                      <span className=" font-bold text-[#171717] text-[16px] md:text-[18px] tracking-[-0.5px]">{s.count}</span>
                      <span className="text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{s.label}</span>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* RIGHT — all content */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-10"
            >
              {/* Badge + name */}
              <motion.div variants={fadeUp}>
                <span className="inline-block font-bold text-[10px] tracking-[2px] uppercase bg-primary text-white px-3 py-1.5 mb-4">
                  1970-2026
                </span>
                <h2 className=" font-bold text-[#0A0A67] text-[40px] md:text-[56px] tracking-[-2px] uppercase leading-[1] mb-5">
                  Coach Yuki
                </h2>
                <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                  Coach Yuki is a cornerstone of Seattle Synchro, with a legacy that spans continents and generations. As a world-class athlete and an extraordinary coach, her passion, skill, and dedication have shaped synchronized swimming in Seattle and beyond. We are proud to honor Coach Yuki as a distinguished member of the Seattle Synchro Hall of Fame.
                </p>
              </motion.div>

              {/* Athletic Career */}
              <motion.div variants={fadeUp}>
                <h3 className="font-medium text-secondary text-[16px] md:text-[18px] tracking-[1.4px] border-b border-black/[0.08] pb-2 mb-4">
                  Athletic Career
                </h3>
                <p className="text-[#737373] text-[14px] md:text-[15px] leading-[1.75] mb-4">
                  Coach Yuki began her synchronized swimming journey in Osaka, Japan in 1970, quickly rising to national prominence.
                </p>
                <ul className="space-y-2.5">
                  {[
                    '1978 US Nationals – City of Commerce, California: Competed in Solo, Duet, and Team (as a foreign athlete)',
                    '1982 Swiss Open: Assistant coach for legendary Coach Masayo Imura',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[#737373] text-[14px] leading-[1.65]">
                      <span className="text-[#0A0A67] mt-[5px] shrink-0 text-[8px]">■</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Coaching Career */}
              <motion.div variants={fadeUp}>
                <h3 className=" font-medium text-secondary text-[16px] md:text-[18px] tracking-[1.4px] border-b border-black/[0.08] pb-2 mb-4">
                  Coaching Career
                </h3>
                <p className="text-[#737373] text-[14px] md:text-[15px] leading-[1.75] mb-4">
                  Coach Yuki's coaching career is as remarkable as her time as an athlete. She has worked with athletes of all levels—from age group beginners to national team hopefuls.
                </p>
                <ul className="space-y-2">
                  {[
                    '1979–1982: Coach, Home Club in Osaka, Japan (Junior Olympic 13–14 & Junior Elite Levels)',
                    '1983–1984: Volunteer Assistant Coach, Seattle Aqua Club',
                    '1991–1996: Team Coach, Seattle Aqua Club (Led multiple teams each season)',
                    '1996–2018: Team Coach, Seattle Synchronized Swim Team (Produced Age Group National Finalists and National Team Qualifiers)',
                    '2018–Present: Figures & Assistant Coach, Seattle Synchro (All levels)',
                    'Also coached the Seattle Cascades Masters Team weekly for over 10 years.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[#737373] text-[14px] leading-[1.65]">
                      <span className="text-[#0A0A67] mt-[5px] shrink-0 text-[8px]">■</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Recognition */}
              <motion.div variants={fadeUp}>
                <h3 className=" font-medium text-secondary text-[16px] md:text-[18px] tracking-[1.4px] border-b border-black/[0.08] pb-2 mb-4">
                  Recognition
                </h3>
                <p className="text-[#737373] text-[14px] md:text-[15px] leading-[1.75]">
                  In 2006, Coach Yuki received the USA Synchro National Merit Award as Age Group Coach of the Year, recognizing her outstanding impact on the development of young athletes.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT — Keana ── */}
      <section className="px-6 md:px-20 py-16 md:pb-24 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start">

            {/* LEFT — photo + medals */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-8"
            >
              {/* Photo */}
              <motion.img
                variants={fadeUp}
                src={imgKeana}
                alt="Keana Maekawa"
                className="w-full aspect-[4/5] object-cover"
              />

              {/* Championship Medals */}
              <motion.div variants={fadeUp}>
                <h3 className=" font-medium text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-5">
                  Championship Medals
                </h3>
                <div className="space-y-3">
                  {medalsKeanaAudrei.map((m, i) => {
                    const s = medalStyle[m.type]
                    return (
                      <div key={i} className="flex items-center gap-3 bg-[#F5F5F5] p-3">
                        <div
                          className="size-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[16px] md:text-[18px]"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {m.type}
                        </div>
                        <div className="min-w-0 w-full space-y-2">
                          <div className="flex items-center gap-2 justify-between">
                            <p className=" font-bold text-[#171717] text-[16px] md:text-[18px] tracking-[-0.1px]">{m.label}</p>
                            <p className="font-bold text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{m.year}</p>
                          </div>
                          <div className="flex items-start flex-col">
                            <p className="text-[#171717] text-[14px] md:text-[16px] leading-[1.5]">{m.event}</p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{m.location}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="flex items-center flex-wrap md:flex-nowrap gap-5 pt-2 border-t border-black/[0.06]">
                {statsKeana.map(s => {
                  const c = medalStyle[s.type]
                  return (
                    <div key={s.type} className="flex items-center gap-2">
                      <div
                        className="size-7 rounded-full flex items-center justify-center  font-bold text-[11px]"
                        style={{ background: c.bg, color: c.text, border: `1.5px solid ${c.border}` }}
                      >
                        {s.type}
                      </div>
                      <span className=" font-bold text-[#171717] text-[16px] md:text-[18px] tracking-[-0.5px]">{s.count}</span>
                      <span className="text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{s.label}</span>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* RIGHT — all content */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-10"
            >
              {/* Badge + name */}
              <motion.div variants={fadeUp}>
                <span className="inline-block font-bold text-[10px] tracking-[2px] uppercase bg-primary text-white px-3 py-1.5 mb-4">
                  2024
                </span>
                <h2 className=" font-bold text-[#0A0A67] text-[40px] md:text-[56px] tracking-[-2px] uppercase leading-[1] mb-5">
                  Keana Hunter
                </h2>
                <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                  Keana Hunter is a  standout athlete who swam with our club for 8  years. She made the USA National Team at just 12 years old. Participated at the first 13-15 World Championship in and placed within the top 20 athletes in the world. progressing through the 12U, 13-15, and Junior categories. Her dedication and talent eventually led them to move to California to join the Senior National Team, where She went on to win a silver medal at the Paris Olympic Games, marking the first USA medal in artistic swimming in over 20 years.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT — Audrei ── */}
      <section className="px-6 md:px-20 py-16 md:pb-24 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start">

            {/* LEFT — photo + medals */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-8"
            >
              {/* Photo */}
              <motion.img
                variants={fadeUp}
                src={imgAudrei}
                alt="Audrei Hunter"
                className="w-full aspect-[4/5] object-cover"
              />

              {/* Championship Medals */}
              <motion.div variants={fadeUp}>
                <h3 className=" font-medium text-secondary text-[16px] md:text-[18px] tracking-[1.4px] uppercase mb-5">
                  Championship Medals
                </h3>
                <div className="space-y-3">
                  {medalsKeanaAudrei.map((m, i) => {
                    const s = medalStyle[m.type]
                    return (
                      <div key={i} className="flex items-center gap-3 bg-[#F5F5F5] p-3">
                        <div
                          className="size-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[16px] md:text-[18px]"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {m.type}
                        </div>
                        <div className="min-w-0 w-full space-y-2">
                          <div className="flex items-center gap-2 justify-between">
                            <p className=" font-bold text-[#171717] text-[16px] md:text-[18px] tracking-[-0.1px]">{m.label}</p>
                            <p className="font-bold text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{m.year}</p>
                          </div>
                          <div className="flex items-start flex-col">
                            <p className="text-[#171717] text-[14px] md:text-[16px] leading-[1.5]">{m.event}</p>
                            <p className="text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{m.location}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="flex items-center flex-wrap md:flex-nowrap gap-5 pt-2 border-t border-black/[0.06]">
                {statsKeana.map(s => {
                  const c = medalStyle[s.type]
                  return (
                    <div key={s.type} className="flex items-center gap-2">
                      <div
                        className="size-7 rounded-full flex items-center justify-center  font-bold text-[11px]"
                        style={{ background: c.bg, color: c.text, border: `1.5px solid ${c.border}` }}
                      >
                        {s.type}
                      </div>
                      <span className=" font-bold text-[#171717] text-[16px] md:text-[18px] tracking-[-0.5px]">{s.count}</span>
                      <span className="text-[#737373] text-[14px] md:text-[16px] leading-[1.5]">{s.label}</span>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* RIGHT — all content */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-10"
            >
              {/* Badge + name */}
              <motion.div variants={fadeUp}>
                <span className="inline-block font-bold text-[10px] tracking-[2px] uppercase bg-primary text-white px-3 py-1.5 mb-4">
                  2024
                </span>
                <h2 className=" font-bold text-[#0A0A67] text-[40px] md:text-[56px] tracking-[-2px] uppercase leading-[1] mb-5">
                  Audrey Kwon
                </h2>
                <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                  Audrey Kwon is a  standout athlete who swam with our club for 6  years. She made the USA National Team at just 12 years old, progressing through the 12U, 13-15, and Junior categories. Her dedication and talent eventually led them to move to California to join the Senior National Team, where She went on to win a silver medal at the Paris Olympic Games, marking the first USA medal in artistic swimming in over 20 years.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── MAIN CONTENT — Yulia ── */}
      <section className="px-6 md:px-20 py-16 md:pb-24 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start">

            {/* LEFT — photo + medals */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-8"
            >
              {/* Photo */}
              <motion.img
                variants={fadeUp}
                src={imgYulia}
                alt="Yulia Kuznetsova"
                className="w-full aspect-[4/5] object-cover"
              />
            </motion.div>

            {/* RIGHT — all content */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="space-y-10"
            >
              {/* Badge + name */}
              <motion.div variants={fadeUp}>
                <span className="inline-block font-bold text-[10px] tracking-[2px] uppercase bg-primary text-white px-3 py-1.5 mb-4">
                  2024
                </span>
                <h2 className=" font-bold text-[#0A0A67] text-[40px] md:text-[56px] tracking-[-2px] uppercase leading-[1] mb-5">
                  Jillian Penner
                </h2>
                <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                  Seattle Synchro swimmer Jillian Penner started swimming with our club when she was nine years old. Ten years later, and after two years on the U.S. Junior National Team, two years on USA National Team 1, and competing in Switzerland, Japan, Russia and Australia, Jillian was named to the 2008 USA Olympic Team!
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>


      <section className="px-6 md:px-20 py-16 md:pb-24 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <h2
            id="usa-national-team-heading"
            className="font-bold text-secondary text-[20px] leading-[26px] md:text-[48px] tracking-[-1.8px] uppercase mb-8">
            USA National Team
          </h2>
          <div className='flex flex-wrap gap-4'>
            <div className="w-full">
              <p className='text-[#171717] text-[16px] leading-[26px] font-regular'>
                <span className='text-secondary text-[16px] leading-[26px] font-medium'>Keana Hunter:</span> 2019 Junior National Team. Participated at the first 13-15 World Championship in and placed within the top 20 athletes in the world.
              </p>
            </div>
            <div className="w-full">
              <p className='text-[#171717] text-[16px] leading-[26px] font-regular'>
                <span className='text-secondary text-[16px] leading-[26px] font-medium'>Amy Wang and Margaret Zhu:</span> 2019 12U National Team.
              </p>
            </div>
            <div className="w-full">
              <p className='text-[#171717] text-[16px] leading-[26px] font-regular'>
                <span className='text-secondary text-[16px] leading-[26px] font-medium'>Audrey Kwon:</span> 2018 12U National Team.
              </p>
            </div>
            <div className="w-full">
              <p className='text-[#171717] text-[16px] leading-[26px] font-regular'>
                Past US National Team Members include: <span className='text-secondary text-[16px] leading-[26px] font-medium'>Margaret Zhu, Amy Wang, Audrey Kwon, Lorraine Hack and Sydney Sprinkle, Emily Drew, Akira Baysinger, Lilly Cao and Lianne Lovitt.</span>
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="px-6 md:px-20 md:p-24 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <h2
            id="usa-national-team-heading"
            className="font-bold text-secondary text-[20px] leading-[26px] md:text-[48px] tracking-[-1.8px] uppercase mb-8">
            Brazil National Team
          </h2>
          <p className='text-[#171717] text-[16px] leading-[26px] font-regular'>
            In 2004/2005, Seattle Synchro hosted two swimmers from Rio de Janeiro, Brazil. Branca and Bia Feres swam for Brazil's National Team, but for one season they swam for us on our 14 and over Junior Team while also attending Roosevelt High School in Seattle. They swam the team routine and a duet, as well as a trio with Jillian Penner. They also helped coach the younger girls before returning to Rio and once again swimming for Brazil on the Brazilian National Team.
          </p>
        </div>
      </section>


      <section className="px-6 md:px-20 md:p-24 bg-[#F5F5F5]">
        <div className="max-w-screen-lg mx-auto space-y-16">
          <h2
            id="team-achievements-heading"
            className="font-bold text-secondary text-center text-[20px] leading-[26px] md:text-[48px] tracking-[-1.8px] uppercase">
            Team Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 text-center">
              <div className="font-bold text-[#171717] text-[64px] tracking-[-3.2px] mb-2">
                24
              </div>
              <p className="font-bold text-[#737373] text-[16px] tracking-[1.6px] uppercase">
                National Championships
              </p>
            </div>
            <div className="bg-white p-8 text-center">
              <div className="font-bold text-[#171717] text-[64px] tracking-[-3.2px] mb-2">
                8
              </div>
              <p className="font-bold text-[#737373] text-[16px] tracking-[1.6px] uppercase">
                International Medals
              </p>
            </div>
            <div className="bg-white p-8 text-center">
              <div className="font-bold text-[#171717] text-[64px] tracking-[-3.2px] mb-2">
                5
              </div>
              <p className="font-bold text-[#737373] text-[16px] tracking-[1.6px] uppercase">
                Olympic Athletes
              </p>
            </div>
            <div className="bg-white p-8 text-center">
              <div className="font-bold text-[#171717] text-[64px] tracking-[-3.2px] mb-2">
                15
              </div>
              <p className="font-bold text-[#737373] text-[16px] tracking-[1.6px] uppercase">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </section>


      <CtaBanner
        heading="Write Your Own Success Story"
        description="Join the next generation of champions. Our proven coaching and training programs have developed countless medal-winning athletes."
        linkToContact="/contact-us"
        linkLabelContact="Start This Summer"
        linkVariantContact="secondary"
        linkToRegister="/programs"
        linkLabelRegister="Join Our Programs"
        linkRegisterVariant="primary"
        image="2"
        alt="Train with the Seattle Synchro coaching team"
      />
    </div>
  )
}
