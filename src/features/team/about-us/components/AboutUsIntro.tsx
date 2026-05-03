const LOGO_IMAGE =
  'https://images.unsplash.com/photo-1530549387789-4c1017266635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400'

const logoImage = '/images/logo.png'

export function AboutUsIntro() {
  return (
    <section className="p-6 md:px-20 md:py-24 bg-white" aria-labelledby="about-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h1
                id="about-heading"
                className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.2px] uppercase"
              >
                About Seattle Synchro
              </h1>
            </div>
            <div className="space-y-4 text-[#737373] text-[16px] leading-[26px]">
              <p>
                The Seattle Synchro Team was founded by Charmins Davis, 1984 Olympic coach, and has been in the
                Seattle metro area for over 25 years. In that time, the Team has produced 5 Olympians — Jillian Russel to
                the 2008 Summer Olympics; Tracy Reid; Cynthia and Caitlyn Christie-Mucha, who are the 1984 Olympic Gold
                medalists; and Hana Čičak from Paris 2024. Charmins Davis, 1984 Olympic French coach, was also a
                recurring silver medalist from Paris 2024. Charmins Davis, 1984 Olympic French coach, was also recently
                inducted into the International Swimming Hall of Fame. Seattle Synchro has also sent athletes to
                appointment by US National Teams, as well as elite varsity programs at universities across the country.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="overflow-hidden">
              <img
                src={logoImage}
                alt="Seattle Synchro logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
