import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Label } from '#/components/ui/label'
import { SummerCampOverview } from '#/features/programs/summer-camp/components/SummerCampOverview'
import { SummerCampDates } from '#/features/programs/summer-camp/components/SummerCampDates'
import {
  getSummerCampContent,
  saveSummerCampContent,
  DEFAULT_CONTENT,
  type SummerCampContent,
  type CampSession,
} from './summer-camp-admin.service'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const sectionTitle = 'font-bold text-foreground text-[14px] tracking-[-0.2px] mb-4'
const divider = 'border-t border-border pt-6 mt-2'

export function SummerCampAdminPage() {
  const navigate = useNavigate()
  const [content, setContent] = useState<SummerCampContent>(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSummerCampContent()
      .then(setContent)
      .catch(() => toast.error('Failed to load Summer Camp config'))
      .finally(() => setLoading(false))
  }, [])

  // ── Helpers de actualización inmutable ──
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

            {/* Camp Details */}
            <div>
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

            {/* Sessions — Mark Your Calendar */}
            <div className={divider}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={sectionTitle.replace('mb-4', '')}>Mark Your Calendar</h2>
                <Button variant="outline" size="sm" onClick={addSession}>
                  <Plus size={13} /> Add Session
                </Button>
              </div>
              <p className="text-[12px] text-muted-foreground mb-4">
                Fechas y ubicaciones de cada sesión de Summer Camp.
              </p>
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

          </div>
        </div>

        {/* ── Preview ── */}
        <div className="max-w-xl w-full shrink-0 border-l border-border bg-white overflow-y-auto">
          <div className="px-4 pt-5 pb-2 border-b border-border">
            <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">Preview</p>
          </div>

          <div className="overflow-hidden">
            <div style={{ zoom: '0.42' }}>
              <SummerCampOverview
                details={content.details}
                sessions={content.sessions}
              />
              <SummerCampDates
                sessions={content.sessions}
                schedule={content.details.schedule}
                pricePerWeek={content.price_per_week}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
