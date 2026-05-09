import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const BASE_PAYPAL_URL =
  'https://www.paypal.com/donate/?cmd=_donations&business=synchrotreasurer%40yahoo.com&item_name=Seattle+Synchro+Booster+Club&currency_code=USD&source=url&Z3JncnB0='

const PRESET_AMOUNTS = [25, 50, 100, 250, 500]

interface Props {
  open: boolean
  onClose: () => void
}

export function DonateDialog({ open, onClose }: Props) {
  const [selected, setSelected] = useState<number | null>(50)
  const [custom, setCustom] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const finalAmount = custom ? Number(custom) : selected
  const isValid = !!finalAmount && finalAmount > 0 && Number.isFinite(finalAmount)

  const handleContinue = () => {
    if (!isValid) return
    const url = `${BASE_PAYPAL_URL}&amount=${finalAmount}`
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-dialog-title"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div className="relative bg-white w-full max-w-md p-6 md:p-8 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close donation dialog"
          className="absolute top-3 right-3 size-8 flex items-center justify-center text-[#737373] hover:text-primary transition-colors"
        >
          <X className="size-5" />
        </button>

        <h3
          id="donate-dialog-title"
          className="font-bold text-primary text-[24px] md:text-[28px] tracking-[-1px] uppercase mb-2"
        >
          Choose an amount
        </h3>
        <p className="text-[#737373] text-[14px] leading-[22px] mb-6">
          You'll be redirected to PayPal to complete your secure donation.
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {PRESET_AMOUNTS.map((amount) => {
            const active = selected === amount && !custom
            return (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setSelected(amount)
                  setCustom('')
                }}
                className={
                  'py-3 font-bold text-[16px] tracking-[1px] uppercase border transition-colors ' +
                  (active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-primary border-primary/30 hover:border-primary')
                }
              >
                ${amount}
              </button>
            )
          })}
        </div>

        <label className="block mb-6">
          <span className="block text-[12px] tracking-[1.4px] uppercase font-bold text-[#737373] mb-2">
            Custom amount
          </span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] font-bold">
              $
            </span>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Other amount"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value)
                if (e.target.value) setSelected(null)
              }}
              className="w-full bg-[#f3f3f5] border border-transparent pl-7 pr-3 py-3 text-[16px] text-[#171717] focus:outline-none focus:border-primary"
            />
          </div>
        </label>

        <button
          type="button"
          disabled={!isValid}
          onClick={handleContinue}
          className="w-full bg-primary text-white py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue to PayPal
        </button>
      </div>
    </div>
  )
}
