import { Megaphone } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '#/components/ui/form'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'
import { TextField, cardCls, cardTitle, labelCls } from './fields'

export function BannerFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Megaphone size={13} className="text-primary" />
        Closing banner
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2 space-y-4">
          <TextField name="banner.heading" label="Heading" placeholder="Ready to Join?" />
          <TextField name="banner.description" label="Description" rows={2} />
        </div>
        <TextField name="banner.contactLabel" label="Contact button" placeholder="Contact Us" />
        {/* Las 4 imágenes del banner son de marca y viven en el bundle. Native
            select: 4 opciones estáticas, no vale el portal de Radix. */}
        <FormField
          name="banner.image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Background image</FormLabel>
              <FormControl>
                <NativeSelect {...field} className="text-[13px]">
                  {(['1', '2', '3', '4'] as const).map(n => (
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
    </div>
  )
}
