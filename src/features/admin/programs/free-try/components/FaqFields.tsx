import { useFieldArray, useFormContext } from 'react-hook-form'
import { ChevronDown, ChevronUp, HelpCircle, Plus, Trash2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from '#/components/ui/form'
import type { FreeTryFormValues } from '../schema'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase'

export function FaqFields() {
  const { control } = useFormContext<FreeTryFormValues>()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'faq' })

  return (
    <div className={cardCls}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={cardTitle}>
          <HelpCircle size={13} className="text-primary" />
          FAQ
          <span className="ml-1 font-normal normal-case tracking-normal text-muted-foreground">
            {fields.length} {fields.length === 1 ? 'question' : 'questions'}
          </span>
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ question: '', answer: '' })}
        >
          <Plus className="mr-1.5 size-3.5" />
          Add question
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="rounded-[8px] border border-dashed border-border px-4 py-8 text-center text-[12px] text-muted-foreground">
          No questions yet. The FAQ section will not appear on the page.
        </p>
      ) : (
        <div className="space-y-3">
          {fields.map((item, i) => (
            <div key={item.id} className="rounded-[8px] border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground">#{i + 1}</span>
                {/* Flechas y no arrastrar: son pocas y en una columna estrecha
                    el arrastre es más incómodo que dos clics. */}
                <div className="flex items-center gap-1">
                  <Button
                    type="button" variant="ghost" size="icon" className="size-7"
                    disabled={i === 0}
                    onClick={() => move(i, i - 1)}
                    aria-label={`Move question ${i + 1} up`}
                  >
                    <ChevronUp className="size-3.5" />
                  </Button>
                  <Button
                    type="button" variant="ghost" size="icon" className="size-7"
                    disabled={i === fields.length - 1}
                    onClick={() => move(i, i + 1)}
                    aria-label={`Move question ${i + 1} down`}
                  >
                    <ChevronDown className="size-3.5" />
                  </Button>
                  <Button
                    type="button" variant="ghost" size="icon"
                    className="size-7 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(i)}
                    aria-label={`Delete question ${i + 1}`}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <FormField
                  name={`faq.${i}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelCls}>Question</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-[13px]" />
                      </FormControl>
                      <FormMessage className="text-[11px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`faq.${i}.answer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelCls}>Answer</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} className="text-[13px]" />
                      </FormControl>
                      <FormMessage className="text-[11px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
