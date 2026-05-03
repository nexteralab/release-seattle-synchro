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

export function HealthWellnessPage() {
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
                        Health & Wellness
                    </motion.h1>
                    <motion.p
                        whileInView={{ opacity: [0, 1], y: [16, 0] }}
                        viewport={viewport}
                        transition={{ ...transition, delay: 0.1 }}
                        className="text-white/60 text-[16px] md:text-[18px]"
                    >
                        Supporting the complete well-being of our athletes
                    </motion.p>
                </div>
            </section>

            {/* Protocols */}
            <section className="bg-white px-6 md:px-20 py-16 md:py-24">
                <div className="max-w-screen-lg mx-auto">
                    <div className="divide-y divide-black/[0.07]">
                        <Protocol title="Nutrition">
                            <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                                Being conscious of what you eat is important, especially as an athlete.  Whether its feeling sleepy, getting muscle aches and cramps or feeling constantly fatigued--if you are not getting enough nutrition rich food, in the right amounts, you will feel the effects of your diet both in and out of the water. It's important to keep your body fueled properly so that you can feel as best as possible!  Minor, positive changes, can make a big difference!
                                A great place to start being more conscious of what you are eating is the 40/40/20 Rule. This simply means that, of ALL the food you consume over a given day--your nutritional intake should break down to roughly 40% from whole grains and carbohydrates, 40% to lean protein and 20% to healthy fats and oils.  Many vegetables are carbohydrate sources, so make sure you don't skimp on the green stuff!
                                It is important for all athletes to understand how you are fueling your body. Part of understanding what is in the food you eat is knowing how to read a nutrition label. In this video, St.Vincent Sports Performance's Sports Dietitian Lindsay Langford, MS, RD, CSSD, walks through the parts of the nutrition label, so you can make better decisions at the grocery store.
                            </p>
                            <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                                More resources:
                                <ul>
                                    <li>
                                        View this <a href="https://www.youtube.com/watch?v=KYxWW_Tqr78" target="_blank" rel="noopener noreferrer" className={link}>presentation</a> with Amanda Field and Zara Mecklai on sports nutrition.
                                    </li>
                                    <li>
                                        A <a href="https://www.youtube.com/watch?v=DY1rVhOF6JY" target="_blank" rel="noopener noreferrer" className={link}>video</a> of nutrition advice for artistic swimming by sports dietitian Taylor Maggio.
                                    </li>
                                    <li>
                                        Team USA nutrition <a href="https://www.usopc.org/nutrition" target="_blank" rel="noopener noreferrer" className={link}>information</a>.
                                    </li>
                                </ul>
                            </p>
                        </Protocol>

                        <Protocol title="Sleep">
                            <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                                How many hours do you sleep at night? <br />
                                Don't forget! In addition to a healthy diet, its especially important for athletes of all ages to make sure to get <a href='https://www.sleepfoundation.org/physical-activity/athletic-performance-and-sleep' target='_blank' rel='noopener noreferrer' className={link}>enough sleep</a> every night, as well as rest and recovery time. A good night's sleep is essential to stamina and overall health.
                            </p>
                        </Protocol>

                        <Protocol title="Hydration">
                            <p className="text-[#737373] text-[15px] md:text-[16px] leading-[1.75]">
                                Drink your water!!
                                <br />
                                <br />
                                Staying hydrated will help significantly with signs of fatigue! Don't forget to drink plenty of water throughout the day, and especially at practice. We lose a large amount of electrolytes and water while we are working hard in the pool, so it is important replenish your body before, during and after your workout.
                            </p>
                        </Protocol>
                    </div>
                </div>
            </section >

            {/* Contact */}

            <CtaBanner
                heading="Questions About Health?"
                description="We're here to support your athlete's health and wellness journey."
                linkToContact="/contact-us"
                linkLabelContact="Contact us"
                linkVariantContact="primary"
                image="4"
                alt="Questions About Safety?"
            />
        </div >
    )
}
