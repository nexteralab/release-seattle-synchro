import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { HeroImageField } from '#/features/admin/components/HeroImageField'
import type { CompetitiveData } from '#/features/programs/competitive/types'
import { useCompetitiveForm } from './hooks/use-competitive-form'
import { OverviewFields } from './components/OverviewFields'
import { GroupFields } from './components/GroupFields'
import { SeniorFields } from './components/SeniorFields'
import { BannerFields } from './components/BannerFields'
import { CompetitivePreview } from './components/CompetitivePreview'

export function CompetitiveAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useCompetitiveForm()

  // Live values para preview
  const liveData = form.watch() as CompetitiveData

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

  return (
    // relative: ancla cualquier elemento absolute oculto (p. ej. selects nativos de
    // Radix) para que no se escape del scroll del admin y cree un segundo scroll.
    <div className="relative">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
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
      <div className="flex">
        <Form {...form}>
          <form
            id="competitive-form"
            onSubmit={form.handleSubmit(save)}
            className="flex-1 min-w-0 px-8 py-6 space-y-6"
          >
            <p className="text-[12px] text-muted-foreground">
              Todo el contenido de la página es editable.
            </p>

            <HeroImageField name="hero.image" folder="programs/competitive" title="Competitive hero image" />
            <OverviewFields />
            <GroupFields name="under12" label="12 & Under" />
            <GroupFields name="teen" label="13–15" />
            <GroupFields name="junior" label="Junior / 16–19" />
            <SeniorFields />
            <BannerFields />
          </form>
        </Form>

        {/* Preview */}
        <CompetitivePreview data={liveData} />

      </div>
    </div>
  )
}
