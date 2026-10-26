import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { beginnerFormSchema, FORM_DEFAULTS, type BeginnerFormValues } from '../schema'
import { getBeginnerConfig, saveBeginnerConfig } from '../beginner-admin.service'

export function useBeginnerForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<BeginnerFormValues>({
    resolver: zodResolver(beginnerFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getBeginnerConfig()
      .then(cfg => form.reset(cfg))
      .catch(() => toast.error('Failed to load Beginner config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: BeginnerFormValues) {
    setSaving(true)
    try {
      await saveBeginnerConfig(values)
      toast.success('Beginner program saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
