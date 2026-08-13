import gymImage from '/images/content.webp'

const INPUTS = ['Swimming', 'Dance', 'Gymnastics']

const REASONS = [
  {
    lead: 'Everything transfers.',
    rest: 'Splits, extensions, pointed toes, counting music. Same vocabulary, different element.',
  },
  {
    lead: 'Much gentler on the body.',
    rest: 'No impact landings and no hard mats.',
  },
  {
    lead: 'A real team sport.',
    rest: 'The routine only works if everyone moves together.',
  },
  {
    lead: 'Choreography they already understand.',
    rest: 'Learning a routine is familiar ground for a dancer or gymnast.',
  },
]

export function RecreationalGymnasticsFit() {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="gymnastics-fit-heading">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden order-2 lg:order-1">
          <img
            src={gymImage}
            alt="Athlete in a vertical position during artistic swimming practice"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="font-bold text-primary text-[13px] tracking-[2.2px] uppercase">
            A Perfect Fit
          </div>
          <h2
            id="gymnastics-fit-heading"
            className="mt-3 font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
          >
            Does Your Child Do Gymnastics or Dance?
          </h2>

          <div className="mt-6 flex gap-2 flex-wrap items-center">
            {INPUTS.map((input) => (
              <span
                key={input}
                className="inline-flex items-center h-10 px-4 rounded-full border-[1.5px] border-secondary text-secondary font-bold text-[12px] tracking-[1.4px] uppercase"
              >
                {input}
              </span>
            ))}
            <span className="inline-flex items-center h-10 px-4 rounded-full bg-primary text-white font-bold text-[12px] tracking-[1.4px] uppercase">
              = Artistic Swimming
            </span>
          </div>

          <p className="mt-6 text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
            Artistic swimming is the only sport that combines all three. Gymnasts and dancers
            arrive with exactly the skills we build on: flexibility, body awareness, rhythm, and
            the discipline to drill a routine until it is clean.
          </p>

          <ul className="mt-6 space-y-4">
            {REASONS.map((item) => (
              <li key={item.lead} className="flex gap-3 items-start">
                <span
                  className="shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-[13px] mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-[#737373] text-[16px] md:text-[17px] leading-[27px]">
                  <strong className="text-secondary font-semibold">{item.lead}</strong> {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
