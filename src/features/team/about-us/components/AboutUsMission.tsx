import iconMission from '../icons/Icon.svg'

export function AboutUsMission() {

  return (
    <section className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="mission-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3 mb-8 align-center justify-center">
          <div className="size-8 rounded-full bg-secondary flex items-center justify-center shrink-0 p-2">
            <img src={iconMission} alt="Mission" className="w-full h-full" />
          </div>
          <h2
            id="mission-heading"
            className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.2px] uppercase"
          >
            Mission
          </h2>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-md">
          <p className="text-secondary text-[16px] md:text-[18px] leading-[28px] max-w-4xl">
            Seattle Synchro's mission is to develop well-rounded and accomplished individuals
            through a competitive athletic environment in artistic swimming, while striving for
            excellence both in and out of the pool and cultivating respect and teamwork.
          </p>
        </div>
      </div>
    </section>
  )
}
