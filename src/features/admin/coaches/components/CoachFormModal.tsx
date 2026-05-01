import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '#/components/ui/dialog'
import { useCreateCoach, useUpdateCoach } from '../hooks/use-coaches'
import { TagInput } from './TagInput'
import type { Coach } from '../services/coaches.service'

const schema = z.object({
  name:      z.string().min(1, 'Required'),
  title:     z.string().min(1, 'Required'),
  email:     z.string().optional(),
  bio:       z.string().optional(),
  image_url: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
  coach?: Coach | null
}

const inputCls = 'w-full border border-black/[0.12] rounded-[6px] px-3 py-2 text-[14px] text-[#171717] placeholder:text-[#a1a1a1] focus:outline-none focus:border-[#0A0A67] focus:ring-1 focus:ring-[#0A0A67]/20 transition-all'
const labelCls = 'block font-bold text-[#171717] text-[11px] tracking-[1.1px] uppercase mb-1.5'
const errorCls = 'text-red-500 text-[12px] mt-1'

export function CoachFormModal({ open, onClose, coach }: Props) {
  const isEdit = !!coach
  const create = useCreateCoach()
  const update = useUpdateCoach()

  const [specialties, setSpecialties]       = useState<string[]>([])
  const [certifications, setCertifications] = useState<string[]>([])

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (open) {
      reset(coach ? {
        name:      coach.name,
        title:     coach.title,
        email:     coach.email ?? '',
        bio:       coach.bio,
        image_url: coach.image_url ?? '',
      } : { name: '', title: '', email: '', bio: '', image_url: '' })

      setSpecialties(coach?.specialties ?? [])
      setCertifications(coach?.certifications ?? [])
    }
  }, [open, coach, reset])

  async function onSubmit(values: FormValues) {
    const payload = {
      name:           values.name,
      title:          values.title,
      email:          values.email || null,
      bio:            values.bio ?? '',
      image_url:      values.image_url || null,
      specialties,
      certifications,
      sort_order:     coach?.sort_order ?? 0,
      active:         coach?.active ?? true,
    }

    try {
      if (isEdit && coach) {
        await update.mutateAsync({ id: coach.id, payload })
        toast.success('Coach updated')
      } else {
        await create.mutateAsync(payload)
        toast.success('Coach created')
      }
      onClose()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Coach' : 'Add Coach'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name *</label>
              <input {...register('name')} className={inputCls} placeholder="Daniela Garmendia" />
              {errors.name && <p className={errorCls}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Title *</label>
              <input {...register('title')} className={inputCls} placeholder="Head Coach" />
              {errors.title && <p className={errorCls}>{errors.title.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Email</label>
            <input {...register('email')} type="email" className={inputCls} placeholder="coach@seattlesynchro.com" />
            {errors.email && <p className={errorCls}>{errors.email.message}</p>}
          </div>

          <div>
            <label className={labelCls}>Image URL</label>
            <input {...register('image_url')} className={inputCls} placeholder="https://..." />
            {errors.image_url && <p className={errorCls}>{errors.image_url.message}</p>}
          </div>

          <div>
            <label className={labelCls}>Bio</label>
            <textarea {...register('bio')} rows={4} className={inputCls} placeholder="Coach biography..." />
          </div>

          <TagInput
            label="Specialties"
            placeholder="e.g. Choreographer"
            tags={specialties}
            onChange={setSpecialties}
          />

          <TagInput
            label="Certifications"
            placeholder="e.g. Level 3 USA Coach"
            tags={certifications}
            onChange={setCertifications}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-[13px] font-bold text-[#737373] hover:text-[#171717] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#0A0A67] text-white px-5 py-2 rounded-[6px] text-[13px] font-bold tracking-[0.6px] uppercase hover:bg-[#0A0A67]/90 transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Coach'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
