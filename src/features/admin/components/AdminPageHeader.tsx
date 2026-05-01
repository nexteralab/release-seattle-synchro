interface AdminPageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-6">
      <div>
        <h1 className="font-bold text-foreground text-[22px] tracking-[-0.6px]">
          {title}
        </h1>
        {description && (
          <p className="text-[#737373] text-[13px] mt-0.5">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
