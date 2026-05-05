import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowLeft, Globe, FileText, X, Upload, Settings2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { Label } from '#/components/ui/label'
import { Switch } from '#/components/ui/switch'
import { Badge } from '#/components/ui/badge'
import { Editor, type ImagePickerResult } from '#/components/ui/editor'
import { useCreatePost, useUpdatePost } from './hooks/use-posts'
import { uploadCoverImage, calcReadTime, slugify, type Post } from './services/posts.service'
import { ImagePickerDialog } from '../components/ImagePickerDialog'

const schema = z.object({
  title: z.string().min(1, 'Required'),
  slug: z.string().min(1, 'Required'),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props { post?: Post | null }

export function PostFormPage({ post }: Props) {
  const isEdit = !!post
  const navigate = useNavigate()
  const create = useCreatePost()
  const update = useUpdatePost()

  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [coverUploading, setCoverUploading] = useState(false)
  const [published, setPublished] = useState(false)
  const [slugEdited, setSlugEdited] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [imagePickerOpen, setImagePickerOpen] = useState(false)

  const coverInputRef = useRef<HTMLInputElement>(null)
  const imagePickerResolverRef = useRef<((result: ImagePickerResult | null) => void) | null>(null)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', slug: '', excerpt: '', author: '', meta_title: '', meta_description: '' },
  })

  const titleVal = watch('title')

  useEffect(() => {
    if (!slugEdited && titleVal) setValue('slug', slugify(titleVal))
  }, [titleVal, slugEdited, setValue])

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        author: post.author ?? '',
        meta_title: post.meta_title ?? '',
        meta_description: post.meta_description ?? '',
      })
      setContent(post.content ?? '')
      setTags(post.tags ?? [])
      setCoverUrl(post.cover_url ?? null)
      setPublished(post.published)
      setSlugEdited(true)
    }
  }, [post, reset])

  function goBack() { navigate({ to: '/app/blogs' }) }

  function handleRequestImage(): Promise<ImagePickerResult | null> {
    return new Promise((resolve) => {
      imagePickerResolverRef.current = resolve
      setImagePickerOpen(true)
    })
  }

  function handleImagePickerSelect(url: string) {
    imagePickerResolverRef.current?.({ kind: 'url', src: url })
    imagePickerResolverRef.current = null
    setImagePickerOpen(false)
  }

  function handleImagePickerClose() {
    imagePickerResolverRef.current?.(null)
    imagePickerResolverRef.current = null
    setImagePickerOpen(false)
  }

  async function handleCoverFile(file: File) {
    if (!file.type.startsWith('image/')) { toast.error('Only image files allowed'); return }
    setCoverUploading(true)
    try { setCoverUrl(await uploadCoverImage(file)) }
    catch { toast.error('Failed to upload cover') }
    finally { setCoverUploading(false) }
  }

  function addTag() {
    const val = tagInput.trim()
    if (val && !tags.includes(val)) setTags(t => [...t, val])
    setTagInput('')
  }

  async function onSubmit(values: FormValues) {
    const payload = {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt ?? '',
      content,
      cover_url: coverUrl,
      author: values.author ?? '',
      user_id: null,
      tags,
      meta_title: values.meta_title || null,
      meta_description: values.meta_description || null,
      read_time_minutes: calcReadTime(content),
      published,
      published_at: published ? (post?.published_at ?? new Date().toISOString()) : null,
    }
    try {
      if (isEdit && post) {
        await update.mutateAsync({ id: post.id, payload })
        toast.success('Post saved')
      } else {
        await create.mutateAsync(payload)
        toast.success('Post created')
      }
      goBack()
    } catch { toast.error('Something went wrong') }
  }

  return (
    <div className="peer-[.header-fixed]/header:mt-16 flex flex-col flex-1 min-h-0">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background shrink-0 z-20">
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={16} />
          </Button>
          <span className="text-[13px] text-muted-foreground truncate max-w-[200px]">
            {watch('title') || (isEdit ? 'Edit post' : 'New post')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button" variant="ghost" size="icon"
            onClick={() => setSettingsOpen(o => !o)}
            className={settingsOpen ? 'bg-muted' : ''}
          >
            <Settings2 size={16} />
          </Button>

          <div className="flex items-center gap-2 border border-border rounded-md px-3 py-1.5">
            {published
              ? <Globe size={12} className="text-primary" />
              : <FileText size={12} className="text-muted-foreground" />
            }
            <span className="text-[12px] text-foreground">{published ? 'Published' : 'Draft'}</span>
            <Switch checked={published} onCheckedChange={setPublished} />
          </div>

          <Button type="button" variant="ghost" size="sm" onClick={goBack}>Cancel</Button>
          <Button form="post-form" type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEdit ? 'Save' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">

        {/* Document area — único que scrollea */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <form id="post-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-5xl mx-auto px-8 md:px-16 py-10">

              {/* Cover image */}
              {coverUrl ? (
                <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden group mb-8 border border-border">
                  <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <button
                    type="button" onClick={() => setCoverUrl(null)}
                    className="absolute top-3 right-3 bg-background/90 rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={coverUploading}
                  className="w-full mb-8 flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground text-[13px] transition-colors group"
                >
                  <Upload size={14} className="group-hover:scale-110 transition-transform" />
                  {coverUploading ? 'Uploading...' : 'Add cover image'}
                </button>
              )}
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverFile(f); e.target.value = '' }} />

              {/* Title — document style */}
              <textarea
                {...register('title')}
                placeholder="Post title..."
                rows={1}
                onInput={e => {
                  const t = e.currentTarget
                  t.style.height = 'auto'
                  t.style.height = `${t.scrollHeight}px`
                }}
                className="w-full resize-none overflow-hidden bg-transparent text-foreground text-4xl md:text-5xl font-bold tracking-tight placeholder:text-muted-foreground/30 outline-none border-none leading-tight mb-3"
              />
              {errors.title && <p className="text-destructive text-[12px] -mt-2 mb-3">{errors.title.message}</p>}

              {/* Excerpt — subtitle style */}
              <textarea
                {...register('excerpt')}
                placeholder="Add a short description..."
                rows={1}
                onInput={e => {
                  const t = e.currentTarget
                  t.style.height = 'auto'
                  t.style.height = `${t.scrollHeight}px`
                }}
                className="w-full resize-none overflow-hidden bg-transparent text-muted-foreground text-lg md:text-xl placeholder:text-muted-foreground/30 outline-none border-none leading-relaxed mb-8"
              />

              {/* Divider */}
              <div className="border-t border-border mb-8" />

              {/* Editor — full document feel */}
              <Editor
                value={content}
                onChange={setContent}
                format="html"
                enableImagePasteDrop
                onUploadImage={async (file) => ({
                  src: await uploadCoverImage(file),
                  alt: file.name,
                })}
                onRequestImage={handleRequestImage}
                className="cn-editor cn-editor-document"
              />
            </div>

          </form>
        </div>

        {/* Settings panel */}
        {settingsOpen && (
        <div className="w-72 shrink-0 border-l border-border bg-muted overflow-y-auto">
          <div className="px-5 pt-5 pb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">Settings</p>
            <button type="button" onClick={() => setSettingsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={14} />
            </button>
          </div>

          <div className="px-5 pb-8 space-y-5">

            {/* Slug */}
            <div className="space-y-1.5">
              <Label className="text-[11px] tracking-[1.1px] uppercase">Slug</Label>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground text-[12px] shrink-0">/blog/</span>
                <Input
                  {...register('slug')}
                  className="text-[12px] h-8"
                  onChange={e => { setSlugEdited(true); setValue('slug', e.target.value) }}
                />
              </div>
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <Label className="text-[11px] tracking-[1.1px] uppercase">Author</Label>
              <Input {...register('author')} placeholder="Jane Doe" className="h-8 text-[13px]" />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <Label className="text-[11px] tracking-[1.1px] uppercase">Tags</Label>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-secondary/10 text-secondary text-[11px] font-medium px-2 py-0.5 rounded-[4px]">
                      {tag}
                      <button type="button" onClick={() => setTags(t => t.filter(x => x !== tag))}
                        className="text-secondary/50 hover:text-secondary">
                        <X size={10} strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <Input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag() } }}
                onBlur={addTag}
                placeholder="swimming, synchro..."
                className="h-8 text-[13px]"
              />
              <p className="text-[11px] text-muted-foreground">Enter or comma to add</p>
            </div>

            {/* SEO */}
            <div className="border-t border-border pt-4 space-y-4">
              <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground">SEO</p>

              <div className="space-y-1.5">
                <Label className="text-[11px] tracking-[1.1px] uppercase">Meta Title</Label>
                <Input {...register('meta_title')} placeholder="Overrides title" className="h-8 text-[13px]" />
                <p className="text-[11px] text-muted-foreground">{watch('meta_title')?.length ?? 0}/60</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] tracking-[1.1px] uppercase">Meta Description</Label>
                <Textarea {...register('meta_description')} rows={3} placeholder="Overrides excerpt" className="text-[13px]" />
                <p className="text-[11px] text-muted-foreground">{watch('meta_description')?.length ?? 0}/160</p>
              </div>
            </div>

            {/* Google preview */}
            <div className="border-t border-border pt-4">
              <p className="text-[10px] font-bold tracking-[1.4px] uppercase text-muted-foreground mb-3">Google Preview</p>
              <div className="bg-card border border-border rounded-md p-3 space-y-0.5">
                <p className="text-primary text-[11px] truncate">
                  seattlesynchrosst.com/blog/{watch('slug') || 'your-post'}
                </p>
                <p className="text-[13px] font-medium text-blue-600 dark:text-blue-400 line-clamp-1">
                  {watch('meta_title') || watch('title') || 'Post title'}
                </p>
                <p className="text-muted-foreground text-[11px] line-clamp-2">
                  {watch('meta_description') || watch('excerpt') || 'Post description will appear here.'}
                </p>
              </div>
            </div>

            {/* Read time */}
            {content && (
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground">Read time</span>
                <Badge variant="secondary">{calcReadTime(content)} min</Badge>
              </div>
            )}

          </div>
        </div>
      )}

      </div> {/* end body */}

      <ImagePickerDialog
        open={imagePickerOpen}
        onClose={handleImagePickerClose}
        onSelect={handleImagePickerSelect}
        onUpload={uploadCoverImage}
        bucket="blog"
        title="Insert image"
      />
    </div>
  )
}
