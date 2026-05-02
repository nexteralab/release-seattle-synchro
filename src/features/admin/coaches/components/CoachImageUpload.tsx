import { useRef, useState, useCallback } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { uploadCoachImage } from '../services/coaches.service'
import { ImagePickerDialog } from '../../components/ImagePickerDialog'

interface Props {
  value: string | null
  onChange: (url: string | null) => void
}

export function CoachImageUpload({ value, onChange }: Props) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed')
      return
    }
    setUploading(true)
    try {
      const url = await uploadCoachImage(file)
      onChange(url)
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  return (
    <>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative size-20 rounded-full overflow-hidden border-2 border-border shrink-0 group">
            <img src={value} alt="Coach photo" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="text-white size-4" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploading && inputRef.current?.click()}
            className={[
              'size-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors shrink-0',
              dragging ? 'border-ring bg-accent' : 'border-border hover:border-ring hover:bg-accent',
            ].join(' ')}
          >
            {uploading
              ? <div className="size-5 border-2 border-ring border-t-transparent rounded-full animate-spin" />
              : <ImageIcon className="size-5 text-muted-foreground" />
            }
          </div>
        )}

        <div className="flex-1">
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={[
              'w-full border-2 border-dashed rounded-md px-4 py-3 flex items-center gap-3 transition-colors',
              dragging ? 'border-ring bg-accent' : 'border-border hover:border-ring hover:bg-accent',
            ].join(' ')}
          >
            <Upload className="size-4 text-muted-foreground shrink-0" />
            <span className="text-[13px] text-muted-foreground">
              {uploading ? 'Uploading...' : 'Drop image here or click to browse'}
            </span>
          </button>
          <div className="flex items-center gap-2 mt-1 ml-1">
            <p className="text-[11px] text-muted-foreground">PNG, JPG, WEBP — max 5MB</p>
            <span className="text-[11px] text-muted-foreground">·</span>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="text-[11px] text-primary hover:underline"
            >
              Choose from library
            </button>
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      <ImagePickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={onChange}
        onUpload={uploadCoachImage}
        bucket="coaches"
        title="Select coach photo"
        defaultTab="library"
      />
    </>
  )
}
