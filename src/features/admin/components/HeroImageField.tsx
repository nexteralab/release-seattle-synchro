import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ImageIcon, Trash2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { ImagePickerDialog } from '#/features/admin/components/ImagePickerDialog'
import { formatBytes, maxImageBytes, uploadMedia, type MediaFolder } from '#/lib/media'

const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle =
  'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

interface Props {
  /** Ruta del campo en el form, p. ej. "heroImage" o "hero.image". */
  name: string
  folder: MediaFolder
  title: string
}

/** Hero image de un programa: sube a R2; vacío = la imagen del bundle. */
export function HeroImageField({ name, folder, title }: Props) {
  const form = useFormContext()
  const [pickerOpen, setPickerOpen] = useState(false)
  const image: string = form.watch(name)

  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <ImageIcon size={13} className="text-primary" />
        Hero image
      </h3>

      {image ? (
        <div className="flex items-center gap-3">
          <img src={image} alt="" className="h-20 w-32 rounded-[6px] object-cover" />
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
              Replace
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => form.setValue(name, '', { shouldDirty: true })}
            >
              <Trash2 className="mr-1.5 size-3.5" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
          <ImageIcon className="mr-1.5 size-3.5" />
          Choose image
        </Button>
      )}

      <p className="mt-2 text-[11px] text-muted-foreground">
        Maximum {formatBytes(maxImageBytes(folder))}. The hero image is the largest thing
        visitors download, so a heavy file slows the page down and hurts search ranking. Use
        WebP for best results. Leave it empty to use the built-in image.
      </p>

      <ImagePickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        bucket={folder}
        title={title}
        onSelect={(url) => form.setValue(name, url, { shouldDirty: true })}
        onUpload={(file) => uploadMedia(folder, file)}
      />
    </div>
  )
}
