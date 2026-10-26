import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { recreationalFormSchema, FORM_DEFAULTS, type RecreationalFormValues } from '../schema'
import { getRecreationalConfig, saveRecreationalConfig } from '../recreational-admin.service'

export function useRecreationalForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<RecreationalFormValues>({
    resolver: zodResolver(recreationalFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getRecreationalConfig()
      .then(cfg => form.reset(cfg))
      .catch(() => toast.error('Failed to load Recreational config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: RecreationalFormValues) {
    setSaving(true)
    try {
      await saveRecreationalConfig(values)
      toast.success('Recreational program saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
