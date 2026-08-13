import { Link } from '@tanstack/react-router'
import { MessageCircleQuestion, ShieldAlert } from 'lucide-react'

const SAFETY_NOTE =
  'Safety is our priority. Participants MUST be able to swim a full lap of crawl stroke and breast stroke unassisted, without stopping and without a flotation device.'

export function FreeTrySafety() {
  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-label="Safety requirement and contact">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

        <div className="bg-secondary rounded-3xl p-8 md:p-10 flex flex-col">
          <div className="flex items-center gap-2 text-white mb-6">
            <ShieldAlert size={20} strokeWidth={2} />
            <span className="font-bold text-[14px] tracking-[1.4px] uppercase">
              Critical Safety Requirement
            </span>
          </div>
          <p className="text-white/85 text-[17px] md:text-[19px] leading-[28px] md:leading-[32px]">
            {SAFETY_NOTE}
          </p>
        </div>

        <div className="bg-white border border-black/10 rounded-3xl p-8 md:p-10 flex flex-col items-start">
          <div className="flex items-center gap-2 text-secondary mb-6">
            <MessageCircleQuestion size={20} strokeWidth={2} />
            <span className="font-bold text-[14px] tracking-[1.4px] uppercase">Got Questions?</span>
          </div>
          <p className="text-secondary font-semibold text-[17px] md:text-[19px] leading-[28px] md:leading-[32px]">
            Not sure if your swimmer meets the requirements, or want more details before signing up?
          </p>
          <p className="mt-3 text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
            Reach out and our coaches will help you figure out the best fit.
          </p>
          <Link
            to="/contact-us"
            className="inline-block mt-6 bg-white border border-secondary text-secondary rounded-full px-8 py-3 font-bold text-[13px] tracking-[1.8px] uppercase hover:bg-secondary hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  )
}
