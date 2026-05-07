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

    throw redirect({ to: '/' })
  },
})

