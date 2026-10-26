import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import type { BeginnerData } from '#/features/programs/beginner/types'
import { HeroImageField } from '#/features/admin/components/HeroImageField'
import { useBeginnerForm } from './hooks/use-beginner-form'
import { OverviewFields } from './components/OverviewFields'
import { ProgramFields } from './components/ProgramFields'
import { NoviceExtrasFields } from './components/NoviceExtrasFields'
import { BannerFields } from './components/BannerFields'
import { BeginnerPreview } from './components/BeginnerPreview'

const sectionCls = 'text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground pt-2'

export function BeginnerAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useBeginnerForm()

  // Live values para preview
  const liveData = form.watch() as BeginnerData

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

  return (
    // relative: ancla cualquier elemento absolute (p. ej. selects ocultos) al
    // scroll del admin; sin esto aparece un segundo scroll.
    <div className="relative">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
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
      <div className="flex">
        <Form {...form}>
          <form
            id="beginner-form"
            onSubmit={form.handleSubmit(save)}
            className="flex-1 min-w-0 px-8 py-6 space-y-6"
          >
            <p className="text-[12px] text-muted-foreground">
              Todo el contenido de la página es editable.
            </p>

            {/* Hero + Overview */}
            <HeroImageField name="hero.image" folder="programs/beginner" title="Beginner hero image" />
            <OverviewFields />

            {/* Novice */}
            <p className={sectionCls}>Novice</p>
            <ProgramFields path="novice" showFirstPractice />
            <NoviceExtrasFields />

            {/* Intermediate */}
            <p className={sectionCls}>Intermediate</p>
            <ProgramFields path="intermediate" showFirstPractice={false} />

            <BannerFields />
          </form>
        </Form>

        {/* Preview */}
        <BeginnerPreview data={liveData} />

      </div>
    </div>
  )
}
