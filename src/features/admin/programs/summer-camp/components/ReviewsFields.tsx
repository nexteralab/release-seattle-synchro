import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MessageSquareQuote, Plus, Trash2, ImageIcon } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '#/components/ui/form'
import { REVIEWS } from '#/components/Reviews'
import { ImagePickerDialog } from '#/features/admin/components/ImagePickerDialog'
import { uploadMedia } from '#/lib/media'
import type { SummerCampFormValues } from '../schema'
import { cardCls, cardTitle, labelCls, TextField } from './fields'

const MAX_PHOTOS = 2

export function ReviewsFields() {
  const { control } = useFormContext<SummerCampFormValues>()
  const { fields, append, remove, replace } = useFieldArray({ control, name: 'reviews' })

  return (
    <div className={cardCls}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cardTitle.replace('mb-4', '')}>
          <MessageSquareQuote size={13} className="text-primary" />
          Reviews
        </h3>
        <div className="flex gap-2">
          {fields.length === 0 && (
            <Button type="button" variant="ghost" size="sm" onClick={() => replace(REVIEWS)}>
              Start from current reviews
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: '', paras: [''], photos: [] })}
          >
            <Plus size={13} /> Add Review
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {fields.map((f, i) => (
          <div key={f.id} className="border border-border rounded-[8px] p-3 space-y-3">
            <div className="flex items-start gap-3">
              <TextField name={`reviews.${i}.name`} label="Name" placeholder="Parent name" className="flex-1" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-destructive hover:opacity-70 mt-6 shrink-0"
                aria-label="Remove review"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* ponytail: un textarea con párrafos separados por línea en blanco, no una lista. */}
            <FormField
              name={`reviews.${i}.paras`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelCls}>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      value={(field.value as string[]).join('\n\n')}
                      onChange={e => field.onChange(e.target.value.split('\n\n'))}
                      onBlur={() => field.onChange((field.value as string[]).map(s => s.trim()).filter(Boolean))}
                      rows={5}
                      className="text-[13px] resize-y"
                    />
                  </FormControl>
                  <FormDescription className="text-[11px]">Deja una línea en blanco entre párrafos.</FormDescription>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <ReviewPhotos index={i} />
          </div>
        ))}

        {fields.length === 0 && (
          <p className="text-[13px] text-muted-foreground">
            Sin reviews propias: la página muestra las reviews de siempre del sitio.
          </p>
        )}
      </div>
    </div>
  )
}

function ReviewPhotos({ index }: { index: number }) {
  const { control } = useFormContext<SummerCampFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: `reviews.${index}.photos` })
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <div className="space-y-2">
      <p className={labelCls}>Photos (max {MAX_PHOTOS})</p>
      {fields.map((f, j) => (
        <div key={f.id} className="flex items-center gap-3">
          <img src={f.src} alt="" className="h-14 w-20 rounded-[6px] object-cover shrink-0" />
          <FormField
            name={`reviews.${index}.photos.${j}.alt`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder="Describe the photo (alt text)" className="text-[13px]" />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="button"
            onClick={() => remove(j)}
            className="text-destructive hover:opacity-70 shrink-0"
            aria-label="Remove photo"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      {fields.length < MAX_PHOTOS && (
        <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
          <ImageIcon className="mr-1.5 size-3.5" />
          Add photo
        </Button>
      )}

      <ImagePickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        bucket="programs/summer-camp"
        title="Review photo"
        onSelect={(url) => append({ src: url, alt: '' })}
        onUpload={(file) => uploadMedia('programs/summer-camp', file)}
      />
    </div>
  )
}
