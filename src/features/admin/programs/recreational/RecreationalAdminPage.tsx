import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ImageIcon } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { HeroImageField } from '#/features/admin/components/HeroImageField'
import type { RecreationalData } from '#/features/programs/recreational/types'
import { useRecreationalForm } from './hooks/use-recreational-form'
import { SectionCard, TextField } from './components/fields'
import {
  BannerFields, ClassLookFields, ComparisonFields, FaqFields, GymnasticsFitFields,
  OverviewFields, ProgramFields, SummerCampFitFields, WhoForFields,
} from './components/SectionFields'
import { RecreationalPreview } from './components/RecreationalPreview'

export function RecreationalAdminPage() {
  const navigate = useNavigate()
  const { form, save, loading, saving } = useRecreationalForm()

  // Live values para preview
  const liveData = form.watch() as RecreationalData

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

  return (
    // relative: el <select> nativo oculto de Radix es absolute; sin un ancestro
    // posicionado se escapa del scroll del admin y crea un segundo scroll.
    <div className="relative">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background">
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
      <div className="flex">
        <Form {...form}>
          <form
            id="recreational-form"
            onSubmit={form.handleSubmit(save)}
            className="flex-1 min-w-0 px-8 py-6 space-y-6"
          >
            <p className="text-[12px] text-muted-foreground">
              Todo el texto de la página es editable. Las imágenes de cada sección y las
              reseñas siguen en el código.
            </p>

            {/* Hero */}
            <HeroImageField name="hero.image" folder="programs/recreational" title="Recreational hero image" />
            <SectionCard icon={ImageIcon} title="Hero image alt text">
              <TextField name="hero.alt" label="Alt text" hint="Describe la imagen. Ayuda al SEO y la accesibilidad." />
            </SectionCard>
            <OverviewFields />
            <ProgramFields />
            <ClassLookFields />
            <WhoForFields />
            <GymnasticsFitFields />
            <ComparisonFields />
            <SummerCampFitFields />
            <FaqFields />
            <BannerFields />
          </form>
        </Form>

        {/* Preview */}
        <RecreationalPreview data={liveData} />

      </div>
    </div>
  )
}
