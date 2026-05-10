import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Plus, Trash2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Label } from '#/components/ui/label'
import { SummerCampHero } from '#/features/programs/summer-camp/components/SummerCampHero'
import { SummerCampOverview } from '#/features/programs/summer-camp/components/SummerCampOverview'
import { SummerCampDates } from '#/features/programs/summer-camp/components/SummerCampDates'
import { SummerCampRequirements } from '#/features/programs/summer-camp/components/SummerCampRequirements'
import {
  getSummerCampContent,
  saveSummerCampContent,
  uploadSummerCampHeroImage,
  DEFAULT_CONTENT,
  type SummerCampContent,
  type CampSession,
  type CampRequirement,
} from './summer-camp-admin.service'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const sectionTitle = 'font-bold text-foreground text-[14px] tracking-[-0.2px] mb-4'
const divider = 'border-t border-border pt-6 mt-2'

export function SummerCampAdminPage() {
  const navigate = useNavigate()
  const [content, setContent] = useState<SummerCampContent>(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroUploading, setHeroUploading] = useState(false)
  const heroInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getSummerCampContent()
      .then(setContent)
      .catch(() => toast.error('Failed to load Summer Camp config'))
      .finally(() => setLoading(false))
  }, [])

  // ── Helpers de actualización inmutable ──
  function setHeroImageUrl(value: string) {
    setContent(c => ({ ...c, hero_image_url: value }))
  }
  async function handleHeroFile(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files allowed')
      return
    }
    setHeroUploading(true)
    try {
      const url = await uploadSummerCampHeroImage(file)
      setHeroImageUrl(url)
    } catch {
      toast.error('Failed to upload hero image')
    } finally {
      setHeroUploading(false)
    }
  }

  function setOverviewBody(value: string) {
    setContent(c => ({ ...c, overview_body: value }))
  }
  function setDetail<K extends keyof SummerCampContent['details']>(
    key: K,
    value: SummerCampContent['details'][K],
  ) {
    setContent(c => ({ ...c, details: { ...c.details, [key]: value } }))
  }
  function setPrice(value: string) {
    setContent(c => ({ ...c, price_per_week: value }))
  }

  // Sessions
  function addSession() {
    setContent(c => ({
      ...c,
      sessions: [...c.sessions, { name: '', dates: '', address: '', register_url: '' }],
    }))
  }
  function updateSession(i: number, field: keyof CampSession, value: string) {
    setContent(c => {
      const sessions = [...c.sessions]
      sessions[i] = { ...sessions[i], [field]: value }
      return { ...c, sessions }
    })
  }
  function removeSession(i: number) {
    setContent(c => ({ ...c, sessions: c.sessions.filter((_, idx) => idx !== i) }))
  }

  // Requirements
  function addRequirement() {
    setContent(c => ({
      ...c,
      requirements: [...c.requirements, { name: '', note: '', link: '' }],
    }))
  }
  function updateRequirement(i: number, field: keyof CampRequirement, value: string) {
    setContent(c => {
      const requirements = [...c.requirements]
      requirements[i] = { ...requirements[i], [field]: value }
      return { ...c, requirements }
    })
  }
  function removeRequirement(i: number) {
    setContent(c => ({
      ...c,
      requirements: c.requirements.filter((_, idx) => idx !== i),
    }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveSummerCampContent(content)
      toast.success('Summer Camp saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

  // Preview: mismos componentes públicos con la nueva forma
  const previewRequirements = content.requirements.map(r => ({
    name: r.name,
    note: r.note || undefined,
    link: r.link || undefined,
  }))

  return (
    <div className="peer-[.header-fixed]/header:mt-16 flex flex-col flex-1 min-h-0">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/app/programs' })}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <p className="text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground">Programs</p>
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Summer Camp</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0">

        {/* Form */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="w-full px-8 py-8 space-y-8">

            {/* Hero Image */}
            <div>
              <h2 className={sectionTitle}>Hero Image</h2>
              <p className="text-[12px] text-muted-foreground mb-3">
                Imagen grande del encabezado de la página. Recomendado 1920×1080 (.webp / .jpg).
              </p>

              {content.hero_image_url ? (
                <div className="relative group rounded-[8px] overflow-hidden border border-border">
                  <img
                    src={content.hero_image_url}
                    alt="Hero preview"
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => heroInputRef.current?.click()}
                      disabled={heroUploading}
                      className="bg-background/90 rounded-md p-1.5 hover:bg-background"
                      title="Replace"
                    >
                      <Upload size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroImageUrl('')}
                      className="bg-background/90 rounded-md p-1.5 hover:bg-background"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => heroInputRef.current?.click()}
                  disabled={heroUploading}
                  className="w-full aspect-[16/9] flex flex-col items-center justify-center gap-2 border border-dashed border-border rounded-[8px] text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  <Upload size={18} />
                  <span className="text-[13px]">
                    {heroUploading ? 'Uploading…' : 'Add hero image'}
                  </span>
                </button>
              )}

              <input
                ref={heroInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) handleHeroFile(f)
                  e.target.value = ''
                }}
              />

              <div className="mt-3 space-y-1.5">
                <Label className={labelCls}>Or paste a URL</Label>
                <Input
                  value={content.hero_image_url}
                  onChange={e => setHeroImageUrl(e.target.value)}
                  placeholder="https://…"
                />
              </div>
            </div>

            {/* Overview body */}
            <div className={divider}>
              <h2 className={sectionTitle}>Overview Text</h2>
              <p className="text-[12px] text-muted-foreground mb-3">
                Texto libre — doble enter entre párrafos.
              </p>
              <Textarea
                rows={10}
                value={content.overview_body}
                onChange={e => setOverviewBody(e.target.value)}
                placeholder={'Paragraph one…\n\nParagraph two…\n\nParagraph three…'}
                className="font-mono text-[13px] leading-relaxed resize-y"
              />
            </div>

            {/* Camp Details */}
            <div className={divider}>
              <h2 className={sectionTitle}>Camp Details</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className={labelCls}>Ages</Label>
                  <Input
                    value={content.details.ages}
                    onChange={e => setDetail('ages', e.target.value)}
                    placeholder="6–11 years old"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>Skill Level Requirement</Label>
                  <Textarea
                    rows={2}
                    value={content.details.skill_level}
                    onChange={e => setDetail('skill_level', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>Daily Schedule</Label>
                  <Input
                    value={content.details.schedule}
                    onChange={e => setDetail('schedule', e.target.value)}
                    placeholder="9:00 AM – 11:00 AM"
                  />
                </div>
              </div>
            </div>

            {/* Sessions */}
            <div className={divider}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={sectionTitle.replace('mb-4', '')}>Sessions</h2>
                <Button variant="outline" size="sm" onClick={addSession}>
                  <Plus size={13} /> Add Session
                </Button>
              </div>
              <div className="space-y-4">
                {content.sessions.map((s, i) => (
                  <div key={i} className="border border-border rounded-[8px] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[1px] uppercase text-muted-foreground">
                        Session {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSession(i)}
                        className="text-destructive hover:opacity-70"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className={labelCls}>Name</Label>
                        <Input
                          value={s.name}
                          onChange={e => updateSession(i, 'name', e.target.value)}
                          placeholder="July in Bellevue…"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className={labelCls}>Dates</Label>
                        <Input
                          value={s.dates}
                          onChange={e => updateSession(i, 'dates', e.target.value)}
                          placeholder="July 27 – 31, 2026"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className={labelCls}>Address</Label>
                      <Textarea
                        rows={2}
                        value={s.address}
                        onChange={e => updateSession(i, 'address', e.target.value)}
                        placeholder={'Club name\nAddress'}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className={labelCls}>Register URL</Label>
                      <Input
                        value={s.register_url}
                        onChange={e => updateSession(i, 'register_url', e.target.value)}
                        placeholder="https://…"
                      />
                    </div>
                  </div>
                ))}
                {content.sessions.length === 0 && (
                  <p className="text-[13px] text-muted-foreground">No sessions yet.</p>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className={divider}>
              <h2 className={sectionTitle}>Pricing</h2>
              <div className="space-y-1.5">
                <Label className={labelCls}>Price per Week</Label>
                <Input
                  value={content.price_per_week}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="$330 per week"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className={divider}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={sectionTitle.replace('mb-4', '')}>What to Bring</h2>
                <Button variant="outline" size="sm" onClick={addRequirement}>
                  <Plus size={13} /> Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {content.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 border border-border rounded-[8px] p-3">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <div className="space-y-1">
                        <Label className={labelCls}>Item *</Label>
                        <Input
                          value={req.name}
                          onChange={e => updateRequirement(i, 'name', e.target.value)}
                          placeholder="Swim Cap"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className={labelCls}>Note</Label>
                        <Input
                          value={req.note ?? ''}
                          onChange={e => updateRequirement(i, 'note', e.target.value)}
                          placeholder="Optional…"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className={labelCls}>Link</Label>
                        <Input
                          value={req.link ?? ''}
                          onChange={e => updateRequirement(i, 'link', e.target.value)}
                          placeholder="https://…"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRequirement(i)}
                      className="text-destructive hover:opacity-70 mt-6 shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {content.requirements.length === 0 && (
                  <p className="text-[13px] text-muted-foreground">No items yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── Preview ── */}
        <div className="max-w-xl w-full shrink-0 border-l border-border bg-white overflow-y-auto">
          <div className="px-4 pt-5 pb-2 border-b border-border">
            <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">Preview</p>
          </div>

          <div className="overflow-hidden">
            <div style={{ zoom: '0.42' }}>
              <SummerCampHero imageUrl={content.hero_image_url} />
              <SummerCampOverview
                body={content.overview_body}
                details={content.details}
                sessions={content.sessions}
              />
              <SummerCampDates
                sessions={content.sessions}
                schedule={content.details.schedule}
                pricePerWeek={content.price_per_week}
              />
              <SummerCampRequirements requirements={previewRequirements} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
