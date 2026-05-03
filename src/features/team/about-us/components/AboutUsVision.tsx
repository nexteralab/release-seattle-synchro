const visionItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
    text: 'To provide an atmosphere that inspires athletes to achieve their maximum potential through strong work ethic, discipline, integrity, and sportsmanship.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    text: 'To develop team unity, where everyone encourages and takes pride in one another, both in and out of the pool.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    text: 'To instill a lifelong love for sport through enjoyment and accomplishment, throughout any level of the athlete\'s career.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      </svg>
    ),
    text: 'To help athletes strengthen their mental fitness and emotional intelligence, so that they can grow both physically and mentally into strong individuals.',
  },
]

export function AboutUsVision() {
  return (
    <section className="p-6 md:px-20 md:py-24 bg-white" aria-labelledby="vision-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-8 rounded-full bg-[#0A0A67] flex items-center justify-center shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h2
            id="vision-heading"
            className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.2px] uppercase"
          >
            Vision
          </h2>
        </div>
        <p className="text-secondary text-[16px] leading-[26px] mb-10">Our vision is:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visionItems.map((item, i) => (
            <div
              key={i}
              className="border border-4 border-secondary p-6 flex gap-4 items-start"
            >
              <div className="text-secondary shrink-0 mt-0.5">{item.icon}</div>
              <p className="text-secondary text-[15px] leading-[24px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
