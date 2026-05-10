import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import type { FreeTryData } from '#/features/programs/free-try/types'
import { useFreeTryForm } from './hooks/use-free-try-form'
import { EventFields } from './components/EventFields'
import { LocationFields } from './components/LocationFields'
import { FreeTryPreview } from './components/FreeTryPreview'

export function FreeTryAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useFreeTryForm()

  // Live values para preview
  const liveData = form.watch() as FreeTryData

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
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Free Try</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button form="free-try-form" type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">

        {/* Form */}
        <div className="flex-1 min-h-0 overflow-y-auto w-full">
          <Form {...form}>
            <form
              id="free-try-form"
              onSubmit={form.handleSubmit(save)}
              className="px-8 py-6 space-y-6 w-full"
            >
              <p className="text-[12px] text-muted-foreground">
                Edita la información del evento de prueba gratuita. El nombre del programa,
                la <em>Critical Safety Requirement</em>, el <em>What to Bring</em> y el CTA
                están fijos en el código.
              </p>

              <EventFields />
              <LocationFields />
            </form>
          </Form>
        </div>

        {/* Preview */}
        <FreeTryPreview data={liveData} />

      </div>
    </div>
  )
}
