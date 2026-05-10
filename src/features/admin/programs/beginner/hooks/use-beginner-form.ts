import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { beginnerFormSchema, FORM_DEFAULTS, type BeginnerFormValues } from '../schema'
import { getBeginnerConfig, saveBeginnerConfig } from '../beginner-admin.service'

export function useBeginnerForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [configId, setConfigId] = useState<string | undefined>(undefined)

  const form = useForm<BeginnerFormValues>({
    resolver: zodResolver(beginnerFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getBeginnerConfig()
      .then(cfg => {
        setConfigId(cfg.id)
        const novice = cfg.sub_programs.find(p => p.id === 'novice') ?? FORM_DEFAULTS.novice
        const intermediate =
          cfg.sub_programs.find(p => p.id === 'intermediate') ?? FORM_DEFAULTS.intermediate
        form.reset({ novice, intermediate })
      })
      .catch(() => toast.error('Failed to load Beginner config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: BeginnerFormValues) {
    setSaving(true)
    try {
      await saveBeginnerConfig({
        id: configId,
        sub_programs: [values.novice, values.intermediate],
      })
      toast.success('Beginner program saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
