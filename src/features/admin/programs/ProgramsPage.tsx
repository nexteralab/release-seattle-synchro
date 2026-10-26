import { Link, type LinkProps } from '@tanstack/react-router'
import { Sun, Trophy, Waves, Dumbbell, Sparkles, Award, ArrowRight } from 'lucide-react'
import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { Card } from '#/components/ui/card'

interface Program {
  key: string
  icon: React.ElementType
  name: string
  description: string
  image: string
  route: LinkProps['to']
}

const EVENTS: Program[] = [
  {
    key: 'summer-camp',
    icon: Sun,
    name: 'Summer Camp',
    description: 'Sessions, pricing, dates and requirements.',
    image: '/images/hero_summer.webp',
    route: '/app/programs/summer-camp',
  },
  {
    key: 'free-try',
    icon: Sparkles,
    name: 'Free Try',
    description: 'Date, time, ages, safety note, location and FAQ.',
    image: '/images/image_free_try.webp',
    route: '/app/programs/free-try',
  },
  {
    key: 'elite-clinic',
    icon: Award,
    name: 'Elite Clinic',
    description: 'Dates, pricing, location, coaches and registration link.',
    image: '/images/elite-clinc.webp',
    route: '/app/programs/elite-clinic',
  },
]

const SEASON: Program[] = [
  {
    key: 'competitive',
    icon: Trophy,
    name: 'Competitive',
    description: 'Age group, junior and senior teams.',
    image: '/images/competitive_hero.webp',
    route: '/app/programs/competitive',
  },
  {
    key: 'recreational',
    icon: Waves,
    name: 'Recreational',
    description: 'Sea Stars, Sharks & Mermaids and Dolphins.',
    image: '/images/recreational_hero.webp',
    route: '/app/programs/recreational',
  },
  {
    key: 'beginner',
    icon: Dumbbell,
    name: 'Beginner',
    description: 'Novice and Intermediate teams.',
    image: '/images/beginner.jpg',
    route: '/app/programs/beginner',
  },
]

export function ProgramsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Programs"
        description="Edit content for each program shown on the public site"
      />
      <ProgramGroup title="Events" programs={EVENTS} />
      <ProgramGroup title="Season Programs" programs={SEASON} />
    </div>
  )
}

function ProgramGroup({ title, programs }: { title: string; programs: Program[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[11px] font-bold tracking-[1.1px] uppercase text-muted-foreground">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {programs.map(p => <ProgramCard key={p.key} program={p} />)}
      </div>
    </section>
  )
}

function ProgramCard({ program: p }: { program: Program }) {
  const Icon = p.icon
  return (
    <Link
      to={p.route}
      className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full gap-0 py-0 overflow-hidden transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-md">
        <div className="aspect-[16/7] overflow-hidden bg-muted">
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex items-start gap-3 p-4">
          <div className="size-8 rounded-[8px] bg-primary/10 flex items-center justify-center shrink-0">
            <Icon size={15} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-[15px] leading-tight">{p.name}</h3>
            <p className="mt-1 text-[13px] text-muted-foreground leading-snug">{p.description}</p>
          </div>
          <ArrowRight
            size={16}
            className="mt-0.5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5"
          />
        </div>
      </Card>
    </Link>
  )
}
