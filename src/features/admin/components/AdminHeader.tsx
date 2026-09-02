import React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface AdminHeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export const AdminHeader = ({
  className,
  fixed,
  children,
  ...props
}: AdminHeaderProps) => {
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'flex h-16 items-center gap-3 p-4 sm:gap-4',
        // Translúcido con blur: al hacer scroll el contenido pasa por debajo
        // en vez de cortarse contra un bloque opaco.
        'bg-background/85 backdrop-blur-md',
        fixed && 'header-fixed peer/header fixed z-50 w-[inherit] rounded-md',
        offset > 10 && fixed
          ? 'border-b border-border shadow-[0_1px_3px_oklch(0.25_0.045_266/0.06)]'
          : 'border-b border-transparent shadow-none',
        className
      )}
      {...props}
    >
      <SidebarTrigger variant='outline' className='scale-125 sm:scale-100' />
      <Separator orientation='vertical' className='h-6' />
      {children}
    </header>
  )
}

AdminHeader.displayName = 'AdminHeader'
