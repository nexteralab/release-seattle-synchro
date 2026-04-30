import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { contactFormSchema, CONTACT_SUBJECTS, type ContactFormInput } from '../schema'
import { useContactForm } from '../hooks/use-contact-form'

export function ContactForm() {
  const mutation = useContactForm()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  })

  function onSubmit(data: ContactFormInput) {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    })
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle size={48} className="text-[#63ac23]" strokeWidth={1.5} />
        <p
          className="font-bold text-[#171717] text-[20px] tracking-[-0.5px]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Message Sent!
        </p>
        <p
          className="text-[#737373] text-[15px] max-w-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Thank you for reaching out. We'll get back to you within 1–2 business days.
        </p>
        <button
          onClick={() => mutation.reset()}
          className="mt-4 text-[#0A0A67] font-bold text-[13px] tracking-[1.3px] uppercase underline underline-offset-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" required error={errors.name?.message}>
          <input
            {...register('name')}
            type="text"
            placeholder="Jane Doe"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            placeholder="(206) 555-0100"
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field label="Email Address" required error={errors.email?.message}>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="Subject" required error={errors.subject?.message}>
        <select {...register('subject')} className={inputClass(!!errors.subject)}>
          <option value="">Select a subject…</option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" required error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="How can we help you?"
          className={inputClass(!!errors.message) + ' resize-none'}
        />
      </Field>

      {mutation.isError && (
        <div
          className="flex items-center gap-2 text-[#d4183d] text-[14px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full sm:w-auto bg-[#0A0A67] text-white px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-[#0A0A67]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {mutation.isPending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full bg-[#f3f3f5] border rounded-[8px] px-4 py-3',
    "font-['Inter',sans-serif] text-[15px] text-[#171717]",
    'placeholder:text-[#a1a1a1] outline-none transition-all',
    hasError
      ? 'border-[#d4183d] focus:border-[#d4183d] focus:ring-2 focus:ring-[#d4183d]/20'
      : 'border-transparent focus:border-[#0A0A67] focus:ring-2 focus:ring-[#0A0A67]/10',
  ].join(' ')
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="block font-bold text-[#171717] text-[13px] tracking-[0.5px] uppercase"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {label}
        {required && <span className="text-[#d4183d] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p
          className="text-[#d4183d] text-[13px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
