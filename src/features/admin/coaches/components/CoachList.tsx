import { useState, useMemo } from 'react'
import {
  useReactTable, getCoreRowModel,
  flexRender, type ColumnDef,
} from '@tanstack/react-table'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2, Mail } from 'lucide-react'
import { Switch } from '#/components/ui/switch'
import { toast } from 'sonner'
import { useCoaches, useToggleCoach, useReorderCoaches } from '../hooks/use-coaches'
import type { Coach } from '../services/coaches.service'

interface Props {
  onEdit: (coach: Coach) => void
  onDelete: (coach: Coach) => void
}

function Avatar({ coach }: { coach: Coach }) {
  if (coach.image_url) {
    return (
      <img src={coach.image_url} alt={coach.name}
        className="w-9 h-9 rounded-md object-cover shrink-0" />
    )
  }
  return (
    <div className="w-9 h-9 rounded-md bg-[#0A0A67] flex items-center justify-center font-semibold text-white text-[13px] shrink-0">
      {coach.name.charAt(0)}
    </div>
  )
}

function SortableRow({
  coach, cells, isDragging,
}: {
  coach: Coach
  cells: React.ReactNode
  isDragging: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: coach.id })

  return (
    <tr
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`border-b border-[#f5f5f5] transition-colors ${isDragging ? 'opacity-50 bg-[#f8f8ff]' : 'hover:bg-white'}`}
      data-drag-attributes={JSON.stringify(attributes)}
      data-drag-listeners={JSON.stringify(listeners)}
    >
      <td className="pl-3 pr-1 py-3 align-middle w-8">
        <button
          {...attributes}
          {...listeners}
          className="p-1 rounded text-[#ccc] hover:text-[#888] cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical size={15} />
        </button>
      </td>
      {cells}
    </tr>
  )
}

export function CoachList({ onEdit, onDelete }: Props) {
  const { data: serverCoaches = [], isLoading, isError } = useCoaches()
  const toggle = useToggleCoach()
  const reorder = useReorderCoaches()
  const [localCoaches, setLocalCoaches] = useState<Coach[]>([])
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const coaches = localCoaches.length ? localCoaches : serverCoaches

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  async function handleToggle(coach: Coach) {
    setTogglingId(coach.id)
    try {
      await toggle.mutateAsync({ id: coach.id, active: !coach.active })
      toast.success(`${coach.name} ${!coach.active ? 'activated' : 'deactivated'}`)
    } catch {
      toast.error('Could not update status')
    } finally {
      setTogglingId(null)
    }
  }

  function onDragStart(e: { active: { id: string | number } }) {
    setActiveId(String(e.active.id))
  }

  async function onDragEnd(e: DragEndEvent) {
    setActiveId(null)
    const { active, over } = e
    if (!over || active.id === over.id) return

    const base = localCoaches.length ? localCoaches : serverCoaches
    const oldIdx = base.findIndex(c => c.id === active.id)
    const newIdx = base.findIndex(c => c.id === over.id)
    const reordered = arrayMove(base, oldIdx, newIdx)

    setLocalCoaches(reordered)

    try {
      await reorder.mutateAsync(
        reordered.map((c, i) => ({ id: c.id, sort_order: i }))
      )
    } catch {
      toast.error('Could not save order')
      setLocalCoaches([])
    }
  }

  const columns = useMemo<ColumnDef<Coach>[]>(() => [
    {
      id: 'coach',
      header: 'Coach',
      cell: ({ row }) => {
        const c = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar coach={c} />
            <div className="min-w-0">
              <p className="font-medium text-[#111] text-[13px] truncate">{c.name}</p>
              <p className="text-[#999] text-[12px] truncate">{c.title}</p>
            </div>
          </div>
        )
      },
    },
    {
      id: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const email = row.original.email
        if (!email) return <span className="text-[#ddd] text-[12px]">—</span>
        return (
          <a href={`mailto:${email}`} onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[#999] text-[12px] hover:text-[#0A0A67] transition-colors">
            <Mail size={11} />
            {email}
          </a>
        )
      },
    },
    {
      id: 'specialties',
      header: 'Specialties',
      cell: ({ row }) => {
        const items = row.original.specialties
        if (!items.length) return <span className="text-[#ddd] text-[12px]">—</span>
        return (
          <div className="flex flex-wrap gap-1">
            {items.slice(0, 2).map(s => (
              <span key={s} className="text-[11px] font-medium text-[#555] bg-[#f0f0f0] px-2 py-0.5 rounded-full">
                {s}
              </span>
            ))}
            {items.length > 2 && (
              <span className="text-[11px] text-[#aaa]">+{items.length - 2}</span>
            )}
          </div>
        )
      },
    },
    {
      id: 'active',
      header: 'Active',
      cell: ({ row }) => {
        const c = row.original
        return (
          <Switch
            checked={c.active}
            onCheckedChange={() => handleToggle(c)}
            disabled={togglingId === c.id}
          />
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const c = row.original
        return (
          <div className="flex items-center gap-0.5 justify-end pr-2">
            <button onClick={() => onEdit(c)}
              className="p-1.5 rounded-md text-[#bbb] hover:text-[#0A0A67] hover:bg-[#f0f0f6] transition-colors">
              <Pencil size={13} />
            </button>
            <button onClick={() => onDelete(c)}
              className="p-1.5 rounded-md text-[#bbb] hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 size={13} />
            </button>
          </div>
        )
      },
    },
  ], [togglingId, onEdit, onDelete])

  const table = useReactTable({
    data: coaches,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <div className="py-16 text-center text-[#aaa] text-[13px]">Loading...</div>
  if (isError)   return <div className="py-16 text-center text-red-400 text-[13px]">Failed to load.</div>
  if (!coaches.length) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id} className="border-b border-[#f0f0f0]">
                <th className="w-8 pl-3" />
                {hg.headers.map(header => (
                  <th key={header.id}
                    className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#bbb] uppercase tracking-wide whitespace-nowrap">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <SortableContext items={coaches.map(c => c.id)} strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows.map(row => (
                <SortableRow
                  key={row.original.id}
                  coach={row.original}
                  isDragging={activeId === row.original.id}
                  cells={row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>

        <div className="px-4 py-2.5 text-[11px] text-[#ccc]">
          {coaches.length} {coaches.length === 1 ? 'coach' : 'coaches'}
        </div>
      </div>
    </DndContext>
  )
}
