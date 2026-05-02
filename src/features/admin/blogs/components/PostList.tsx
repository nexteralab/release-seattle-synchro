import { useMemo } from 'react'
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2, Globe, FileText } from 'lucide-react'
import { Badge } from '#/components/ui/badge'
import { usePosts } from '../hooks/use-posts'
import type { Post } from '../services/posts.service'

function PostListSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="border-b border-border flex items-center gap-4 px-4 py-2.5">
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-3 w-16 bg-muted rounded ml-auto" />
        <div className="h-3 w-20 bg-muted rounded ml-8" />
        <div className="h-3 w-10 bg-muted rounded ml-8" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-b border-border flex items-center gap-4 px-4 py-3">
          <div className="w-12 h-12 rounded-md bg-muted shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-muted rounded" style={{ width: `${50 + (i % 3) * 15}%` }} />
            <div className="h-2.5 bg-muted/60 rounded w-2/5" />
          </div>
          <div className="w-16 h-5 bg-muted rounded-full" />
          <div className="w-24 h-2.5 bg-muted/60 rounded" />
          <div className="flex gap-1">
            <div className="w-7 h-7 bg-muted rounded-md" />
            <div className="w-7 h-7 bg-muted rounded-md" />
          </div>
        </div>
      ))}
      <div className="px-4 py-2.5"><div className="h-2.5 w-16 bg-muted rounded" /></div>
    </div>
  )
}

interface Props {
  onEdit: (post: Post) => void
  onDelete: (post: Post) => void
}

export function PostList({ onEdit, onDelete }: Props) {
  const { data: posts = [], isLoading, isError } = usePosts()

  const columns = useMemo<ColumnDef<Post>[]>(() => [
    {
      id: 'post',
      header: 'Post',
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md bg-muted overflow-hidden shrink-0">
              {p.cover_url
                ? <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><FileText size={18} className="text-muted-foreground" /></div>
              }
            </div>
            <div className="min-w-0">
              <p className="font-medium text-foreground text-[13px] truncate">{p.title}</p>
              <p className="text-muted-foreground text-[12px] truncate">/{p.slug}</p>
            </div>
          </div>
        )
      },
    },
    {
      id: 'tags',
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original.tags
        if (!tags.length) return <span className="text-muted-foreground/40 text-[12px]">—</span>
        return (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map(t => (
              <Badge key={t} variant="secondary" className="text-[11px] font-medium">{t}</Badge>
            ))}
            {tags.length > 2 && <span className="text-[11px] text-muted-foreground">+{tags.length - 2}</span>}
          </div>
        )
      },
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const p = row.original
        return p.published
          ? <Badge variant="default" className="gap-1 text-[11px]"><Globe size={10} />Published</Badge>
          : <Badge variant="outline" className="gap-1 text-[11px]"><FileText size={10} />Draft</Badge>
      },
    },
    {
      id: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const d = row.original.published_at ?? row.original.created_at
        return (
          <span className="text-muted-foreground text-[12px]">
            {new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex items-center gap-0.5 justify-end pr-2">
            <button onClick={() => onEdit(p)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Pencil size={13} />
            </button>
            <button onClick={() => onDelete(p)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <Trash2 size={13} />
            </button>
          </div>
        )
      },
    },
  ], [onEdit, onDelete])

  const table = useReactTable({ data: posts, columns, getCoreRowModel: getCoreRowModel() })

  if (isLoading) return <PostListSkeleton />
  if (isError)   return <div className="py-16 text-center text-destructive text-[13px]">Failed to load posts.</div>
  if (!posts.length) return null

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id} className="border-b border-border">
              {hg.headers.map(header => (
                <th key={header.id}
                  className="px-4 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b border-border hover:bg-muted/40 transition-colors">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2.5 text-[11px] text-muted-foreground">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
      </div>
    </div>
  )
}
