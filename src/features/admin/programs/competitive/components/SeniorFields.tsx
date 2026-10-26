import { Trophy } from 'lucide-react'
import { TextField, cardCls, cardTitle } from './fields'

export function SeniorFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Trophy size={13} className="text-primary" />
        Senior Team
      </h3>
      <div className="space-y-4">
        <TextField name="senior.title" label="Title" placeholder="Senior Team" />
        <TextField name="senior.description" label="Description" rows={4} />
      </div>
    </div>
  )
}
