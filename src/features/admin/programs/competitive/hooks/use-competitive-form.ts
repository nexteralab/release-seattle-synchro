import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { competitiveFormSchema, FORM_DEFAULTS, type CompetitiveFormValues } from '../schema'
import { getCompetitiveConfig, saveCompetitiveConfig } from '../competitive-admin.service'

export function useCompetitiveForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [configId, setConfigId] = useState<string | undefined>(undefined)

  const form = useForm<CompetitiveFormValues>({
    resolver: zodResolver(competitiveFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getCompetitiveConfig()
      .then(cfg => {
        setConfigId(cfg.id)
        // Mantener el orden fijo (12u, 13-15, junior) — usar defaults para grupos faltantes
        const byId = new Map(cfg.age_groups.map(g => [g.id, g]))
        const merged = FORM_DEFAULTS.age_groups.map(d => byId.get(d.id) ?? d)
        form.reset({ age_groups: merged })
      })
      .catch(() => toast.error('Failed to load Competitive config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: CompetitiveFormValues) {
    setSaving(true)
    try {
      await saveCompetitiveConfig({
        id: configId,
        age_groups: values.age_groups,
      })
      toast.success('Competitive program saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
