import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { CtaBanner } from '#/components/CtaBanner'

const transition = { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
const viewport = { once: true, margin: '-40px' }

const link = 'text-[#0A0A67] underline underline-offset-2 decoration-[#0A0A67]/40 hover:decoration-[#0A0A67] transition-all'
const btn = 'inline-flex items-center gap-2 mt-5 rounded-xs text-[#0A0A67] font-bold text-[11px] tracking-[1.8px] uppercase px-5 py-2.5 bg-secondary text-white hover:text-primary transition-colors'

function Protocol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileInView={{ opacity: [0, 1], y: [20, 0] }}
      viewport={viewport}
      transition={transition}
      className="py-10 flex gap-6"
    >
      <div className="w-1 shrink-0 bg-[#0A0A67] rounded-full mt-1" />
      <div className="flex-1">
        <h3 className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67] text-[18px] md:text-[22px] tracking-[-0.4px] mb-3">
          {title}
        </h3>
        {children}
      </div>
    </motion.div>
  )
}

export function SafetyPage() {
  return (
    <div className="w-full">

      {/* Hero */}
      <section className="bg-[#0A0A67] py-24 md:py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h1
            whileInView={{ opacity: [0, 1], y: [24, 0] }}
            viewport={viewport}
            transition={transition}
            className="font-bold text-white text-[40px] md:text-[64px] tracking-[-2px] uppercase leading-tight mb-4"
          >
            Safety Guidelines
          </motion.h1>
          <motion.p
            whileInView={{ opacity: [0, 1], y: [16, 0] }}
            viewport={viewport}
            transition={{ ...transition, delay: 0.1 }}
            className="text-white/60 text-[16px] md:text-[18px]"
          >
            Your safety is our top priority
          </motion.p>
        </div>
      </section>

      {/* Protocols */}
      <section className="bg-white px-6 md:px-20 py-16 md:py-24">
        <div className="max-w-screen-lg mx-auto">

          <motion.h2
            whileInView={{ opacity: [0, 1], x: [-24, 0] }}
            viewport={viewport}
            transition={transition}
            className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.4px] uppercase mb-12"
          >
            Safety Protocols
          </motion.h2>

          <div className="divide-y divide-black/[0.07]">

            <Protocol title="SafeSport">
              <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                SafeSport helps raise awareness about misconduct in sport, promote open dialogue, and provide
                training and resources. SafeSport was created by the USOC in 2013 but became an independent
                organization in 2017. The Center for SafeSport is independent from the USOC or the federations
                and is based in Denver, CO. Seattle Synchro falls under SafeSport jurisdiction and all Covered
                Individuals associated with Seattle Synchro undergo mandatory training. For more information,
                see the{' '}
                <a href="https://uscenterforsafesport.org/response-and-resolution/safesport-code/" target="_blank" rel="noopener noreferrer" className={link}>
                  SafeSport Code
                </a>.
              </p>
              <a href="https://uscenterforsafesport.org/report-a-concern/" target="_blank" rel="noopener noreferrer" className={btn}>
                Report a Concern <ExternalLink size={11} />
              </a>
            </Protocol>

            <Protocol title="Concussions">
              <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                Concussions most commonly occur in organized contact sports such as football, wrestling, and
                soccer but they can also occur in synchronized swimming. Because concussions can lead to serious
                health consequences, it is essential that synchronized swimmers, coaches, parents, and healthcare
                providers learn the signs and symptoms of concussion and what to do if a concussion occurs. For
                more information, review this{' '}
                <a href="https://www.seattlesynchrosst.com/zzssst/UserFiles/File/Safety/synchro-concussions-selina-shah.pdf" target="_blank" rel="noopener noreferrer" className={link}>
                  fact sheet
                </a>{' '}
                from Selina Shah, MD, FACP, Team Physician USC Synchronized Swimming.
              </p>
              <a href="https://www.seattlesynchrosst.com/zzssst/UserFiles/File/Safety/synchro-concussions-selina-shah.pdf" target="_blank" rel="noopener noreferrer" className={btn}>
                Download Fact Sheet <ExternalLink size={11} />
              </a>
            </Protocol>

            <Protocol title="Sudden Cardiac Arrest">
              <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                Sudden Cardiac Arrest (SCA) is the sudden onset of an abnormal and lethal heart rhythm, causing
                the heart to stop beating and the individual to collapse. SCA is the leading cause of death in
                the US, affecting over 300,000 individuals per year.
              </p>
              <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75] mt-3">
                For more information, see <a href="https://uwmedicine.org/services/sports-cardiology" target="_blank" rel="noopener noreferrer" className={link}>this brochure</a> from the UW Medicine Center for Sports Cardiology, the Washington Interscholastic Activities Association, and the Nick of Time Foundation.
              </p>
            </Protocol>
          </div>
        </div>
      </section >

      {/* Contact */}

      <CtaBanner
        heading="Questions About Safety?"
        description="We're happy to discuss our safety protocols and answer any concerns."
        linkToContact="/contact-us"
        linkLabelContact="Contact us"
        linkVariantContact="primary"
        image="1"
        alt="Questions About Safety?"
      />
    </div >
  )
}
