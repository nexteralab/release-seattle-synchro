import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * Comparativa de los dos eventos gratuitos. Se usa en /programs/free-try y en
 * /programs/try-out: la tarjeta de la página en la que estás sale destacada y
 * la otra lleva el CTA para saltar a ella.
 */

type EventId = 'free-try' | 'try-out'

interface CompareEvent {
  id: EventId
  title: string
  tagline: string
  path: string
  /** Las filas no son las mismas en los dos: uno pide mínimos de seguridad y el otro destrezas. */
  rows: { label: string; value: string }[]
  cta: string
}

const EVENTS: CompareEvent[] = [
  {
    id: 'free-try',
    title: 'Try Synchro — Free!',
    tagline: 'A fun, no-pressure introduction',
    path: '/programs/free-try',
    cta: 'See Try Synchro',
    rows: [
      { label: 'Who', value: 'Kids ages 6–12 who want to give artistic swimming a try.' },
      { label: 'Goal', value: 'Come for one day, have fun, and see what synchro is like.' },
      {
        label: 'Safety minimum',
        value: 'Swim 1 lap of crawl and breaststroke and float independently on their back.',
      },
      { label: 'Commitment', value: 'None. This is simply a chance to try it!' },
      { label: 'Date', value: 'Same day as our end of the season show (June).' },
    ],
  },
  {
    id: 'try-out',
    title: 'Team Tryouts — Free!',
    tagline: 'For swimmers interested in joining the team',
    path: '/programs/try-out',
    cta: 'See Team Tryouts',
    rows: [
      { label: 'Who', value: 'Kids ages 6–11 who want to give artistic swimming a try.' },
      { label: 'Goal', value: 'Evaluate swim readiness and find the appropriate team placement.' },
      {
        label: 'Skills',
        value: '4 laps crawl, 4 breaststroke, 4 backstroke, 1 butterfly, back float and treading water.',
      },
      {
        label: 'Commitment',
        value: 'Successful tryouts can lead to formal team enrollment year-round.',
      },
      { label: 'Date', value: 'Second week of August.' },
    ],
  },
]

const vp = { once: true, margin: '-40px' }

interface Props {
  /** El evento de la página actual: sale destacado y sin CTA. */
  active: EventId
}

export function ProgramCompare({ active }: Props) {
  // La activa siempre primero: a la izquierda en escritorio, arriba en móvil.
  const ordered = [
    ...EVENTS.filter((e) => e.id === active),
    ...EVENTS.filter((e) => e.id !== active),
  ]

  return (
    <section
      className="p-6 md:p-12 md:px-20 md:py-24 bg-[#F5F5F5]"
      aria-labelledby="compare-heading"
    >
      <div className="max-w-screen-lg mx-auto">
        <motion.div
          whileInView={{ opacity: [0, 1], x: [-40, 0] }}
          viewport={vp}
          transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
        >
          <p className="font-bold text-[13px] tracking-[2.2px] uppercase text-[#0A0A67]/60">
            Two free events
          </p>
          <h2
            id="compare-heading"
            className="mt-2 font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase"
          >
            Which One Is for Your Swimmer?
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ordered.map((event, i) => {
            const isActive = event.id === active
            return (
              <motion.article
                key={event.id}
                whileInView={{ opacity: [0, 1], y: [24, 0] }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className={`flex flex-col bg-white p-8 md:p-10 rounded-[10px] transition-shadow ${
                  isActive
                    ? 'border-t-[6px] border-[#63AC23] shadow-[0_10px_25px_rgba(0,0,0,0.15)]'
                    : 'border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
                }`}
              >
                {isActive && (
                  <div className="flex justify-center">
                    <span className="inline-flex items-center h-[30px] px-3.5 bg-[#63AC23] text-white font-bold text-[12px] tracking-[2.2px] uppercase">
                      You are here
                    </span>
                  </div>
                )}

                <h3
                  className={`font-bold text-[#0A0A67] text-[24px] md:text-[28px] tracking-[1.2px] uppercase leading-tight ${
                    isActive ? 'mt-4 text-center' : 'text-center'
                  }`}
                >
                  {event.title}
                </h3>
                <p
                  className={`mt-3 font-medium text-[16px] md:text-[18px] leading-[28px] text-center ${
                    isActive ? 'text-[#4d8a18]' : 'text-[#171717]'
                  }`}
                >
                  {event.tagline}
                </p>

                <dl
                  className={`mt-8 pt-7 flex flex-col gap-5 border-t ${
                    isActive ? 'border-[#63AC23]/35' : 'border-black/10'
                  }`}
                >
                  {event.rows.map((row) => (
                    <div key={row.label}>
                      <dt className="font-bold text-[13px] tracking-[1.4px] uppercase text-[#0A0A67]">
                        {row.label}
                      </dt>
                      <dd className="mt-2 text-[16px] leading-[26px] text-[#737373] text-pretty">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Solo la otra tarjeta lleva CTA: en la activa ya estás. */}
                {!isActive && (
                  <Link
                    to={event.path}
                    className="group mt-8 inline-flex items-center justify-center gap-2 self-start bg-[#0A0A67] text-white px-8 py-3.5 rounded-full font-bold text-[13px] tracking-[1.4px] uppercase hover:bg-[#0A0A67]/90 transition-colors"
                  >
                    {event.cta}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
