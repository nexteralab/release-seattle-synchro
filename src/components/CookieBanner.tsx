import { motion, AnimatePresence } from 'motion/react'
import { Cookie } from 'lucide-react'
import { useCookieConsent } from '#/hooks/use-cookie-consent'

export function CookieBanner() {
  const { consent, accept, decline } = useCookieConsent()

  return (
    <AnimatePresence>
      {consent === 'pending' && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.08] bg-white/95 backdrop-blur-sm shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">

            {/* Icon + Text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="shrink-0 mt-0.5 size-8 rounded-full bg-[#0A0A67]/8 flex items-center justify-center">
                <Cookie size={14} className="text-[#0A0A67]" />
              </div>
              <div>
                <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#171717] text-[13px] tracking-[-0.2px]">
                  We use cookies
                </p>
                <p className="font-['Inter',sans-serif] text-[#737373] text-[12px] leading-[18px] mt-0.5">
                  We use a persistent identifier to understand how visitors engage with our content and improve your experience.
                  No personal data is shared with third parties.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0 pl-11 sm:pl-0">
              <button
                type="button"
                onClick={decline}
                className="font-['Space_Grotesk',sans-serif] font-bold text-[12px] tracking-[0.6px] uppercase text-[#737373] hover:text-[#171717] transition-colors px-3 py-2"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={accept}
                className="font-['Space_Grotesk',sans-serif] font-bold text-[12px] tracking-[1.2px] uppercase bg-[#0A0A67] text-white px-5 py-2.5 hover:bg-[#0A0A67]/90 transition-colors"
              >
                Accept
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
