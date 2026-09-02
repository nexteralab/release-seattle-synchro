import { ShieldAlert } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription,
} from '#/components/ui/form'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

export function SafetyFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <ShieldAlert size={13} className="text-primary" />
        Safety &amp; contact
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          name="safety.requirementTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Requirement title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Critical Safety Requirement" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="safety.requirement"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Requirement</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} className="text-[13px]" />
              </FormControl>
              <FormDescription className="text-[11px]">
                What a swimmer must be able to do to take part. Keep it concrete —
                parents use this to decide whether to sign up.
              </FormDescription>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-border pt-5 md:grid-cols-2">
        <FormField
          name="safety.contactTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Contact card title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Got Questions?" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="safety.contactLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Button text</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contact Us" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="safety.contactHeading"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Contact heading</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          name="safety.contactBody"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Contact body</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
