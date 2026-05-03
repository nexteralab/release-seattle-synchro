import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, Loader, Info } from 'lucide-react'
import { useSubscribe } from '../hooks/use-subscribe'
import type { SubscriptionSource } from '../services/subscriptions.service'

// re-export so callers don't need two imports
export type { SubscriptionSource }

interface Props {
  source: SubscriptionSource
}

export function SubscribeForm({ source }: Props) {
  const [email, setEmail] = useState('')
  const { status, submit } = useSubscribe(source)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return
    submit(trimmed)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-3"
          >
            <CheckCircle size={16} className="text-white shrink-0" />
            <span className="font-['Space_Grotesk',sans-serif] font-bold text-white text-[13px] tracking-[0.6px] uppercase">
              You're subscribed!
            </span>
          </motion.div>
        )}

        {status === 'duplicate' && (
          <motion.div
            key="duplicate"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-3"
          >
            <Info size={16} className="text-white/70 shrink-0" />
            <span className="font-['Space_Grotesk',sans-serif] font-bold text-white/80 text-[13px] tracking-[0.6px] uppercase">
              You're already subscribed here.
            </span>
          </motion.div>
        )}

        {status !== 'success' && status !== 'duplicate' && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-0 w-full max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-['Inter',sans-serif] text-[14px] outline-none focus:border-white/50 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#021521] font-['Space_Grotesk',sans-serif] font-bold text-[13px] tracking-[2px] uppercase hover:bg-[#f5f5f5] transition-colors disabled:opacity-60 shrink-0"
            >
              {status === 'loading' ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                'Subscribe'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>


      {status === 'error' && (
        <p className="font-['Inter',sans-serif] text-white/60 text-[13px]">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
