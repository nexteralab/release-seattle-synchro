import { Link } from '@tanstack/react-router'
import { FileText, Newspaper, BookOpen, Users, ArrowRight } from 'lucide-react'

const stats = [
  {
    label: 'Blogs',
    value: '—',
    description: 'Published articles',
    icon: FileText,
    to: '/app/blogs',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    label: 'News',
    value: '—',
    description: 'Recent announcements',
    icon: Newspaper,
    to: '/app/news',
    color: 'bg-indigo-500/10 text-indigo-400',
  },
  {
    label: 'Programs',
    value: '—',
    description: 'Active programs',
    icon: BookOpen,
    to: '/app/programs',
    color: 'bg-violet-500/10 text-violet-400',
  },
  {
    label: 'Coaches',
    value: '—',
    description: 'Team members',
    icon: Users,
    to: '/app/coaches',
    color: 'bg-sky-500/10 text-sky-400',
  },
] as const

export function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="px-8 py-6">
        <h1 className="font-bold text-foreground text-[22px] tracking-[-0.6px]">Dashboard</h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">Overview of your website content</p>
      </div>

      {/* Stats */}
      <div className="p-8">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, description, icon: Icon, to, color }) => (
            <Link
              key={to}
              to={to}
              className="bg-card p-5 rounded-[10px] border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={17} strokeWidth={2} />
                </div>
                <ArrowRight
                  size={14}
                  className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5"
                />
              </div>
              <p className="font-bold text-foreground text-[26px] tracking-[-1px] leading-none mb-1">
                {value}
              </p>
              <p className="font-semibold text-foreground text-[13px]">{label}</p>
              <p className="text-muted-foreground text-[12px] mt-0.5">{description}</p>
            </Link>
          ))}
        </div>

        {/* Quick access */}
        <div className="bg-card rounded-[10px] border border-border p-6">
          <h2 className="font-bold text-foreground text-[13px] tracking-[1px] uppercase mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {stats.map(({ label, icon: Icon, to }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-[6px] text-[13px] font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
              >
                <Icon size={14} strokeWidth={2} />
                Manage {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
