
export function Competitive12Under() {
  return (
    <section className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="group-12u">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
          <h2
            id="group-12u"
            className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
          >
            12 &amp; Under Age Group
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Coaches
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              Maria Romero <br />
              Daniela Garmendia <br />
              Patricia Camaran <br />
              Ivy Huang
            </p>
          </div>
          <div className="bg-white p-8">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-4">
              Workout Days
            </h3>
            <p className="text-[#737373] text-[16px] leading-[26px]">
              Monday, Wednesday &amp; Saturday morning
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
