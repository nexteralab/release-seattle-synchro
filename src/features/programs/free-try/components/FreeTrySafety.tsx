import { Link } from '@tanstack/react-router'
import { MessageCircleQuestion, ShieldAlert } from 'lucide-react'
import type { FreeTrySafetyContent } from '../types'

interface Props {
  safety: FreeTrySafetyContent
}

export function FreeTrySafety({ safety }: Props) {
  return (
    <section className="p-6 md:p-12 md:px-20 md:py-24 bg-white" aria-label="Safety requirement and contact">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

        <div className="bg-secondary rounded-3xl p-8 md:p-10 flex flex-col">
          <div className="flex items-center gap-2 text-white mb-6">
            <ShieldAlert size={20} strokeWidth={2} />
            <span className="font-bold text-[14px] tracking-[1.4px] uppercase">
              {safety.requirementTitle}
            </span>
          </div>
          <p className="text-white/85 text-[17px] md:text-[19px] leading-[28px] md:leading-[32px]">
            {safety.requirement}
          </p>
        </div>

        <div className="bg-white border border-black/10 rounded-3xl p-8 md:p-10 flex flex-col items-start">
          <div className="flex items-center gap-2 text-secondary mb-6">
            <MessageCircleQuestion size={20} strokeWidth={2} />
            <span className="font-bold text-[14px] tracking-[1.4px] uppercase">{safety.contactTitle}</span>
          </div>
          <p className="text-secondary font-semibold text-[17px] md:text-[19px] leading-[28px] md:leading-[32px]">
            {safety.contactHeading}
          </p>
          <p className="mt-3 text-[#737373] text-[15px] md:text-[16px] leading-[26px]">
            {safety.contactBody}
          </p>
          <Link
            to="/contact-us"
            className="inline-block mt-6 bg-white border border-secondary text-secondary rounded-full px-8 py-3 font-bold text-[13px] tracking-[1.8px] uppercase hover:bg-secondary hover:text-white transition-colors"
          >
            {safety.contactLabel}
          </Link>
        </div>

      </div>
    </section>
  )
}
