import type { LucideIcon } from 'lucide-react'

interface AdminEmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function AdminEmptyState({ icon: Icon, title, description, action }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
        <Icon size={22} className="text-muted-foreground/70" strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-foreground text-[15px] mb-1">{title}</h3>
      <p className="text-muted-foreground text-[13px] max-w-xs">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
