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
      <div className="w-12 h-12 bg-[#f5f5f5] rounded-xl flex items-center justify-center mb-4">
        <Icon size={22} className="text-[#a1a1a1]" strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-[#171717] text-[15px] mb-1">{title}</h3>
      <p className="text-[#737373] text-[13px] max-w-xs">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
