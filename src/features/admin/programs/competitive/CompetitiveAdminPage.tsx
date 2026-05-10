import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { Form } from '#/components/ui/form'
import type { AgeGroup, AgeGroupId } from '#/features/programs/competitive/types'
import { useCompetitiveForm } from './hooks/use-competitive-form'
import { TABS, TAB_INDEX } from './schema'
import { AgeGroupFields } from './components/AgeGroupFields'
import { CompetitivePreview } from './components/CompetitivePreview'

export function CompetitiveAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useCompetitiveForm()
  const [activeTab, setActiveTab] = useState<AgeGroupId>('12u')

  // Live values para preview
  const liveGroups = form.watch('age_groups') as AgeGroup[]

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
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Competitive</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button form="competitive-form" type="submit" disabled={saving}>
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
              id="competitive-form"
              onSubmit={form.handleSubmit(save)}
              className="max-w-3xl px-8 py-6 space-y-6"
            >
              <p className="text-[12px] text-muted-foreground">
                Edita únicamente <strong>coaches</strong> y <strong>workout days</strong> de cada grupo.
                El resto del contenido (descripción, highlights, hero, overview) está fijo en el código.
              </p>

              <Tabs value={activeTab} onValueChange={v => setActiveTab(v as AgeGroupId)}>
                <TabsList className="w-full grid grid-cols-3">
                  {TABS.map(t => (
                    <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>
                  ))}
                </TabsList>

                {TABS.map(t => (
                  <TabsContent key={t.id} value={t.id} className="space-y-5 mt-4">
                    <AgeGroupFields index={TAB_INDEX[t.id]} />
                  </TabsContent>
                ))}
              </Tabs>
            </form>
          </Form>
        </div>

        {/* Preview */}
        <CompetitivePreview activeTab={activeTab} groups={liveGroups} />

      </div>
    </div>
  )
}
