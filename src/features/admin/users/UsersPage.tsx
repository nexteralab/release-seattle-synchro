import { useState } from 'react'
import { Pencil, Plus, Trash2, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '#/components/ui/alert-dialog'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '#/components/ui/table'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { AdminEmptyState } from '#/features/admin/components/AdminEmptyState'
import { useAdminAuth } from '#/features/admin/auth/use-admin-auth'
import { useDeleteUser, useUsers } from './hooks/use-users'
import { UserFormDialog } from './components/UserFormDialog'
import type { AdminUser } from './services/users.service'

/** "hace 3 h", "hace 5 d"… Un timestamp exacto no dice nada de un vistazo. */
function fmtLastLogin(iso: string | null): { text: string; stale: boolean } {
  if (!iso) return { text: 'Never', stale: true }
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return { text: 'Just now', stale: false }
  if (mins < 60) return { text: `${mins}m ago`, stale: false }
  const hours = Math.floor(mins / 60)
  if (hours < 24) return { text: `${hours}h ago`, stale: false }
  const days = Math.floor(hours / 24)
  if (days < 30) return { text: `${days}d ago`, stale: days > 14 }
  return { text: new Date(iso).toISOString().slice(0, 10), stale: true }
}

function Skeleton() {
  return (
    <div className="w-full animate-pulse p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-border py-3 last:border-0">
          <div className="h-3 flex-1 rounded bg-muted" />
          <div className="h-3 w-1/4 rounded bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-7 w-16 rounded-md bg-muted" />
        </div>
      ))}
    </div>
  )
}

export function UsersPage() {
  const { data, isLoading } = useUsers()
  const { session } = useAdminAuth()
  const remove = useDeleteUser()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<AdminUser | null>(null)
  const [deleting, setDeleting] = useState<AdminUser | null>(null)

  const meId = session?.user.id

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(u: AdminUser) {
    setEditing(u)
    setFormOpen(true)
  }

  async function confirmDelete() {
    if (!deleting) return
    try {
      await remove.mutateAsync(deleting.id)
      toast.success(`${deleting.email} deleted`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete the user')
    } finally {
      setDeleting(null)
    }
  }

  const isEmpty = !isLoading && (!data || data.length === 0)

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Users"
        description="Panel accounts and their access level"
        action={
          <Button onClick={openCreate}>
            <Plus className="mr-1.5 size-4" />
            New user
          </Button>
        }
      />

      <div className="overflow-hidden rounded-[10px] border border-border bg-card">
        {isLoading ? (
          <Skeleton />
        ) : isEmpty ? (
          <AdminEmptyState
            icon={UserPlus}
            title="No users yet"
            description="Create the first account to give someone access to the panel."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last sign-in</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data!.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">
                    {u.name}
                    {u.id === meId && (
                      <span className="ml-2 text-[11px] text-muted-foreground">(you)</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[12px]">
                    {(() => {
                      const { text, stale } = fmtLastLogin(u.lastLoginAt)
                      return (
                        <span
                          className={stale ? 'text-muted-foreground/60' : 'text-foreground'}
                          title={u.lastLoginAt ?? 'Never signed in'}
                        >
                          {text}
                        </span>
                      )
                    })()}
                  </TableCell>
                  <TableCell className="text-[12px] text-muted-foreground">
                    {u.createdAt.slice(0, 10)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => openEdit(u)}
                      aria-label={`Edit ${u.email}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleting(u)}
                      // El servidor también lo bloquea; esto solo evita el intento.
                      disabled={u.id === meId}
                      aria-label={`Delete ${u.email}`}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <UserFormDialog open={formOpen} onClose={() => setFormOpen(false)} editing={editing} />

      <AlertDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting?.email} will lose access immediately. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
