import { useState } from 'react'
import { CreditCard, Mail } from 'lucide-react'

import { DonateDialog } from './DonateDialog'

export function DonateSupportTeam() {
  const [open, setOpen] = useState(false)

  return (
    <section
      className="p-6 md:px-20 md:py-24 bg-white"
      aria-labelledby="booster-club"
    >
      <div className="max-w-screen-lg mx-auto space-y-16">
        {/* 1 - Qué es el Booster Club */}
        <div className="space-y-6">
          <h2
            id="booster-club"
            className="font-bold text-primary text-[36px] md:text-[48px] tracking-[-2.4px] uppercase"
          >
            Seattle Synchronized Swim Team (Booster Club)
          </h2>
          <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px] max-w-4xl">
            The Booster club is a volunteer-led, non-profit organization aimed
            at supporting young girls and boys to develop swimming skills,
            self-confidence, teamwork, and endurance through the sport of
            artistic swimming. The Booster Club promotes artistic swimming in
            the Seattle area by publicizing club achievements, engaging
            volunteers for meets, and fundraising to provide grants and
            scholarships for swimmers and for coaches' professional
            development. Board members are all parent volunteers, who committed
            to serve our community for our mission.
          </p>
          <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px] max-w-4xl">
            The Booster Club is a 501c3 charity. (EIN: 91-0890089; UBI:
            60-1797357.) Your gift is tax-deductible as allowed by U.S. law,
            and we provide receipt/ acknowledgment letters as gifts are
            received. To request a summary letter of your donations for the
            calendar year, please contact us.
          </p>
        </div>

        {/* 2 - Donate */}
        <div className="space-y-8">
          <h2 className="font-bold text-primary text-[28px] md:text-[40px] tracking-[-1.2px] uppercase text-center">
            Donate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            <div className="bg-secondary text-white rounded-3xl p-8 md:p-10 flex flex-col items-center text-center gap-4">
              <Mail className="size-10 text-white" strokeWidth={1.5} aria-hidden="true" />
              <p className="font-bold text-white text-[16px] md:text-[18px] leading-[26px] mt-2">
                Donate by mailing a check to the club at
              </p>
              <address className="not-italic text-white/80 text-[14px] md:text-[15px] leading-[22px]">
                9805 NE 116th Street #7357,
                <br />
                Kirkland, WA 98034
              </address>
            </div>

            <div className="bg-secondary text-white rounded-3xl p-8 md:p-10 flex flex-col items-center text-center gap-4">
              <div className="flex items-center gap-3" aria-hidden="true">
                <CreditCard className="size-10 text-white" strokeWidth={1.5} />
              </div>
              <p className="font-bold text-white text-[16px] md:text-[18px] leading-[26px] mt-2">
                Support us online
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-block bg-white text-primary rounded-full px-8 py-3 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-white/90 transition-colors mt-2"
              >
                Donate Now!
              </button>
            </div>
          </div>
        </div>
      </div>

      <DonateDialog open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
