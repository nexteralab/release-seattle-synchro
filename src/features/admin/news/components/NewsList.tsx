import { useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2, Globe, FileText } from 'lucide-react'
import { Switch } from '#/components/ui/switch'
import { Badge } from '#/components/ui/badge'
import { toast } from 'sonner'
import { useNews, useUpdateNews } from '../hooks/use-news'
import type { NewsItem } from '../services/news.service'

interface Props {
  onEdit: (item: NewsItem) => void
  onDelete: (item: NewsItem) => void
}

export function NewsListSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="border-b border-[#f0f0f0] flex items-center gap-4 px-4 py-2.5">
        <div className="h-3 w-16 bg-[#f0f0f0] rounded" />
        <div className="h-3 w-20 bg-[#f0f0f0] rounded ml-auto" />
        <div className="h-3 w-14 bg-[#f0f0f0] rounded" />
        <div className="h-3 w-14 bg-[#f0f0f0] rounded" />
        <div className="h-3 w-10 bg-[#f0f0f0] rounded" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-b border-[#f5f5f5] flex items-center gap-4 px-4 py-3">
          <div className="w-12 h-8 rounded-md bg-[#ececec] shrink-0" />
          <div className="flex-1 space-y-1.5 min-w-0">
            <div className="h-3 bg-[#ececec] rounded" style={{ width: `${50 + (i % 3) * 15}%` }} />
            <div className="h-2.5 bg-[#f0f0f0] rounded w-2/5" />
          </div>
          <div className="w-20 h-5 bg-[#f0f0f0] rounded-full shrink-0" />
          <div className="w-24 h-2.5 bg-[#f0f0f0] rounded shrink-0" />
          <div className="w-9 h-5 bg-[#ececec] rounded-full shrink-0" />
          <div className="flex gap-1 shrink-0">
            <div className="w-7 h-7 bg-[#f0f0f0] rounded-md" />
            <div className="w-7 h-7 bg-[#f0f0f0] rounded-md" />
          </div>
        </div>
      ))}
      <div className="px-4 py-2.5">
        <div className="h-2.5 w-16 bg-[#f0f0f0] rounded" />
      </div>
    </div>
  )
}

function CoverThumbnail({ item }: { item: NewsItem }) {
  if (item.cover_url) {
    return (
      <img
        src={item.cover_url}
        alt={item.title}
        className="w-12 h-8 rounded-md object-cover shrink-0"
      />
    )
  }
  return (
    <div className="w-12 h-8 rounded-md bg-[#f0f0f0] flex items-center justify-center shrink-0">
      <FileText size={14} className="text-[#ccc]" />
    </div>
  )
}

function CategoryBadge({ category }: { category: string | null }) {
  if (!category) return <span className="text-[#ddd] text-[12px]">—</span>
  return (
    <Badge variant="secondary" className="text-[11px] font-medium capitalize">
      {category}
    </Badge>
  )
}

export function NewsList({ onEdit, onDelete }: Props) {
  const { data: items = [], isLoading, isError } = useNews()
  const update = useUpdateNews()
  const [togglingId, setTogglingId] = useState<string | null>(null)

  async function handleTogglePublished(item: NewsItem) {
    setTogglingId(item.id)
    const nextPublished = !item.published
    try {
      await update.mutateAsync({
        id: item.id,
        payload: {
          published: nextPublished,
          published_at: nextPublished ? (item.published_at ?? new Date().toISOString()) : null,
        },
      })
      toast.success(nextPublished ? 'Published' : 'Moved to draft')
    } catch {
      toast.error('Could not update status')
    } finally {
      setTogglingId(null)
    }
  }

  const columns = useMemo<ColumnDef<NewsItem>[]>(() => [
    {
      id: 'cover',
      header: '',
      cell: ({ row }) => <CoverThumbnail item={row.original} />,
    },
    {
      id: 'title',
      header: 'Title',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="min-w-0">
            <p className="font-medium text-[#111] text-[13px] truncate max-w-xs">{item.title}</p>
            {item.excerpt && (
              <p className="text-[#999] text-[12px] truncate max-w-xs">{item.excerpt}</p>
            )}
          </div>
        )
      },
    },
    {
      id: 'category',
      header: 'Category',
      cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    },
    {
      id: 'author',
      header: 'Author',
      cell: ({ row }) => (
        <span className="text-[#999] text-[12px]">
          {row.original.author || <span className="text-[#ddd]">—</span>}
        </span>
      ),
    },
    {
      id: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = row.original.published_at ?? row.original.created_at
        return (
          <span className="text-[#bbb] text-[12px] whitespace-nowrap">
            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )
      },
    },
    {
      id: 'published',
      header: 'Published',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="flex items-center gap-1.5">
            {item.published
              ? <Globe size={11} className="text-primary shrink-0" />
              : <FileText size={11} className="text-muted-foreground shrink-0" />
            }
            <Switch
              checked={item.published}
              onCheckedChange={() => handleTogglePublished(item)}
              disabled={togglingId === item.id}
            />
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="flex items-center gap-0.5 justify-end pr-2">
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 rounded-md text-[#bbb] hover:text-[#0A0A67] hover:bg-[#f0f0f6] transition-colors"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="p-1.5 rounded-md text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )
      },
    },
  ], [togglingId, onEdit, onDelete])

  const table = useReactTable({ data: items, columns, getCoreRowModel: getCoreRowModel() })

  if (isLoading) return <NewsListSkeleton />
  if (isError) return <div className="py-16 text-center text-red-400 text-[13px]">Failed to load news.</div>
  if (!items.length) return null

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id} className="border-b border-[#f0f0f0]">
              {hg.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#bbb] uppercase tracking-wide whitespace-nowrap"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.original.id}
              className="border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors cursor-pointer"
              onClick={() => onEdit(row.original)}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-3 align-middle"
                  onClick={cell.column.id === 'published' || cell.column.id === 'actions' ? e => e.stopPropagation() : undefined}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2.5 text-[11px] text-[#ccc]">
        {items.length} {items.length === 1 ? 'announcement' : 'announcements'}
      </div>
    </div>
  )
}
