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
import { SummerCampRequirements } from '#/features/programs/summer-camp/components/SummerCampRequirements'
import {
  getSummerCampConfig,
  saveSummerCampConfig,
  DEFAULT_CONFIG,
  type SummerCampConfig,
  type CampLocation,
  type CampRequirement,
} from './summer-camp-admin.service'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const sectionTitle = 'font-bold text-foreground text-[14px] tracking-[-0.2px] mb-4'
const divider = 'border-t border-border pt-6 mt-2'

export function SummerCampAdminPage() {
  const navigate = useNavigate()
  const [config, setConfig] = useState<SummerCampConfig>(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSummerCampConfig()
      .then(setConfig)
      .finally(() => setLoading(false))
  }, [])

  function set<K extends keyof SummerCampConfig>(key: K, value: SummerCampConfig[K]) {
    setConfig(c => ({ ...c, [key]: value }))
  }

  function addLocation() {
    setConfig(c => ({ ...c, locations: [...c.locations, { name: '', dates: '', address: '' }] }))
  }
  function updateLocation(i: number, field: keyof CampLocation, value: string) {
    setConfig(c => {
      const locs = [...c.locations]
      locs[i] = { ...locs[i], [field]: value }
      return { ...c, locations: locs }
    })
  }
  function removeLocation(i: number) {
    setConfig(c => ({ ...c, locations: c.locations.filter((_, idx) => idx !== i) }))
  }

  function addRequirement() {
    setConfig(c => ({ ...c, requirements: [...c.requirements, { name: '', note: '', link: '' }] }))
  }
  function updateRequirement(i: number, field: keyof CampRequirement, value: string) {
    setConfig(c => {
      const reqs = [...c.requirements]
      reqs[i] = { ...reqs[i], [field]: value }
      return { ...c, requirements: reqs }
    })
  }
  function removeRequirement(i: number) {
    setConfig(c => ({ ...c, requirements: c.requirements.filter((_, idx) => idx !== i) }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveSummerCampConfig(config)
      toast.success('Summer Camp saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  // Build preview data matching public component types
  const previewDetails = {
    ages:       config.ages,
    skillLevel: config.skill_level,
    schedule:   config.schedule,
    locations:  config.locations,
    pricing:    { perWeek: config.price_per_week },
  }
  const previewRequirements = config.requirements.map(r => ({
    name: r.name,
    note: r.note || undefined,
    link: r.link || undefined,
  }))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-[13px]">
        Loading…
      </div>
    )
  }

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
          <div className="max-w-2xl px-8 py-8 space-y-8">

            {/* Year */}
            <div className="space-y-1.5 w-28">
              <Label className={labelCls}>Year</Label>
              <Input type="number" value={config.year} onChange={e => set('year', Number(e.target.value))} />
            </div>

            {/* Overview */}
            <div className={divider}>
              <h2 className={sectionTitle}>Overview Text</h2>
              <p className="text-[12px] text-muted-foreground mb-3">
                Free text — double enter between paragraphs. What you write is what gets displayed.
              </p>
              <Textarea
                rows={10}
                value={config.overview_text}
                onChange={e => set('overview_text', e.target.value)}
                placeholder={'Paragraph one...\n\nParagraph two...\n\nParagraph three...'}
                className="font-mono text-[13px] leading-relaxed resize-y"
              />
            </div>

            {/* Camp Details */}
            <div className={divider}>
              <h2 className={sectionTitle}>Camp Details</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className={labelCls}>Ages</Label>
                  <Input value={config.ages} onChange={e => set('ages', e.target.value)} placeholder="6–11 years old" />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>Skill Level Requirement</Label>
                  <Textarea rows={2} value={config.skill_level} onChange={e => set('skill_level', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>Daily Schedule</Label>
                  <Input value={config.schedule} onChange={e => set('schedule', e.target.value)} placeholder="9:00 AM – 11:00 AM" />
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className={divider}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={sectionTitle.replace('mb-4', '')}>Sessions / Locations</h2>
                <Button variant="outline" size="sm" onClick={addLocation}>
                  <Plus size={13} /> Add Session
                </Button>
              </div>
              <div className="space-y-4">
                {config.locations.map((loc, i) => (
                  <div key={i} className="border border-border rounded-[8px] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[1px] uppercase text-muted-foreground">Session {i + 1}</span>
                      <button type="button" onClick={() => removeLocation(i)} className="text-destructive hover:opacity-70">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className={labelCls}>Name</Label>
                        <Input value={loc.name} onChange={e => updateLocation(i, 'name', e.target.value)} placeholder="July in Bellevue…" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className={labelCls}>Dates</Label>
                        <Input value={loc.dates} onChange={e => updateLocation(i, 'dates', e.target.value)} placeholder="July 27 – 31, 2026" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className={labelCls}>Address</Label>
                      <Textarea rows={2} value={loc.address} onChange={e => updateLocation(i, 'address', e.target.value)} placeholder={'Club name\nAddress'} />
                    </div>
                  </div>
                ))}
                {config.locations.length === 0 && (
                  <p className="text-[13px] text-muted-foreground">No sessions yet.</p>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className={divider}>
              <h2 className={sectionTitle}>Pricing & Registration</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className={labelCls}>Price per Week</Label>
                  <Input value={config.price_per_week} onChange={e => set('price_per_week', e.target.value)} placeholder="$450 per week" />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>Registration URL</Label>
                  <Input value={config.register_url} onChange={e => set('register_url', e.target.value)} placeholder="https://…" />
                </div>
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
                {config.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 border border-border rounded-[8px] p-3">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <div className="space-y-1">
                        <Label className={labelCls}>Item *</Label>
                        <Input value={req.name} onChange={e => updateRequirement(i, 'name', e.target.value)} placeholder="Swim Cap" />
                      </div>
                      <div className="space-y-1">
                        <Label className={labelCls}>Note</Label>
                        <Input value={req.note} onChange={e => updateRequirement(i, 'note', e.target.value)} placeholder="Optional…" />
                      </div>
                      <div className="space-y-1">
                        <Label className={labelCls}>Link</Label>
                        <Input value={req.link} onChange={e => updateRequirement(i, 'link', e.target.value)} placeholder="https://…" />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeRequirement(i)} className="text-destructive hover:opacity-70 mt-6 shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {config.requirements.length === 0 && (
                  <p className="text-[13px] text-muted-foreground">No items yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── Preview ── */}
        <div className="w-[480px] shrink-0 border-l border-border bg-white overflow-y-auto">
          <div className="px-4 pt-5 pb-2 border-b border-border">
            <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">Preview</p>
          </div>

          {/* Scale the actual public components to fit the panel */}
          <div className="overflow-hidden">
            <div style={{ zoom: '0.42' }}>
              
              <SummerCampOverview details={previewDetails} />
              <SummerCampDates
                locations={config.locations}
                schedule={config.schedule}
                price={config.price_per_week}
              />
              <SummerCampRequirements requirements={previewRequirements} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
