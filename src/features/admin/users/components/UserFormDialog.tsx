import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '#/components/ui/select'
import { Spinner } from '#/components/ui/spinner'
import { useCreateUser, useUpdateUser } from '../hooks/use-users'
import type { AdminUser, UserRole } from '../services/users.service'

interface Props {
  open: boolean
  onClose: () => void
  /** null = crear; con valor = editar. */
  editing: AdminUser | null
}

const EMPTY = { name: '', email: '', password: '', role: 'user' as UserRole }

export function UserFormDialog({ open, onClose, editing }: Props) {
  const [form, setForm] = useState(EMPTY)
  const create = useCreateUser()
  const update = useUpdateUser()
  const saving = create.isPending || update.isPending

  useEffect(() => {
    if (!open) return
    setForm(editing
      ? { name: editing.name, email: editing.email, password: '', role: editing.role }
      : EMPTY)
  }, [open, editing])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editing) {
        await update.mutateAsync({
          id: editing.id,
          payload: { name: form.name, role: form.role, password: form.password || undefined },
        })
        toast.success('User updated')
      } else {
        await create.mutateAsync(form)
        toast.success('User created')
      }
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit user' : 'New user'}</DialogTitle>
            <DialogDescription>
              {editing
                ? 'Leave the password blank to keep the current one.'
                : 'The user signs in with this email and password.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-5">
            <div className="grid gap-2">
              <Label htmlFor="user-name">Name</Label>
              <Input
                id="user-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@seattlesynchro.com"
                // El email es la identidad de la cuenta: no se edita.
                disabled={!!editing}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="user-password">
                Password {editing && <span className="text-muted-foreground">(optional)</span>}
              </Label>
              <Input
                id="user-password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={editing ? 'Leave blank to keep it' : 'At least 8 characters'}
                minLength={editing && !form.password ? undefined : 8}
                required={!editing}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="user-role">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm({ ...form, role: v as UserRole })}
              >
                <SelectTrigger id="user-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin — full access to the panel</SelectItem>
                  <SelectItem value="user">User — no access to the panel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Spinner className="mr-2 size-4" />}
              {editing ? 'Save changes' : 'Create user'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
