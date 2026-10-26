import {
  BookOpen, Dumbbell, HelpCircle, Megaphone, Sparkles, Sun, Table, Users, Waves,
} from 'lucide-react'
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from '#/components/ui/form'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'
import { LeadItemsField, LinesField, ObjectList, SectionCard, TextField, labelCls } from './fields'

// Una tarjeta por sección de la página pública, en el mismo orden.

export function OverviewFields() {
  return (
    <SectionCard icon={BookOpen} title="Overview">
      <TextField name="overview.title" label="Title (H1)" hint="El heading principal de la página para buscadores." />
      <TextField name="overview.subtitle" label="Subtitle" />
      <TextField
        name="overview.body"
        label="Body"
        rows={6}
        hint="Envuelve palabras en **dobles asteriscos** para ponerlas en negrita. El badge de arriba usa las edades del programa."
      />
    </SectionCard>
  )
}

export function ProgramFields() {
  return (
    <SectionCard icon={Waves} title="Program (Sharks & Mermaids)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField name="program.name" label="Name" />
        <TextField name="program.ages" label="Ages" placeholder="5–10" />
        <TextField name="program.coach" label="Coach" className="md:col-span-2" />
      </div>
      <TextField name="program.description" label="Description" rows={3} />
      <TextField name="program.workout_days_times" label="Workout days / times" />
      <TextField name="program.schedule_note" label="Schedule note" hint="Opcional. Vacío = no se muestra." />
      <TextField name="program.duration" label="Duration" hint="Opcional. Vacío = no se muestra." />
      <TextField name="program.cost" label="Cost" />
      <TextField name="program.cost_note" label="Cost note" rows={2} hint="Opcional. Vacío = no se muestra." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">
        <TextField name="program.register_label" label="Register button" />
        <TextField name="program.register_url" label="Register link" placeholder="https://…" />
      </div>
      <TextField name="program.skills_title" label="Skills card title" />
      <LinesField name="program.skills" label="Required skills" rows={6} />
    </SectionCard>
  )
}

export function ClassLookFields() {
  return (
    <SectionCard icon={Sparkles} title="What a class looks like">
      <TextField name="classLook.title" label="Title" />
      <LinesField name="classLook.pills" label="Pills" />
      <TextField name="classLook.intro" label="Intro" rows={3} />
      <LeadItemsField name="classLook.items" label="Checklist" />
      <TextField name="classLook.callout" label="Callout" rows={2} hint="Opcional. Vacío = caja vacía." />
    </SectionCard>
  )
}

export function WhoForFields() {
  return (
    <SectionCard icon={Users} title="Who is it for">
      <TextField name="whoFor.title" label="Title" />
      <LeadItemsField name="whoFor.items" label="Cards" />
    </SectionCard>
  )
}

export function GymnasticsFitFields() {
  return (
    <SectionCard icon={Dumbbell} title="Gymnastics / dance fit">
      <TextField name="gymnasticsFit.kicker" label="Kicker" />
      <TextField name="gymnasticsFit.title" label="Title" />
      <LinesField name="gymnasticsFit.inputs" label="Pills" rows={3} />
      <TextField name="gymnasticsFit.result" label="Result pill" />
      <TextField name="gymnasticsFit.body" label="Body" rows={3} />
      <LeadItemsField name="gymnasticsFit.items" label="Checklist" />
    </SectionCard>
  )
}

export function ComparisonFields() {
  return (
    <SectionCard icon={Table} title="Comparison table">
      <TextField name="comparison.title" label="Title" />
      <TextField name="comparison.intro" label="Intro" rows={2} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField name="comparison.recreationalLabel" label="Column 1" />
        <TextField name="comparison.competitiveLabel" label="Column 2" />
      </div>
      <ObjectList
        name="comparison.rows"
        label="Rows"
        addLabel="Add row"
        newItem={{ label: '', recreational: '', competitive: '' }}
        renderItem={(p) => (
          <>
            <TextField name={`${p}.label`} label="Row label" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <TextField name={`${p}.recreational`} label="Column 1" />
              <TextField name={`${p}.competitive`} label="Column 2" />
            </div>
          </>
        )}
      />
      <TextField
        name="comparison.footerLabel"
        label="Last row label"
        hint="Fila que ocupa las dos columnas. Vacío = no se muestra."
      />
      <TextField name="comparison.footerText" label="Last row text" rows={2} />
    </SectionCard>
  )
}

export function SummerCampFitFields() {
  return (
    <SectionCard icon={Sun} title="Summer camp fit">
      <TextField name="summerCampFit.title" label="Title" />
      <TextField name="summerCampFit.intro" label="Intro" rows={3} />
      <LinesField name="summerCampFit.highlights" label="Highlights" />
      <TextField name="summerCampFit.outro" label="Outro" rows={3} />
      <TextField name="summerCampFit.ctaLabel" label="Button" hint="Lleva a /programs/summer-camp." />
    </SectionCard>
  )
}

export function FaqFields() {
  return (
    <SectionCard icon={HelpCircle} title="FAQ">
      <TextField name="faq.title" label="Title" />
      <ObjectList
        name="faq.items"
        label="Questions"
        addLabel="Add question"
        newItem={{ question: '', answer: '' }}
        emptyText="No questions yet. The FAQ section will not appear on the page."
        renderItem={(p) => (
          <>
            <TextField name={`${p}.question`} label="Question" />
            <TextField name={`${p}.answer`} label="Answer" rows={4} />
          </>
        )}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">
        <TextField name="faq.blogLead" label="Blog link lead" />
        <TextField name="faq.blogLabel" label="Blog link text" hint="Lleva al blog. Vacío = no se muestra." />
      </div>
    </SectionCard>
  )
}

export function BannerFields() {
  return (
    <SectionCard icon={Megaphone} title="Closing banner">
      <TextField name="banner.heading" label="Heading" />
      <TextField name="banner.description" label="Description" rows={2} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField name="banner.contactLabel" label="Contact button" />
        {/* Imágenes de marca del bundle: se elige entre ellas, no se sube una nueva. */}
        <FormField
          name="banner.image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Background image</FormLabel>
              <FormControl>
                <NativeSelect {...field} className="text-[13px]">
                  {(['1', '2', '3', '4'] as const).map((n) => (
                    <NativeSelectOption key={n} value={n}>
                      Image {n}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </SectionCard>
  )
}
