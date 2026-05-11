import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { useEliteClinicForm } from './hooks/use-elite-clinic-form'
import { BasicsFields } from './components/BasicsFields'
import { DescriptionField } from './components/DescriptionField'
import { PricingFields } from './components/PricingFields'
import { ManagerFields } from './components/ManagerFields'
import { CoachesList } from './components/CoachesList'
import { RegisterField } from './components/RegisterField'
import { EliteClinicPreview, type EliteClinicTab } from './components/EliteClinicPreview'
import type { EliteClinicFormValues } from './schema'

const TABS: { id: EliteClinicTab; label: string }[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'coaches', label: 'Coaches' },
]

export function EliteClinicAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useEliteClinicForm()
  const [activeTab, setActiveTab] = useState<EliteClinicTab>('hero')

  // Live values para preview
  const liveValues = form.watch() as EliteClinicFormValues

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

  return (
    <div className="peer-[.header-fixed]/header:mt-16 flex flex-col flex-1 min-h-0">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background shrink-0 z-10">
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
      <div className="flex flex-1 min-h-0">

        {/* Form */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Form {...form}>
            <form
              id="elite-clinic-form"
              onSubmit={form.handleSubmit(save)}
              className="max-w-3xl px-8 py-6 space-y-6"
            >
              <p className="text-[12px] text-muted-foreground">
                Edita la información del clinic por sección. La <em>subtitle</em>, ubicaciones,
                {' '}<em>camp objectives</em> y <em>packing list</em> están fijos en el código.
              </p>

              <Tabs value={activeTab} onValueChange={v => setActiveTab(v as EliteClinicTab)}>
                <TabsList className="w-full grid grid-cols-4">
                  {TABS.map(t => (
                    <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="hero" className="space-y-5 mt-4">
                  <BasicsFields />
                  <RegisterField />
                </TabsContent>

                <TabsContent value="overview" className="space-y-5 mt-4">
                  <DescriptionField />
                  <PricingFields />
                </TabsContent>

                <TabsContent value="details" className="space-y-5 mt-4">
                  <ManagerFields />
                </TabsContent>

                <TabsContent value="coaches" className="space-y-5 mt-4">
                  <CoachesList />
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>

        {/* Preview */}
        <EliteClinicPreview activeTab={activeTab} values={liveValues} />

      </div>
    </div>
  )
}
