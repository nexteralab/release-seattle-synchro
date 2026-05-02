import { useNavigate } from '@tanstack/react-router'
import { Sun, Trophy, Waves, Dumbbell, Pencil, Lock } from 'lucide-react'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { Button } from '#/components/ui/button'

interface Program {
  key: string
  icon: React.ElementType
  name: string
  description: string
  route?: string
  status: 'active' | 'coming-soon'
}

const PROGRAMS: Program[] = [
  {
    key: 'summer-camp',
    icon: Sun,
    name: 'Summer Camp',
    description: 'Recreational 1-week camp. Edit sessions, pricing, dates and requirements.',
    route: '/app/programs/summer-camp',
    status: 'active',
  },
  {
    key: 'competitive',
    icon: Trophy,
    name: 'Competitive',
    description: 'Age group, junior and senior competitive programs.',
    status: 'coming-soon',
  },
  {
    key: 'recreational',
    icon: Waves,
    name: 'Recreational',
    description: 'Beginner and intermediate recreational programs.',
    status: 'coming-soon',
  },
  {
    key: 'beginner',
    icon: Dumbbell,
    name: 'Beginner',
    description: 'Introduction to artistic swimming for new swimmers.',
    status: 'coming-soon',
  },
]

export function ProgramsPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Programs"
        description="Edit content for each program shown on the public site"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {PROGRAMS.map(p => {
          const Icon = p.icon
          const editable = p.status === 'active' && !!p.route

          return (
            <div
              key={p.key}
              className={[
                'bg-card border border-border rounded-[10px] p-5 flex flex-col gap-4',
                !editable && 'opacity-60',
              ].filter(Boolean).join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="size-10 rounded-[8px] bg-[#0A0A67]/8 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#0A0A67]" />
                </div>
                {!editable && (
                  <span className="flex items-center gap-1 text-[10px] font-bold tracking-[1px] uppercase text-muted-foreground border border-border px-2 py-1 rounded-full">
                    <Lock size={9} />
                    Soon
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-foreground text-[15px] tracking-[-0.3px] mb-1">{p.name}</h3>
                <p className="text-[13px] text-muted-foreground leading-[1.55]">{p.description}</p>
              </div>

              {editable && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: p.route as any })}
                >
                  <Pencil size={13} />
                  Edit Program
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
