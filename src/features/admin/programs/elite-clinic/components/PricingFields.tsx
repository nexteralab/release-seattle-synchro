import { DollarSign } from 'lucide-react'
import { Input } from '#/components/ui/input'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '#/components/ui/form'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'
const rowCls = 'space-y-3 border border-border rounded-[8px] p-3'
const rowTitle = 'text-[12px] font-bold text-foreground'

function TextField({
  name,
  label,
  placeholder,
  hint,
}: {
  name: string
  label: string
  placeholder: string
  hint?: string
}) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} className="text-[13px]" />
          </FormControl>
          {hint && <FormDescription className="text-[11px]">{hint}</FormDescription>}
          <FormMessage className="text-[11px]" />
        </FormItem>
      )}
    />
  )
}

export function PricingFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <DollarSign size={13} className="text-primary" />
        Pricing
      </h3>
      <div className="space-y-4">
        <TextField
          name="pricing.basePrice"
          label="Base Price"
          placeholder="$350"
          hint="Precio por atleta. Se muestra en grande en la tarjeta de Pricing."
        />

        {/* Early Bird: el título es fijo, precio y condiciones editables */}
        <div className={rowCls}>
          <p className={rowTitle}>Early Bird</p>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3">
            <TextField
              name="pricing.earlyBirdPrice"
              label="Price / Discount"
              placeholder="$325"
            />
            <TextField
              name="pricing.earlyBird"
              label="Details"
              placeholder="Limited to the first 15 registrations!"
            />
          </div>
        </div>

        {/* Segunda opción: todo editable, se oculta si el título queda vacío */}
        <div className={rowCls}>
          <p className={rowTitle}>Second Option</p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-3">
            <TextField
              name="pricing.standardTitle"
              label="Title"
              placeholder="Regular Registration"
            />
            <TextField
              name="pricing.standardPrice"
              label="Price / Discount"
              placeholder="$350"
            />
          </div>
          <TextField
            name="pricing.standardDiscount"
            label="Details (optional)"
            placeholder="After the first 15 spots are filled"
            hint="Deja el título vacío para ocultar esta fila."
          />
        </div>
      </div>
    </div>
  )
}
