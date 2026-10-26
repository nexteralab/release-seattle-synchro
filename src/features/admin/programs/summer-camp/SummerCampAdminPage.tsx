import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import type { SummerCampContent } from '#/features/programs/summer-camp/types'
import { HeroImageField } from '#/features/admin/components/HeroImageField'
import { BannerFields } from '#/features/admin/programs/free-try/components/BannerFields'
import { useSummerCampForm } from './hooks/use-summer-camp-form'
import { HeroFields } from './components/HeroFields'
import { OverviewFields } from './components/OverviewFields'
import { SessionsFields } from './components/SessionsFields'
import { RequirementsFields } from './components/RequirementsFields'
import { ReviewsFields } from './components/ReviewsFields'
import { SummerCampPreview } from './components/SummerCampPreview'

export function SummerCampAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useSummerCampForm()

  // Live values para preview
  const liveData = form.watch() as SummerCampContent

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

  return (
    // relative: elementos absolute ocultos (p. ej. selects de Radix) no deben
    // escaparse del scroll del admin y crear un segundo scroll.
    <div className="relative">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/app/programs' })}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <p className="text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground">Programs</p>
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Summer Camp</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button form="summer-camp-form" type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        <Form {...form}>
          <form
            id="summer-camp-form"
            onSubmit={form.handleSubmit(save)}
            className="flex-1 min-w-0 px-8 py-6 space-y-6"
          >
            <p className="text-[12px] text-muted-foreground">
              Todo el contenido de la página principal es editable. Las páginas por ciudad
              siguen en el código.
            </p>

            <HeroFields />
            <HeroImageField name="hero.image" folder="programs/summer-camp" title="Summer Camp hero image" />
            <OverviewFields />
            <SessionsFields />
            <RequirementsFields />
            <ReviewsFields />
            <BannerFields />
          </form>
        </Form>

        {/* Preview */}
        <SummerCampPreview data={liveData} />

      </div>
    </div>
  )
}
