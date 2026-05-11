import { useNavigate } from '@tanstack/react-router'
import { Sun, Trophy, Waves, Dumbbell, Sparkles, Award, Pencil, Lock, CalendarDays } from 'lucide-react'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { Button } from '#/components/ui/button'

interface Program {
  key: string
  icon: React.ElementType
  name: string
  description: string
  image: string
  route?: string
  status: 'active' | 'coming-soon'
  tag?: 'event'
}

const PROGRAMS: Program[] = [
  {
    key: 'summer-camp',
    icon: Sun,
    name: 'Summer Camp',
    description: 'Recreational 1-week camp. Edit sessions, pricing, dates and requirements.',
    image: '/images/hero_summer.webp',
    route: '/app/programs/summer-camp',
    status: 'active',
    tag: 'event',
  },
  {
    key: 'free-try',
    icon: Sparkles,
    name: 'Free Try',
    description: 'Free trial event. Edit date, time, ages, safety note, location and required items.',
    image: '/images/image_free_try.webp',
    route: '/app/programs/free-try',
    status: 'active',
    tag: 'event',
  },
  {
    key: 'elite-clinic',
    icon: Award,
    name: 'Elite Clinic',
    description: 'International Elite Clinic. Edit title, dates, pricing, coaches, schedule and registration link.',
    image: '/images/elite-clinc.webp',
    route: '/app/programs/elite-clinic',
    status: 'active',
    tag: 'event',
  },
  {
    key: 'competitive',
    icon: Trophy,
    name: 'Competitive',
    description: 'Age group, junior and senior competitive programs.',
    image: '/images/competitive_hero.webp',
    route: '/app/programs/competitive',
    status: 'active',
  },
  {
    key: 'recreational',
    icon: Waves,
    name: 'Recreational',
    description: 'Sea Stars, Sharks & Mermaids, and Dolphins sub-programs. Edit details, coaches, schedule and pricing.',
    image: '/images/recreational_hero.webp',
    route: '/app/programs/recreational',
    status: 'active',
  },
  {
    key: 'beginner',
    icon: Dumbbell,
    name: 'Beginner',
    description: 'Novice and Intermediate teams. Edit details, coaches, schedule, dates and cost.',
    image: '/images/beginner.jpg',
    route: '/app/programs/beginner',
    status: 'active',
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
                'group relative border border-border rounded-[10px] overflow-hidden flex flex-col min-h-[260px]',
                !editable && 'opacity-60',
              ].filter(Boolean).join(' ')}
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25" />

              <div className="relative flex flex-col flex-1 p-5 gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="size-10 rounded-[8px] bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {p.tag === 'event' && (
                      <span className="flex items-center gap-1 text-[10px] font-bold tracking-[1px] uppercase text-[#0A0A67] bg-white px-2 py-1 rounded-full shadow-sm">
                        <CalendarDays size={10} />
                        Event
                      </span>
                    )}
                    {!editable && (
                      <span className="flex items-center gap-1 text-[10px] font-bold tracking-[1px] uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-full">
                        <Lock size={9} />
                        Soon
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="font-bold text-white text-[16px] tracking-[-0.3px] mb-1 drop-shadow-sm">{p.name}</h3>
                  <p className="text-[13px] text-white/85 leading-[1.55] drop-shadow-sm">{p.description}</p>
                </div>

                {editable && (
                  <Button
                    size="sm"
                    className="w-full bg-white text-[#0A0A67] hover:bg-white/90"
                    onClick={() => navigate({ to: p.route as any })}
                  >
                    <Pencil size={13} />
                    Edit Program
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
