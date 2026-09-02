import { ShieldAlert } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'

interface NotAuthorizedProps {
  description?: string
}

export function NotAuthorized({
  description = 'This section is restricted to administrators. Ask an admin to grant you access.',
}: NotAuthorizedProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[10px] border border-border bg-card px-6 py-20 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <ShieldAlert className="size-6 text-destructive" />
      </div>
      <h2 className="text-[18px] font-bold tracking-[-0.4px] text-foreground">
        Not authorized
      </h2>
      <p className="mt-1.5 max-w-sm text-[13px] text-muted-foreground">{description}</p>
      <Button asChild variant="outline" className="mt-6">
        <Link to="/app">Back to dashboard</Link>
      </Button>
    </div>
  )
}
