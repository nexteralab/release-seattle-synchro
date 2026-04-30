import React from 'react'
import { cn } from '@/lib/utils'

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export const MainLayout = ({ fixed, className, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-12',
        'px-4 py-6',
        fixed && 'fixed-main flex grow flex-col overflow-hidden',
        className
      )}
      {...props}
    />
  )
}

MainLayout.displayName = 'MainLayout'
