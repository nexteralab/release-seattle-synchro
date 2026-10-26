import { FileText } from 'lucide-react'
import { TextField, cardCls, cardTitle } from './fields'

export function OverviewFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <FileText size={13} className="text-primary" />
        Overview
      </h3>
      <div className="space-y-4">
        <TextField
          name="overview.title"
          label="Page title (H1)"
          placeholder="Competitive Programs"
          hint="Título principal de la página para buscadores."
        />
        <TextField name="overview.heading" label="Heading" placeholder="Program Overview" />
        <TextField
          name="overview.body"
          label="Text"
          rows={6}
          hint="Separa los párrafos con una línea en blanco."
        />
        <TextField
          name="hero.alt"
          label="Hero image alt text"
          placeholder="Artistic swimming coach training kids poolside"
          hint="Describe la imagen del hero (accesibilidad y SEO)."
        />
      </div>
    </div>
  )
}
