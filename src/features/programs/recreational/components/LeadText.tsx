import type { RecreationalLeadItem } from '../types'

/** Texto con **negritas** (solo eso, nada de markdown completo). */
export function BoldText({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? <strong key={i} className="text-secondary font-semibold">{part}</strong> : part,
      )}
    </>
  )
}

/** "<strong>lead</strong> rest" — el patrón de las listas con check. */
export function LeadText({ item }: { item: RecreationalLeadItem }) {
  return (
    <>
      <strong className="text-secondary font-semibold">{item.lead}</strong> {item.rest}
    </>
  )
}
