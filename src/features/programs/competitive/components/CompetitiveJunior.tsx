import readyToJoin from '/images/image_back.png'

export function CompetitiveJunior() {
  return (
    <section className="p-12 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="group-junior">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <h2
              id="group-junior"
              className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
            >
              Junior / 16–19 Age Group
            </h2>
          </div>
          <p className="text-[#171717] text-[18px] leading-[26px] max-w-4xl">
            Our Junior Team competes at high-level meets and trains at an elite level. The junior
            team program is geared towards those who are fully committed to training and competing
            at an elite level. Swimmers train 11 months of the year, and attend a minimum of 8
            meets a year. Many swimmers go on to train with US National Teams. Minimum age for the
            group is 14.
          </p>


        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Coaches
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              Maria Romero
            </p>
          </div>
          <div className="bg-white p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Workout Days
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              3 Weekdays and Sunday morning
            </p>
          </div>
        </div>

        <div className="relative bg-[#0A0A67] p-8 text-white pb-12"
          style={{
            backgroundImage: `url(${readyToJoin})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right -20px bottom 0px',
            backgroundSize: 'auto 60%'
          }}  >
          <div className="absolute inset-0 bg-[#0A0A67]/60" aria-hidden="true" />
          <div className="relative flex flex-col gap-4">
            <h3 className="font-bold text-white text-[20px] tracking-[-1px] uppercase mb-4">
              Program Highlights
            </h3>
            <ul className="space-y-2 text-white/90 text-[16px]">
              <li className="flex items-start gap-2">
                <div
                  className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                  aria-hidden="true"
                >
                  ✓
                </div>
                <span>11 months of training per year</span>
              </li>
              <li className="flex items-start gap-2">
                <div
                  className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                  aria-hidden="true"
                >
                  ✓
                </div>
                <span>Minimum of 8 meets per year</span>
              </li>
              <li className="flex items-start gap-2">
                <div
                  className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                  aria-hidden="true"
                >
                  ✓
                </div>
                <span>Elite level training and competition</span>
              </li>
              <li className="flex items-start gap-2">
                <div
                  className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                  aria-hidden="true"
                >
                  ✓
                </div>
                <span>Pathway to US National Teams</span>
              </li>
              <li className="flex items-start gap-2">
                <div
                  className="bg-primary text-secondary size-6 flex items-center justify-center font-bold shrink-0 rounded-full"
                  aria-hidden="true"
                >
                  ✓
                </div>
                <span>Minimum age: 14 years old</span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  )
}
