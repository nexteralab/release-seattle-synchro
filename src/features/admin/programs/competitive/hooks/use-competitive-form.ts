import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { competitiveFormSchema, FORM_DEFAULTS, type CompetitiveFormValues } from '../schema'
import { getCompetitiveConfig, saveCompetitiveConfig } from '../competitive-admin.service'

export function useCompetitiveForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<CompetitiveFormValues>({
    resolver: zodResolver(competitiveFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getCompetitiveConfig()
      .then(cfg => form.reset(cfg))
      .catch(() => toast.error('Failed to load Competitive config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: CompetitiveFormValues) {
    setSaving(true)
    try {
      await saveCompetitiveConfig(values)
      toast.success('Competitive program saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
