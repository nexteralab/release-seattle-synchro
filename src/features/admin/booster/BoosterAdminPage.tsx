import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ExternalLink, FileUp, Plus, Trash2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { uploadMedia } from '#/lib/media'
import {
  BOOSTER_CATEGORIES,
  getBoosterDocs,
  saveBoosterDocs,
  type BoosterCategory,
  type BoosterDoc,
  type BoosterDocs,
} from '#/features/booster/booster.service'

export function BoosterAdminPage() {
  const [docs, setDocs] = useState<BoosterDocs>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    getBoosterDocs()
      .then(setDocs)
      .catch(() => toast.error('Failed to load booster documents'))
      .finally(() => setLoading(false))
  }, [])

  const update = (cat: BoosterCategory, list: BoosterDoc[]) => setDocs((d) => ({ ...d, [cat]: list }))

  async function upload(cat: BoosterCategory, i: number, file: File) {
    setUploading(`${cat}-${i}`)
    try {
      const url = await uploadMedia('booster', file)
      const list = [...(docs[cat] ?? [])]
      list[i] = { title: list[i].title || file.name.replace(/\.pdf$/i, ''), url }
      update(cat, list)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(null)
    }
  }

  async function save() {
    // Solo se publican filas completas (título + archivo/link)
    const clean = Object.fromEntries(
      Object.entries(docs).map(([k, list]) => [k, list.filter((d) => d.title.trim() && d.url.trim())]),
    ) as BoosterDocs
    setSaving(true)
    try {
      await saveBoosterDocs(clean)
      setDocs(clean)
      toast.success('Booster documents saved')
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
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-foreground text-[20px] tracking-[-0.5px]">Booster Documents</h1>
          <p className="text-[13px] text-muted-foreground">
            Public documents of the Booster Club (501c3). They appear on{' '}
            <a href="/booster/donate" target="_blank" rel="noreferrer" className="underline">
              /booster/donate
            </a>
            . Upload a PDF (max 10 MB) or paste a link.
          </p>
        </div>
        <Button onClick={save} disabled={saving || !!uploading}>
          {saving ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>

      {BOOSTER_CATEGORIES.map(({ key, label }) => {
        const list = docs[key] ?? []
        return (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {list.length === 0 && (
                <p className="text-[13px] text-muted-foreground">No documents yet.</p>
              )}
              {list.map((doc, i) => (
                <div key={i} className="flex flex-col gap-2 md:flex-row md:items-center">
                  <Input
                    placeholder="Title (e.g. Bylaws 2026)"
                    value={doc.title}
                    onChange={(e) => update(key, list.map((d, j) => (j === i ? { ...d, title: e.target.value } : d)))}
                    className="md:w-72"
                  />
                  <Input
                    placeholder="https://… or upload a PDF"
                    value={doc.url}
                    onChange={(e) => update(key, list.map((d, j) => (j === i ? { ...d, url: e.target.value } : d)))}
                    className="flex-1"
                  />
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" asChild disabled={!!uploading}>
                      <label className="cursor-pointer">
                        <FileUp className="mr-1.5 size-3.5" />
                        {uploading === `${key}-${i}` ? 'Uploading…' : 'PDF'}
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) upload(key, i, file)
                            e.target.value = ''
                          }}
                        />
                      </label>
                    </Button>
                    {doc.url && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={doc.url} target="_blank" rel="noreferrer" aria-label="Open document">
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    )}
                    {/* ponytail: el PDF queda en R2 al quitarlo; limpiar huérfanos si el bucket crece */}
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Remove document"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => update(key, list.filter((_, j) => j !== i))}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update(key, [...list, { title: '', url: '' }])}>
                <Plus className="mr-1.5 size-3.5" />
                Add document
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
