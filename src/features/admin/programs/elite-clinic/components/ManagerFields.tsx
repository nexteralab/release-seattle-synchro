import { UserCheck } from 'lucide-react'
import { Input } from '#/components/ui/input'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '#/components/ui/form'

const labelCls = 'text-[11px] font-bold tracking-[1.1px] uppercase'
const cardCls = 'rounded-[10px] border border-border bg-card p-5'
const cardTitle = 'flex items-center gap-2 font-bold text-foreground text-[12px] tracking-[1px] uppercase mb-4'

export function ManagerFields() {
  return (
    <div className={cardCls}>
      <h3 className={cardTitle}>
        <UserCheck size={13} className="text-[#0A0A67]" />
        Camp Manager
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="manager.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Daniela Garmendia" className="text-[13px]" />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
        <FormField
          name="manager.role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Role</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Head Coach Seattle Synchro"
                  className="text-[13px]"
                />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
        <FormField
          name="manager.email"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className={labelCls}>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="info@seattlesynchro.com"
                  className="text-[13px]"
                />
              </FormControl>
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
