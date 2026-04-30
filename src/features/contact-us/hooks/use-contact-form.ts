import { useMutation } from '@tanstack/react-query'
import { submitContactForm } from '../services/contact.service'
import type { ContactFormData } from '../types'

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormData) => submitContactForm(data),
  })
}
