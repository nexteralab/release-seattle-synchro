import { createFileRoute, redirect } from '@tanstack/react-router'

// Captura cualquier ruta que empiece por `/page/…` (incluyendo múltiples segmentos)
// y la redirige a la home.
export const Route = createFileRoute('/page/$')({
  beforeLoad: ({ location }) => {
    // Ej: /page/programs/summer-camps  ->  /programs/summer-camp
    const rest = location.pathname.replace(/^\/page\/?/, '')

    if (rest === 'programs/summer-camps') {
      throw redirect({ to: '/programs/summer-camp' })
    }

    if (rest === 'programs/private-lessons') {
      throw redirect({ to: '/programs/private-lessons' })
    }

    if (rest === 'programs/elite-clinic') {
      throw redirect({ to: '/programs/elite-clinic' })
    }

    if (rest === 'programs/competitive') {
      throw redirect({ to: '/programs/competitive' })
    }

    if (rest === 'programs/recreational') {
      throw redirect({ to: '/programs/recreational' })
    }

    if (rest === 'programs/beginner') {
      throw redirect({ to: '/programs/beginner' })
    }

    if (rest === 'programs') {
      throw redirect({ to: '/programs' })
    }

    throw redirect({ to: '/' })
  },
})

