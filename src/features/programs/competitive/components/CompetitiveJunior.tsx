import readyToJoin from '/images/image_back.png'

export function CompetitiveJunior() {
  return (
    <section className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="group-junior">
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
          <div className="bg-white p-6 md:p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Coaches
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              Maria Romero
            </p>
          </div>
          <div className="bg-white p-6 md:p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Workout Days
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              3 Weekdays and Sunday morning
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#0A0A67] text-white">
          <img
            src={readyToJoin}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 bottom-[-40px] md:bottom-[-60px] w-80 sm:w-80 md:w-96 lg:w-[28rem] h-auto opacity-60 md:opacity-70"
          />
          <div className="relative flex flex-col gap-4 p-6 md:p-8 pb-52 sm:pb-[12rem] md:pb-12 md:pr-[26rem] lg:pr-[30rem]">
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
