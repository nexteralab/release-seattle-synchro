import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'
import { adminOnly } from './auth-guard'

// Todo vive en un solo bucket R2 con prefijos.
export type MediaFolder = 'blog' | 'news' | 'coaches' | 'programs/free-try'

const FOLDERS: MediaFolder[] = ['blog', 'news', 'coaches', 'programs/free-try']

/**
 * Tope de 1 MB por imagen. No es una cifra arbitraria: las portadas y los hero
 * entran en el LCP de la página, y un JPG de varios MB hunde Core Web Vitals y
 * con ellos el SEO. Se valida en cliente (aviso inmediato) y en servidor
 * (autoridad real).
 */
export const MAX_IMAGE_BYTES = 1024 * 1024

export const formatBytes = (n: number) =>
  n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`

const baseUrl = () => env.MEDIA_URL.replace(/\/$/, '')
const publicUrl = (key: string) => `${baseUrl()}/${key}`
const keyFromUrl = (url: string) => url.replace(`${baseUrl()}/`, '')

const uploadFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const file = data.get('file') as File | null
    const folder = String(data.get('folder') ?? '')
    if (!file) throw new Error('No file')
    if (!FOLDERS.includes(folder as MediaFolder)) throw new Error('Invalid folder')
    if (!file.type.startsWith('image/')) throw new Error('Only image files are allowed')
    if (file.size > MAX_IMAGE_BYTES) {
      throw new Error(`Image is ${formatBytes(file.size)}. Maximum is 1 MB.`)
    }

    const ext = file.name.split('.').pop()
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    await env.MEDIA.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' },
    })
    return publicUrl(key)
  })

const deleteFn = createServerFn({ method: 'POST' })
  .middleware([adminOnly])
  .inputValidator((url: string) => url)
  .handler(async ({ data }) => {
    const key = keyFromUrl(data)
    // ponytail: si la URL no es nuestra (queda alguna vieja de Supabase), no borra nada
    if (!key || key === data) return
    await env.MEDIA.delete(key)
  })

const listFn = createServerFn({ method: 'GET' })
  .middleware([adminOnly])
  .inputValidator((folder: MediaFolder) => folder)
  .handler(async ({ data }) => {
    const { objects } = await env.MEDIA.list({ prefix: `${data}/`, limit: 200 })
    return objects
      .filter((o) => /\.(png|jpg|jpeg|webp|gif)$/i.test(o.key))
      .sort((a, b) => b.uploaded.getTime() - a.uploaded.getTime())
      .map((o) => ({ name: o.key.slice(data.length + 1), url: publicUrl(o.key) }))
  })

export const uploadMedia = (folder: MediaFolder, file: File) => {
  // Se comprueba también aquí para no subir un archivo que el servidor va a
  // rechazar: el aviso llega antes y sin gastar la subida.
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`Image is ${formatBytes(file.size)}. Maximum is 1 MB.`)
  }
  const fd = new FormData()
  fd.set('folder', folder)
  fd.set('file', file)
  return uploadFn({ data: fd })
}
export const deleteMedia = (url: string) => deleteFn({ data: url })
export const listMedia = (folder: MediaFolder) => listFn({ data: folder })
