import { useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table'
import { Trash2, UserX, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '#/components/ui/badge'
import { useSubscriptions, useDeleteSubscription, useUnsubscribe } from '../hooks/use-subscriptions'
import { DeleteSubscriptionDialog } from './DeleteSubscriptionDialog'
import type { Subscription } from '../services/subscriptions.service'

function Skeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="border-b border-border flex items-center gap-4 px-4 py-2.5">
        {[40, 28, 20, 24, 16].map((w, i) => (
          <div key={i} className={`h-3 bg-muted rounded`} style={{ width: `${w}%` }} />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-b border-border flex items-center gap-4 px-4 py-3">
          <div className="flex-1 h-3 bg-muted rounded" />
          <div className="w-16 h-5 bg-muted rounded-full" />
          <div className="w-16 h-5 bg-muted rounded-full" />
          <div className="w-28 h-2.5 bg-muted/60 rounded" />
          <div className="flex gap-1">
            <div className="w-7 h-7 bg-muted rounded-md" />
            <div className="w-7 h-7 bg-muted rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className="p-1 rounded text-muted-foreground/40 hover:text-muted-foreground transition-colors"
    >
      {copied ? <Check size={11} className="text-green-500" /> : <Copy size={11} />}
    </button>
  )
}

const SOURCE_LABELS: Record<string, string> = {
  blog: 'Blog',
  news: 'News',
  general: 'General',
}

interface Props {
  source: 'all' | 'blog' | 'news' | 'general'
}

export function SubscriptionList({ source }: Props) {
  const { data: all = [], isLoading, isError } = useSubscriptions()
  const unsub = useUnsubscribe()
  const [deleting, setDeleting] = useState<Subscription | null>(null)

  const rows = useMemo(
    () => source === 'all' ? all : all.filter(s => s.source === source),
    [all, source],
  )

  const columns = useMemo<ColumnDef<Subscription>[]>(() => [
    {
      id: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[13px] font-medium text-foreground truncate">{row.original.email}</span>
          <CopyEmail email={row.original.email} />
        </div>
      ),
    },
    {
      id: 'source',
      header: 'Source',
      cell: ({ row }) => (
        <Badge variant="secondary" className="text-[11px] capitalize">
          {SOURCE_LABELS[row.original.source] ?? row.original.source}
        </Badge>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        row.original.status === 'active'
          ? <Badge variant="default" className="text-[11px]">Active</Badge>
          : <Badge variant="outline" className="text-[11px] text-muted-foreground">Unsubscribed</Badge>
      ),
    },
    {
      id: 'date',
      header: 'Subscribed',
      cell: ({ row }) => (
        <span className="text-muted-foreground text-[12px] whitespace-nowrap">
          {new Date(row.original.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const s = row.original
        return (
          <div className="flex items-center gap-0.5 justify-end pr-2">
            {s.status === 'active' && (
              <button
                title="Mark as unsubscribed"
                disabled={unsub.isPending}
                onClick={async () => {
                  try {
                    await unsub.mutateAsync(s.id)
                    toast.success('Marked as unsubscribed')
                  } catch {
                    toast.error('Could not update')
                  }
                }}
                className="p-1.5 rounded-md text-muted-foreground hover:text-orange-500 hover:bg-orange-50 transition-colors"
              >
                <UserX size={13} />
              </button>
            )}
            <button
              title="Delete permanently"
              onClick={() => setDeleting(s)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )
      },
    },
  ], [unsub])

  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() })

  if (isLoading) return <Skeleton />
  if (isError) return <div className="py-16 text-center text-destructive text-[13px]">Failed to load subscriptions.</div>

  const active = rows.filter(s => s.status === 'active').length

  return (
    <>
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
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-muted-foreground text-[13px]">
                  No subscriptions yet.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {rows.length > 0 && (
          <div className="px-4 py-2.5 text-[11px] text-muted-foreground flex items-center gap-3">
            <span>{rows.length} total</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{active} active</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{rows.length - active} unsubscribed</span>
          </div>
        )}
      </div>

      <DeleteSubscriptionDialog
        subscription={deleting}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}
