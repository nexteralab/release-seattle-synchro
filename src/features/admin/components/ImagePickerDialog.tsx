import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, ImageIcon, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '#/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { Button } from '#/components/ui/button'
import { supabase } from '#/utils/supabase'

interface LibraryImage {
  name: string
  url: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
  onUpload: (file: File) => Promise<string>
  bucket: string
  title?: string
  defaultTab?: 'upload' | 'library'
}

export function ImagePickerDialog({
  open,
  onClose,
  onSelect,
  onUpload,
  bucket,
  title = 'Select image',
  defaultTab = 'upload',
}: Props) {
  const [tab, setTab] = useState<'upload' | 'library'>(defaultTab)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<LibraryImage[]>([])
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setTab(defaultTab)
    setSelected(null)
    setDragging(false)
    if (defaultTab === 'library') loadLibrary()
  }, [open])

  async function loadLibrary() {
    setLoadingLibrary(true)
    try {
      const { data, error } = await supabase.storage.from(bucket).list('', {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      if (error) throw error
      const imgs = (data ?? [])
        .filter(f => /\.(png|jpg|jpeg|webp|gif)$/i.test(f.name))
        .map(f => ({
          name: f.name,
          url: supabase.storage.from(bucket).getPublicUrl(f.name).data.publicUrl,
        }))
      setImages(imgs)
    } catch {
      toast.error('Failed to load library')
    } finally {
      setLoadingLibrary(false)
    }
  }

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed')
      return
    }
    setUploading(true)
    try {
      const url = await onUpload(file)
      onSelect(url)
      onClose()
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }, [onUpload, onSelect, onClose])

  function handleTabChange(value: string) {
    setTab(value as 'upload' | 'library')
    if (value === 'library') loadLibrary()
  }

  function handleConfirmLibrary() {
    if (!selected) return
    onSelect(selected)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col px-6 pb-6 pt-4">
          <Tabs value={tab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="w-fit shrink-0 mb-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="library">From library</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="flex-1 mt-0">
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => {
                  e.preventDefault()
                  setDragging(false)
                  const f = e.dataTransfer.files[0]
                  if (f) handleFile(f)
                }}
                onClick={() => !uploading && inputRef.current?.click()}
                className={[
                  'h-52 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors select-none',
                  dragging ? 'border-ring bg-accent' : 'border-border hover:border-ring hover:bg-accent',
                ].join(' ')}
              >
                {uploading
                  ? <Loader2 className="size-8 text-muted-foreground animate-spin" />
                  : <Upload className="size-8 text-muted-foreground" />
                }
                <div className="text-center">
                  <p className="text-[14px] font-medium text-foreground">
                    {uploading ? 'Uploading...' : 'Drop image or click to browse'}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1">PNG, JPG, WEBP — max 5MB</p>
                </div>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) handleFile(f)
                  e.target.value = ''
                }}
              />
            </TabsContent>

            <TabsContent value="library" className="flex-1 mt-0 flex flex-col overflow-hidden">
              {loadingLibrary ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="size-6 text-muted-foreground animate-spin" />
                </div>
              ) : images.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-2">
                  <ImageIcon className="size-8 opacity-40" />
                  <p className="text-[13px]">No images in library yet</p>
                  <p className="text-[12px] opacity-60">Upload some images using the Upload tab</p>
                </div>
              ) : (
                <div className="flex flex-col flex-1 overflow-hidden gap-4">
                  <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-2 content-start">
                    {images.map(img => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => setSelected(prev => prev === img.url ? null : img.url)}
                        className={[
                          'relative aspect-square rounded-md overflow-hidden border-2 transition-all focus-visible:outline-ring',
                          selected === img.url
                            ? 'border-ring'
                            : 'border-transparent hover:border-border',
                        ].join(' ')}
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {selected === img.url && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary rounded-full p-0.5">
                              <Check className="size-3 text-primary-foreground" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end shrink-0">
                    <Button size="sm" onClick={handleConfirmLibrary} disabled={!selected}>
                      Use selected image
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
