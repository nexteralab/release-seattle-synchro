import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowLeft, UserCircle2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Label } from '#/components/ui/label'
import { useCreateCoach, useUpdateCoach } from './hooks/use-coaches'
import { TagInput } from './components/TagInput'
import { CoachImageUpload } from './components/CoachImageUpload'
import type { Coach } from './services/coaches.service'

const schema = z.object({
  name:  z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  email: z.string().optional(),
  bio:   z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  coach?: Coach | null
}

export function CoachFormPage({ coach }: Props) {
  const isEdit = !!coach
  const navigate = useNavigate()
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
    reset(coach ? {
      name:  coach.name,
      title: coach.title,
      email: coach.email ?? '',
      bio:   coach.bio,
    } : { name: '', title: '', email: '', bio: '' })

    setImageUrl(coach?.image_url ?? null)
    setSpecialties(coach?.specialties ?? [])
    setCertifications(coach?.certifications ?? [])
  }, [coach, reset])

  function goBack() { navigate({ to: '/app/coaches' }) }

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
      goBack()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <p className="text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground">Coaches</p>
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">
              {isEdit ? `Edit — ${coach.name}` : 'Add Coach'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={goBack}>Cancel</Button>
          <Button form="coach-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Coach'}
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* Form */}
        <div className="flex-1 overflow-y-auto">
          <form id="coach-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full px-6 md:px-8 py-8 space-y-5">

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] tracking-[1.1px] uppercase">Name *</Label>
                  <Input {...register('name')} placeholder="Daniela Garmendia" aria-invalid={!!errors.name} />
                  {errors.name && <p className="text-destructive text-[12px]">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] tracking-[1.1px] uppercase">Title *</Label>
                  <Input {...register('title')} placeholder="Head Coach" aria-invalid={!!errors.title} />
                  {errors.title && <p className="text-destructive text-[12px]">{errors.title.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] tracking-[1.1px] uppercase">Email</Label>
                <Input {...register('email')} type="email" placeholder="coach@seattlesynchro.com" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] tracking-[1.1px] uppercase">Photo</Label>
                <CoachImageUpload value={imageUrl} onChange={setImageUrl} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] tracking-[1.1px] uppercase">Bio</Label>
                <Textarea {...register('bio')} rows={6} placeholder="Coach biography..." />
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
          </form>
        </div>

        {/* Preview — abajo en mobile/tablet, lateral sticky en xl+ */}
        <div className="w-full md:w-[360px] shrink-0 border-t md:border-t-0 md:border-l border-border bg-muted md:sticky md:top-[65px] md:self-start md:overflow-y-auto md:max-h-[calc(100vh-65px)]">
          <div className="px-5 pt-5 pb-2">
            <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">Preview</p>
          </div>

          <div className="px-5 pb-8">
            <div className="bg-card border border-border overflow-hidden shadow-sm">

              {/* Photo */}
              <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
                {imageUrl
                  ? <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                  : <UserCircle2 className="size-20 text-muted-foreground/30" />
                }
              </div>

              {/* Info */}
              <div className="p-5 space-y-4">
                <div>
                  <h2 className="font-bold text-[20px] tracking-[-1px] uppercase leading-tight text-foreground">
                    {watched.name || <span className="text-muted-foreground/40 font-normal normal-case tracking-normal text-[14px]">Coach name will appear here</span>}
                  </h2>
                  <p className="text-muted-foreground text-[14px] tracking-[-0.3px] mt-0.5">
                    {watched.title || <span className="text-muted-foreground/30 text-[13px]">Title</span>}
                  </p>
                  {watched.email && (
                    <p className="text-primary text-[13px] mt-0.5 truncate">{watched.email}</p>
                  )}
                </div>

                {watched.bio && (
                  <p className="text-foreground text-[13px] leading-[20px] line-clamp-5">{watched.bio}</p>
                )}

                {specialties.length > 0 && (
                  <div>
                    <h3 className="font-bold text-foreground text-[10px] tracking-[1.4px] uppercase mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {specialties.map((s, i) => (
                        <span key={i} className="bg-muted border border-border px-3 py-1 text-[11px] font-medium text-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {certifications.length > 0 && (
                  <div>
                    <h3 className="font-bold text-foreground text-[10px] tracking-[1.4px] uppercase mb-2">Certifications</h3>
                    <ul className="space-y-1">
                      {certifications.map((c, i) => (
                        <li key={i} className="text-muted-foreground text-[12px] leading-[18px] flex items-start gap-1.5">
                          <span className="text-foreground shrink-0 mt-px">•</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!watched.name && !watched.bio && !specialties.length && !certifications.length && (
                  <p className="text-[12px] text-muted-foreground/50 text-center py-4">
                    Fill in the form to see a preview
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
