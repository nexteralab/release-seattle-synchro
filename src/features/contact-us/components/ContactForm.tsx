import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Label } from '#/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { cn } from '#/lib/utils'
import { contactFormSchema, CONTACT_SUBJECTS, type ContactFormInput } from '../schema'
import { useContactForm } from '../hooks/use-contact-form'

export function ContactForm() {
  const mutation = useContactForm()

  const {
    register,
    handleSubmit,
    reset,
    control,
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
        <Button
          variant="link"
          onClick={() => mutation.reset()}
          className="mt-4 text-[#0A0A67] font-bold text-[13px] tracking-[1.3px] uppercase underline underline-offset-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  const inputStyles = "bg-white dark:bg-white hover:bg-white dark:hover:bg-white border-[#e5e5e5] dark:border-[#e5e5e5] hover:border-[#63AC23] dark:hover:border-[#63AC23] shadow-none rounded-[6px] px-4 py-3 h-auto text-[15px] text-[#171717] dark:text-[#171717] placeholder:text-[#a1a1a1] focus-visible:border-[#63AC23] focus-visible:ring-2 focus-visible:ring-[#63AC23]/25 transition-[color,box-shadow,border-color] aria-invalid:border-[#d4183d] aria-invalid:ring-2 aria-invalid:ring-[#d4183d]/20"

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" required error={errors.name?.message}>
          <Input
            {...register('name')}
            type="text"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            className={inputStyles}
          />
        </Field>
        <Field label="Phone Number" error={errors.phone?.message}>
          <Input
            {...register('phone')}
            type="tel"
            placeholder="(206) 555-0100"
            aria-invalid={!!errors.phone}
            className={inputStyles}
          />
        </Field>
      </div>

      <Field label="Email Address" required error={errors.email?.message}>
        <Input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          className={inputStyles}
        />
      </Field>

      <Field label="Subject" required error={errors.subject?.message}>
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger
                aria-invalid={!!errors.subject}
                className={cn(inputStyles, 'w-full data-[size=default]:h-auto')}
              >
                <SelectValue placeholder="Select a subject…" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field label="Message" required error={errors.message?.message}>
        <Textarea
          {...register('message')}
          rows={5}
          placeholder="How can we help you?"
          aria-invalid={!!errors.message}
          className={cn(inputStyles, 'resize-none')}
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

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full sm:w-auto bg-[#0A0A67] text-white px-10 py-4 h-auto font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-[#0A0A67]/90 rounded-md"
      >
        {mutation.isPending ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
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
      <Label
        className="block font-bold text-[#171717] text-[13px] tracking-[0.5px] uppercase"
      >
        {label}
        {required && <span className="text-[#d4183d] ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p
          className="text-[#d4183d] text-[13px]"
        >
          {error}
        </p>
      )}
    </div>
  )
}
