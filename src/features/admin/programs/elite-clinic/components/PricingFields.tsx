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

export function PricingFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <DollarSign size={13} className="text-[#0A0A67]" />
        Pricing
      </h3>
      <div className="space-y-4">
        <FormField
          name="pricing.basePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Base Price</FormLabel>
              <FormControl>
                <Input {...field} placeholder="$TBD" className="text-[13px]" />
              </FormControl>
              <FormDescription className="text-[11px]">
                Precio por atleta. Se muestra prominente en la sección de Pricing.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="pricing.earlyBird"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Early Bird (12% off)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First 10 to register get 12% off"
                    className="text-[13px]"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
          <FormField
            name="pricing.standardDiscount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Standard Discount (10% off)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="10% off if you sign up before June 1st"
                    className="text-[13px]"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
