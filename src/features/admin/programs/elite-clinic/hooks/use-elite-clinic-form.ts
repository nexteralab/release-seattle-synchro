import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  eliteClinicFormSchema,
  FORM_DEFAULTS,
  type EliteClinicFormValues,
} from '../schema'
import {
  getEliteClinicConfig,
  saveEliteClinicConfig,
} from '../elite-clinic-admin.service'

export function useEliteClinicForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<EliteClinicFormValues>({
    resolver: zodResolver(eliteClinicFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getEliteClinicConfig()
      .then(cfg => form.reset(cfg))
      .catch(() => toast.error('Failed to load Elite Clinic config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: EliteClinicFormValues) {
    setSaving(true)
    try {
      await saveEliteClinicConfig(values)
      toast.success('Elite Clinic saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
