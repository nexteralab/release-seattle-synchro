import { useState } from 'react'
import { CreditCard, Mail } from 'lucide-react'

import { DonateDialog } from './DonateDialog'

export function DonateSupportTeam() {
  const [open, setOpen] = useState(false)

  return (
    <section
      className="p-6 md:px-20 md:py-24 bg-white"
      aria-labelledby="support-our-team"
    >
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <h2
            id="support-our-team"
            className="font-bold text-primary text-[36px] md:text-[48px] tracking-[-2.4px] uppercase"
          >
            Support Our Team
          </h2>
          <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px] max-w-4xl">
            The Seattle Synchro Booster Club is an IRS-approved 501(c)(3)
            charitable organization and donations to the club are tax-deductible.
            Donations qualify for corporate matching funds, and volunteer hours
            count towards corporate volunteer rewards.
          </p>
          <p className="text-[#171717] text-[16px] md:text-[18px] leading-[26px] max-w-4xl">
            The Seattle Synchro Booster Club's mission is to raise funds to
            promote the sport of artistic swimming by funding practice facility
            rental, athletic scholarships, equipment and swimsuit purchases,
            music licensing, and team travel expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          <div className="bg-secondary text-white p-8 md:p-10 flex flex-col items-center text-center gap-4">
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

          <div className="bg-secondary text-white p-8 md:p-10 flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-3" aria-hidden="true">
              <CreditCard className="size-10 text-white" strokeWidth={1.5} />
            </div>
            <p className="font-bold text-white text-[16px] md:text-[18px] leading-[26px] mt-2">
              Support us online
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-block bg-white text-primary px-8 py-3 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-white/90 transition-colors mt-2"
            >
              Donate Now!
            </button>
          </div>
        </div>
      </div>

      <DonateDialog open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
