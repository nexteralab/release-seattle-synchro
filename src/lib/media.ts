import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'
import { authed } from './auth-guard'

// Todo vive en un solo bucket R2 con prefijos.
// Los heros de programas (salvo Free Try, que se quedó en 1 MB) van a 500 KB.
const HERO_FOLDERS = [
  'programs/elite-clinic',
  'programs/competitive',
  'programs/beginner',
  'programs/recreational',
  'programs/summer-camp',
] as const

export type MediaFolder = 'blog' | 'news' | 'coaches' | 'programs/free-try' | 'booster' | (typeof HERO_FOLDERS)[number]

const FOLDERS: MediaFolder[] = ['blog', 'news', 'coaches', 'programs/free-try', 'booster', ...HERO_FOLDERS]

// Documentos públicos del Booster Club (bylaws, actas…): solo PDF, hasta 10 MB.
const DOC_FOLDER: MediaFolder = 'booster'
const DOC_MAX_BYTES = 10 * 1024 * 1024

/**
 * Tope de 1 MB por imagen. No es una cifra arbitraria: las portadas y los hero
 * entran en el LCP de la página, y un JPG de varios MB hunde Core Web Vitals y
 * con ellos el SEO. Se valida en cliente (aviso inmediato) y en servidor
 * (autoridad real).
 */
export const MAX_IMAGE_BYTES = 1024 * 1024

// Heros de programas: 500 KB. Un hero bien exportado en WebP cabe de sobra.
const HERO_MAX_BYTES = 500 * 1024

export const maxImageBytes = (folder: MediaFolder) =>
  folder === DOC_FOLDER
    ? DOC_MAX_BYTES
    : (HERO_FOLDERS as readonly string[]).includes(folder) ? HERO_MAX_BYTES : MAX_IMAGE_BYTES

export const formatBytes = (n: number) =>
  n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`

const baseUrl = () => env.MEDIA_URL.replace(/\/$/, '')
const publicUrl = (key: string) => `${baseUrl()}/${key}`
const keyFromUrl = (url: string) => url.replace(`${baseUrl()}/`, '')

const uploadFn = createServerFn({ method: 'POST' })
  .middleware([authed])
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const file = data.get('file') as File | null
    const folder = String(data.get('folder') ?? '')
    if (!file) throw new Error('No file')
    if (!FOLDERS.includes(folder as MediaFolder)) throw new Error('Invalid folder')
    if (folder === DOC_FOLDER) {
      if (file.type !== 'application/pdf') throw new Error('Only PDF files are allowed')
    } else if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed')
    }
    const max = maxImageBytes(folder as MediaFolder)
    if (file.size > max) {
      throw new Error(`File is ${formatBytes(file.size)}. Maximum is ${formatBytes(max)}.`)
    }

    const ext = file.name.split('.').pop()
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    await env.MEDIA.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' },
    })
    return publicUrl(key)
  })

const deleteFn = createServerFn({ method: 'POST' })
  .middleware([authed])
  .inputValidator((url: string) => url)
  .handler(async ({ data }) => {
    const key = keyFromUrl(data)
    // ponytail: si la URL no es de nuestro bucket (link externo), no borra nada
    if (!key || key === data) return
    await env.MEDIA.delete(key)
  })

const listFn = createServerFn({ method: 'GET' })
  .middleware([authed])
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
  const max = maxImageBytes(folder)
  if (file.size > max) {
    throw new Error(`File is ${formatBytes(file.size)}. Maximum is ${formatBytes(max)}.`)
  }
  const fd = new FormData()
  fd.set('folder', folder)
  fd.set('file', file)
  return uploadFn({ data: fd })
}
export const deleteMedia = (url: string) => deleteFn({ data: url })
export const listMedia = (folder: MediaFolder) => listFn({ data: folder })
