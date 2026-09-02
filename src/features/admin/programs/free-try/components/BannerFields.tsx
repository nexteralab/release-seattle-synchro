import { Megaphone } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription,
} from '#/components/ui/form'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

export function BannerFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Megaphone size={13} className="text-primary" />
        Closing banner
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name="banner.heading"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Heading</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ready to Dive In?" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="banner.description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="banner.registerLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Register button</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Register Now" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="banner.contactLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Contact button</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contact Us" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="banner.registerUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Register link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://…" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        {/* Las cuatro imágenes del banner son de marca y viven en el bundle:
            se elige entre ellas, no se sube una nueva. */}
        <FormField
          name="banner.image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Background image</FormLabel>
              {/* Native select y no el de Radix: son 4 opciones estáticas, no
                  vale un portal con popper y scroll-lock. */}
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
    </div>
  )
}
