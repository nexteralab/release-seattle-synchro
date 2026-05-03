const SWIMMER_IMAGE =
  'https://images.unsplash.com/photo-1519315901367-f34ff9154487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800'

const highlights = [
  'Trains and competes September through June.',
  'Competes locally, regionally and nationally.',
  'Offers Beginner to Advance instruction.',
  'Teams are created by age and skill level.',
  'All coaches have National and/or Olympic backgrounds.',
  'The coaching staff is CPR, First Aid and Safe-Sport Certified',
]

export function AboutUsWhatWeDo() {
  return (
    <section className="p-6 md:px-20 md:py-24 bg-white" aria-labelledby="what-we-do-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="size-13 rounded-full bg-secondary flex items-center justify-center shrink-0 p-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <h2
            id="what-we-do-heading"
            className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.2px] uppercase"
          >
            What We Do
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
          <div className="space-y-5 text-[#171717] text-[16px] leading-[26px]">
            <p>
              We believe that the role of the Seattle Synchronized Swim Team is to enhance the physical, social and
              emotional development of the swimmers through participation in synchronized swimming. This can be
              achieved through the development of programs to meet the needs of swimmers with varied levels of
              ability and commitment. We provide a safe and secure environment in which individual swimmers can
              strive for personal bests. Synchronized swimming is a team sport and we promote team spirit through the
              involvement of all swimmers, coaches, and parents. Traveling, meeting athletes from across the United
              States and around the world, and making lifelong friends are all part of the experience. We train 10
              months out of the year and compete locally, regionally and nationally year round.
            </p>
            <p>
              Artistic swimming is the ultimate team sport. Each individual member plays an integral part in the team's
              ultimate success. Seattle Artistic Swim Team.
            </p>
          </div>
          <div className="rounded-sm overflow-hidden shadow-md h-64 md:h-80">
            <img
              src={SWIMMER_IMAGE}
              alt="Artistic swimmer in the pool"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {highlights.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0A0A67"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <p className="text-[#737373] text-[15px] leading-[24px]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
