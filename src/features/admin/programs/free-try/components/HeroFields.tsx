import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ImageIcon, Trash2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription,
} from '#/components/ui/form'
import { ImagePickerDialog } from '#/features/admin/components/ImagePickerDialog'
import { uploadMedia } from '#/lib/media'
import type { FreeTryFormValues } from '../schema'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

export function HeroFields() {
  const form = useFormContext<FreeTryFormValues>()
  const [pickerOpen, setPickerOpen] = useState(false)
  const image = form.watch('hero.image')

  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <Sparkles size={13} className="text-primary" />
        Hero
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name="hero.badge"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Badge</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Open House" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="hero.ctaLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Button text</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Sign Up for Free" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="hero.title"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Title (H1)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Free Artistic Swimming Trial in Bellevue"
                  className="text-[13px]"
                />
              </FormControl>
              <FormDescription className="text-[11px]">
                {field.value?.length ?? 0}/70 · This is the page's main heading for search engines.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="hero.description"
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
          name="hero.ctaUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Button link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://…" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>

      {/* Imagen */}
      <div className="mt-5 border-t border-border pt-5">
        <p className={`${labelCls} mb-2 text-foreground`}>Hero image</p>

        {image ? (
          <div className="flex items-center gap-3">
            <img src={image} alt="" className="h-20 w-32 rounded-[6px] object-cover" />
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
                Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => form.setValue('hero.image', '', { shouldDirty: true })}
              >
                <Trash2 className="mr-1.5 size-3.5" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
            <ImageIcon className="mr-1.5 size-3.5" />
            Choose image
          </Button>
        )}

        <p className="mt-2 text-[11px] text-muted-foreground">
          Maximum 1 MB. The hero image is the largest thing visitors download, so a heavy
          file slows the page down and hurts search ranking. Leave it empty to use the
          built-in image.
        </p>
      </div>

      <ImagePickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        bucket="programs/free-try"
        title="Free Try hero image"
        onSelect={(url) => form.setValue('hero.image', url, { shouldDirty: true })}
        onUpload={async (file) => {
          try {
            return await uploadMedia('programs/free-try', file)
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Upload failed')
            throw err
          }
        }}
      />
    </div>
  )
}
