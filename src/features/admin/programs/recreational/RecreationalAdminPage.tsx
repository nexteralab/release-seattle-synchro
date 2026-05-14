import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { Form } from '#/components/ui/form'
import type {
  RecreationalSubProgram,
  RecreationalSubProgramId,
} from '#/features/programs/recreational/types'
import { useRecreationalForm } from './hooks/use-recreational-form'
import { TABS, TAB_INDEX } from './schema'
import { SubProgramFields } from './components/SubProgramFields'
import { RecreationalPreview } from './components/RecreationalPreview'

// Qué campos opcionales mostrar por sub-programa
const FIELD_VISIBILITY: Record<
  RecreationalSubProgramId,
  { showScheduleNote: boolean; showDuration: boolean; showCostNote: boolean }
> = {
  'sharks-mermaids': { showScheduleNote: true, showDuration: false, showCostNote: true },
}

export function RecreationalAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useRecreationalForm()
  const [activeTab, setActiveTab] = useState<RecreationalSubProgramId>('sharks-mermaids')

  const livePrograms = form.watch('sub_programs') as RecreationalSubProgram[]

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
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Recreational</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button form="recreational-form" type="submit" disabled={saving}>
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
              id="recreational-form"
              onSubmit={form.handleSubmit(save)}
              className="max-w-3xl px-8 py-6 space-y-6"
            >
              <p className="text-[12px] text-muted-foreground">
                Edita los detalles de cada sub-programa. Las descripciones, los <em>required swimming skills</em>
                {' '}y la sección <em>unique opportunity</em> están fijos en el código.
              </p>

              <Tabs value={activeTab} onValueChange={v => setActiveTab(v as RecreationalSubProgramId)}>
                <TabsList className="w-full grid grid-cols-3">
                  {TABS.map(t => (
                    <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>
                  ))}
                </TabsList>

                {TABS.map(t => (
                  <TabsContent key={t.id} value={t.id} className="space-y-5 mt-4">
                    <SubProgramFields
                      index={TAB_INDEX[t.id]}
                      {...FIELD_VISIBILITY[t.id]}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </form>
          </Form>
        </div>

        {/* Preview */}
        <RecreationalPreview activeTab={activeTab} programs={livePrograms} />

      </div>
    </div>
  )
}
