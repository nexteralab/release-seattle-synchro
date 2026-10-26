import { FileText } from 'lucide-react'
import { cardCls, cardTitle, TextField } from './fields'

export function OverviewFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <FileText size={13} className="text-primary" />
        About the Camp
      </h3>
      <div className="space-y-4">
        <TextField name="overview.heading" label="Heading" placeholder="About the Camp" />
        <TextField
          name="overview.body"
          label="Text"
          rows={8}
          hint="Deja una línea en blanco entre párrafos."
        />
        <TextField name="overview.detailsHeading" label="Details card heading" placeholder="Camp Details" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField name="details.ages" label="Ages" placeholder="6–11 years old" />
          <TextField name="details.schedule" label="Daily schedule" placeholder="9:00 AM – 11:00 AM" />
        </div>
        <TextField name="details.skill_level" label="Skill level" rows={2} />
      </div>
    </div>
  )
}
