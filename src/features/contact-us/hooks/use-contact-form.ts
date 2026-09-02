import { useMutation } from '@tanstack/react-query'
import { trackConversion } from '#/features/analytics/client'
import { submitContactForm } from '../services/contact.service'
import type { ContactFormInput } from '../schema'

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormInput) => submitContactForm(data),
    onSuccess: () => trackConversion('contact'),
  })
}
