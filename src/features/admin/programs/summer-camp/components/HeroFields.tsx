import { Sparkles } from 'lucide-react'
import { cardCls, cardTitle, TextField } from './fields'

export function HeroFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Sparkles size={13} className="text-primary" />
        Hero
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField name="hero.badge" label="Badge" placeholder="Limited Spots Available" />
        <TextField name="hero.ctaLabel" label="Button text" placeholder="Register Now" />
        <TextField name="hero.kicker" label="Line above title" placeholder="Artistic Swimming" />
        <TextField name="hero.subtitle" label="Line below title" placeholder="for kids in Washington" />
        <TextField
          name="hero.title"
          label="Title (H1)"
          placeholder="Summer Camp"
          hint="This is the page's main heading for search engines."
          className="md:col-span-2"
        />
        <TextField name="hero.ctaUrl" label="Button link" placeholder="https://…" className="md:col-span-2" />
      </div>
    </div>
  )
}
