import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { UserCircle2 } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '#/components/ui/dialog'
import { useCreateCoach, useUpdateCoach } from '../hooks/use-coaches'
import { TagInput } from './TagInput'
import { CoachImageUpload } from './CoachImageUpload'
import type { Coach } from '../services/coaches.service'

const schema = z.object({
  name:  z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  email: z.string().optional(),
  bio:   z.string().optional(),
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
  const [imageUrl, setImageUrl]             = useState<string | null>(null)

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const watched = watch()

  useEffect(() => {
    if (open) {
      reset(coach ? {
        name:  coach.name,
        title: coach.title,
        email: coach.email ?? '',
        bio:   coach.bio,
      } : { name: '', title: '', email: '', bio: '' })

      setImageUrl(coach?.image_url ?? null)
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
      image_url:      imageUrl,
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex h-full max-h-[90vh]">

          {/* Formulario */}
          <div className="flex-1 flex flex-col min-w-0">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-black/[0.06]">
              <DialogTitle>{isEdit ? 'Edit Coach' : 'Add Coach'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
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
                  <label className={labelCls}>Photo</label>
                  <CoachImageUpload value={imageUrl} onChange={setImageUrl} />
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
              </div>

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-black/[0.06]">
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
          </div>

          {/* Preview */}
          <div className="w-72 shrink-0 border-l border-black/[0.06] bg-[#f5f5f5] flex flex-col overflow-hidden">
            <div className="px-4 pt-6 pb-3 border-b border-black/[0.06]">
              <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-[#a1a1a1]">Preview</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white shadow-sm overflow-hidden">
                {/* Foto */}
                <div className="w-full aspect-[3/4] bg-[#ececf0] flex items-center justify-center overflow-hidden">
                  {imageUrl
                    ? <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                    : <UserCircle2 className="size-16 text-[#d4d4d4]" />
                  }
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-[#0A0A67] text-[15px] tracking-[-0.5px] uppercase leading-tight">
                      {watched.name || <span className="text-[#d4d4d4]">Coach Name</span>}
                    </h3>
                    <p className="text-[#737373] text-[12px] mt-0.5">
                      {watched.title || <span className="text-[#d4d4d4]">Title</span>}
                    </p>
                    {watched.email && (
                      <p className="text-[#0A0A67] text-[11px] mt-0.5 truncate">{watched.email}</p>
                    )}
                  </div>

                  {watched.bio && (
                    <p className="text-[#171717] text-[11px] leading-[17px] line-clamp-4">
                      {watched.bio}
                    </p>
                  )}

                  {specialties.length > 0 && (
                    <div>
                      <p className="text-[9px] font-bold tracking-[1.2px] uppercase text-[#171717] mb-1.5">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {specialties.map((s, i) => (
                          <span key={i} className="bg-[#f5f5f5] px-2 py-0.5 text-[10px] font-medium text-[#171717]">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {certifications.length > 0 && (
                    <div>
                      <p className="text-[9px] font-bold tracking-[1.2px] uppercase text-[#171717] mb-1.5">Certifications</p>
                      <ul className="space-y-1">
                        {certifications.map((c, i) => (
                          <li key={i} className="text-[#737373] text-[10px] leading-[15px] flex items-start gap-1">
                            <span className="text-[#171717] shrink-0">•</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
