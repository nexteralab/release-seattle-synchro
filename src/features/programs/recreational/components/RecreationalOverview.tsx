export function RecreationalOverview() {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-white" aria-labelledby="recreational-heading">
      <div className="max-w-screen-lg mx-auto">
        <h1
          id="recreational-heading"
          className="font-bold text-secondary text-[40px] md:text-[72px] tracking-[-2.8px] uppercase mb-4 text-center"
        >
          Recreational Programs
        </h1>
        <p className="text-center text-secondary text-[16px] md:text-[18px] leading-[26px] max-w-3xl mx-auto mb-8">
          Non-competitive programs designed for fun, fitness, and skill development
        </p>
        <p className="text-secondary text-[16px] md:text-[18px] leading-[26px] mx-auto">
          Designed for swimmers ages 5–10, this non-competitive program builds a strong foundation in artistic swimming through fun, fitness, and progressive skill development. It's the perfect starting point for young athletes who dream of one day joining a competitive team.
        </p>
      </div>
    </section>
  )
}
