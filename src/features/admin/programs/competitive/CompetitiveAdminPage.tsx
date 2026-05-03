import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Label } from '#/components/ui/label'
import {
  getCompetitiveConfig,
  saveCompetitiveConfig,
  DEFAULT_CONFIG,
  type CompetitiveConfig,
  type AgeGroup,
} from './competitive-admin.service'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const sectionCls = 'border-t border-border pt-6 mt-2'
const sectionTitle = 'font-bold text-foreground text-[14px] tracking-[-0.2px] mb-4'
const groupTitle = 'font-bold text-foreground text-[13px] tracking-[-0.1px] mb-3 flex items-center gap-2'

export function CompetitiveAdminPage() {
  const navigate = useNavigate()
  const [config, setConfig] = useState<CompetitiveConfig>(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCompetitiveConfig()
      .then(setConfig)
      .finally(() => setLoading(false))
  }, [])

  // ── Overview helpers ──────────────────────────────────────

  function setOverviewParagraph(index: number, value: string) {
    setConfig(c => {
      const next = [...c.overview]
      next[index] = value
      return { ...c, overview: next }
    })
  }

  function addOverviewParagraph() {
    setConfig(c => ({ ...c, overview: [...c.overview, ''] }))
  }

  function removeOverviewParagraph(index: number) {
    setConfig(c => ({ ...c, overview: c.overview.filter((_, i) => i !== index) }))
  }

  // ── Age group helpers ─────────────────────────────────────

  function setGroupField<K extends keyof AgeGroup>(groupId: string, key: K, value: AgeGroup[K]) {
    setConfig(c => ({
      ...c,
      age_groups: c.age_groups.map(g => g.id === groupId ? { ...g, [key]: value } : g),
    }))
  }

  function setHighlight(groupId: string, index: number, value: string) {
    setConfig(c => ({
      ...c,
      age_groups: c.age_groups.map(g => {
        if (g.id !== groupId) return g
        const next = [...(g.highlights ?? [])]
        next[index] = value
        return { ...g, highlights: next }
      }),
    }))
  }

  function addHighlight(groupId: string) {
    setConfig(c => ({
      ...c,
      age_groups: c.age_groups.map(g =>
        g.id === groupId ? { ...g, highlights: [...(g.highlights ?? []), ''] } : g
      ),
    }))
  }

  function removeHighlight(groupId: string, index: number) {
    setConfig(c => ({
      ...c,
      age_groups: c.age_groups.map(g =>
        g.id !== groupId ? g : { ...g, highlights: (g.highlights ?? []).filter((_, i) => i !== index) }
      ),
    }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveCompetitiveConfig(config)
      toast.success('Competitive program saved')
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

  return (
    <div className="peer-[.header-fixed]/header:mt-16 flex flex-col flex-1 min-h-0">

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-background shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/app/programs' })}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <p className="text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground">Programs</p>
            <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px] leading-tight">Competitive</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/app/programs' })}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-2xl px-8 py-8 space-y-8">

          {/* Overview paragraphs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={sectionTitle}>Overview</h2>
              <Button variant="outline" size="sm" onClick={addOverviewParagraph}>
                <Plus size={13} /> Add Paragraph
              </Button>
            </div>
            <div className="space-y-3">
              {config.overview.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Textarea
                    rows={4}
                    value={p}
                    onChange={e => setOverviewParagraph(i, e.target.value)}
                    placeholder={`Paragraph ${i + 1}…`}
                    className="flex-1 text-[13px] leading-relaxed resize-y"
                  />
                  {config.overview.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOverviewParagraph(i)}
                      className="mt-2 text-destructive hover:opacity-70 shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Commitment note */}
          <div className={sectionCls}>
            <h2 className={sectionTitle}>Commitment Note</h2>
            <div className="space-y-1.5">
              <Label className={labelCls}>Note</Label>
              <Input
                value={config.commitment_note}
                onChange={e => setConfig(c => ({ ...c, commitment_note: e.target.value }))}
                placeholder="All Age Group programs are year-round commitments"
              />
            </div>
          </div>

          {/* Age groups */}
          {config.age_groups.map(group => (
            <div key={group.id} className={sectionCls}>
              <h2 className={groupTitle}>
                <span className="size-5 rounded-sm bg-[#0A0A67]/8 flex items-center justify-center">
                  <GripVertical size={11} className="text-[#0A0A67]" />
                </span>
                {group.name}
              </h2>

              <div className="space-y-4">

                {/* Description — only show if group already has one */}
                {(group.description !== undefined) && (
                  <div className="space-y-1.5">
                    <Label className={labelCls}>Description</Label>
                    <Textarea
                      rows={4}
                      value={group.description ?? ''}
                      onChange={e => setGroupField(group.id, 'description', e.target.value)}
                      className="text-[13px] leading-relaxed resize-y"
                      placeholder="Program description…"
                    />
                  </div>
                )}

                {/* Coaches */}
                <div className="space-y-1.5">
                  <Label className={labelCls}>Coaches</Label>
                  <Textarea
                    rows={Math.max(2, (group.coaches.match(/\n/g)?.length ?? 0) + 1)}
                    value={group.coaches}
                    onChange={e => setGroupField(group.id, 'coaches', e.target.value)}
                    className="text-[13px] leading-relaxed resize-y font-mono"
                    placeholder={'Name 1\nName 2\nA Team: Name 3'}
                  />
                  <p className="text-[11px] text-muted-foreground">One name per line. Use "A Team: …" format for sub-teams.</p>
                </div>

                {/* Workout days */}
                <div className="space-y-1.5">
                  <Label className={labelCls}>Workout Days</Label>
                  <Input
                    value={group.workout_days}
                    onChange={e => setGroupField(group.id, 'workout_days', e.target.value)}
                    placeholder="Monday, Wednesday & Saturday morning"
                    className="text-[13px]"
                  />
                </div>

                {/* Highlights — only for groups that have them */}
                {group.highlights !== undefined && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className={labelCls}>Program Highlights</Label>
                      <Button variant="outline" size="sm" onClick={() => addHighlight(group.id)}>
                        <Plus size={12} /> Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(group.highlights ?? []).map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={h}
                            onChange={e => setHighlight(group.id, i, e.target.value)}
                            placeholder="Highlight…"
                            className="text-[13px]"
                          />
                          <button
                            type="button"
                            onClick={() => removeHighlight(group.id, i)}
                            className="text-destructive hover:opacity-70 shrink-0"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
