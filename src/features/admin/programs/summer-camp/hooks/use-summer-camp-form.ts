import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { summerCampFormSchema, FORM_DEFAULTS, type SummerCampFormValues } from '../schema'
import { getSummerCampConfig, saveSummerCampConfig } from '../summer-camp-admin.service'

export function useSummerCampForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<SummerCampFormValues>({
    resolver: zodResolver(summerCampFormSchema),
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    getSummerCampConfig()
      .then(cfg => form.reset(cfg))
      .catch(() => toast.error('Failed to load Summer Camp config'))
      .finally(() => setLoading(false))
  }, [form])

  async function save(values: SummerCampFormValues) {
    setSaving(true)
    try {
      await saveSummerCampConfig(values)
      toast.success('Summer Camp saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return { form, save, loading, saving }
}
