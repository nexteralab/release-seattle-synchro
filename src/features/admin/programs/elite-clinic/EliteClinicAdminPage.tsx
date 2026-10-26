import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import type { EliteClinicData } from '#/features/programs/elite-clinic/types'
import { useEliteClinicForm } from './hooks/use-elite-clinic-form'
import { BasicsFields } from './components/BasicsFields'
import { RegisterField } from './components/RegisterField'
import { DescriptionField } from './components/DescriptionField'
import { ObjectivesFields } from './components/ObjectivesFields'
import { PricingFields } from './components/PricingFields'
import { ManagerFields } from './components/ManagerFields'
import { LocationFields } from './components/LocationFields'
import { PackingListField } from './components/PackingListField'
import { CoachesList } from './components/CoachesList'
import { EliteClinicPreview } from './components/EliteClinicPreview'

export function EliteClinicAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useEliteClinicForm()

  // Live values para preview
  const liveData = form.watch() as EliteClinicData

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

  return (
    <div className="">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/app/programs' })}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <p className="text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground">Programs</p>
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Elite Clinic</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button form="elite-clinic-form" type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        <Form {...form}>
          <form
            id="elite-clinic-form"
            onSubmit={form.handleSubmit(save)}
            className="flex-1 max-w-3xl px-8 py-6 space-y-6"
          >
            <p className="text-[12px] text-muted-foreground">
              Todo el contenido de la página es editable.
            </p>

            {/* Hero */}
            <BasicsFields />
            <RegisterField />
            {/* Overview */}
            <DescriptionField />
            <ObjectivesFields />
            <PricingFields />
            {/* Details */}
            <ManagerFields />
            <LocationFields />
            <PackingListField />
            {/* Coaches */}
            <CoachesList />
          </form>
        </Form>

        {/* Preview */}
        <EliteClinicPreview data={liveData} />

      </div>
    </div>
  )
}
