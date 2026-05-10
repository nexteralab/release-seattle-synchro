import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { freeTryFormSchema, FORM_DEFAULTS, type FreeTryFormValues } from '../schema'
import { getFreeTryConfig, saveFreeTryConfig } from '../free-try-admin.service'

export function useFreeTryForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<FreeTryFormValues>({
    resolver: zodResolver(freeTryFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getFreeTryConfig()
      .then(cfg => form.reset(cfg))
      .catch(() => toast.error('Failed to load Free Try config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: FreeTryFormValues) {
    setSaving(true)
    try {
      await saveFreeTryConfig(values)
      toast.success('Free Try saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
