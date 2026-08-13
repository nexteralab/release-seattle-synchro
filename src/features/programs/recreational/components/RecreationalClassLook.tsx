import classImage from '/images/program_2.jpg'

const PILLS = ['No Tryout', 'No Judges', 'No Scores', 'No Pressure to Win']

const SKILLS = [
  {
    lead: 'Sculling and floating.',
    rest: 'The foundation of every artistic swimming position.',
  },
  {
    lead: 'Treading water techniques.',
    rest: 'Strength and control, not just staying afloat.',
  },
  {
    lead: 'Body control and breath holding.',
    rest: 'Real athletic skills that carry over to any sport.',
  },
  {
    lead: 'Simple synchronized patterns.',
    rest: 'Group routines set to music.',
  },
]

export function RecreationalClassLook() {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="class-look-heading">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2
            id="class-look-heading"
            className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
          >
            What a Class Actually Looks Like
          </h2>

          <div className="mt-6 flex gap-2 flex-wrap">
            {PILLS.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center h-9 px-4 rounded-full bg-primary/15 text-primary font-bold text-[12px] tracking-[1.4px] uppercase"
              >
                {pill}
              </span>
            ))}
          </div>

          <p className="mt-6 text-[#737373] text-[16px] md:text-[18px] leading-[28px] md:leading-[30px]">
            Recreational artistic swimming is about building skills and confidence in a low
            pressure environment. Swimmers work on real technique, then put it to music with their
            friends.
          </p>

          <ul className="mt-6 space-y-4">
            {SKILLS.map((item) => (
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

          <div className="mt-8 bg-[#f5f5f5] rounded-2xl px-6 py-5">
            <p className="text-secondary text-[16px] md:text-[17px] leading-[28px]">
              Recreational does not mean not serious. The difference is the goal: enjoyment and
              skill building instead of competition results.
            </p>
          </div>
        </div>

        <div className="relative w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden">
          <img
            src={classImage}
            alt="Recreational class practicing sculling in the pool"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
