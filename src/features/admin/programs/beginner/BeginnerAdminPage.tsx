import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { Form } from '#/components/ui/form'
import type { BeginnerSubProgram, BeginnerSubProgramId } from '#/features/programs/beginner/types'
import { useBeginnerForm } from './hooks/use-beginner-form'
import { ProgramFields } from './components/ProgramFields'
import { BeginnerPreview } from './components/BeginnerPreview'

export function BeginnerAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useBeginnerForm()
  const [activeTab, setActiveTab] = useState<BeginnerSubProgramId>('novice')

  // Live values para tabs labels y preview
  const noviceLive = form.watch('novice') as BeginnerSubProgram
  const intermediateLive = form.watch('intermediate') as BeginnerSubProgram

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
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Beginner</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button form="beginner-form" type="submit" disabled={saving}>
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
              id="beginner-form"
              onSubmit={form.handleSubmit(save)}
              className="max-w-3xl px-8 py-6 space-y-6"
            >
              <p className="text-[12px] text-muted-foreground">
                Edita los detalles de cada equipo. Las descripciones, los tryouts requirements y la sección
                <em> what to bring / what to expect</em> están fijos en el código.
              </p>

              <Tabs value={activeTab} onValueChange={v => setActiveTab(v as BeginnerSubProgramId)}>
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="novice">{noviceLive.name}</TabsTrigger>
                  <TabsTrigger value="intermediate">{intermediateLive.name}</TabsTrigger>
                </TabsList>

                <TabsContent value="novice" className="space-y-5 mt-4">
                  <ProgramFields path="novice" showFirstPractice />
                </TabsContent>

                <TabsContent value="intermediate" className="space-y-5 mt-4">
                  <ProgramFields path="intermediate" showFirstPractice={false} />
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>

        {/* Preview */}
        <BeginnerPreview
          activeTab={activeTab}
          novice={noviceLive}
          intermediate={intermediateLive}
        />

      </div>
    </div>
  )
}
