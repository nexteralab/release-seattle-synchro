import { createFileRoute, redirect } from '@tanstack/react-router'

// Captura cualquier ruta que empiece por `/page/…` (incluyendo múltiples segmentos)
// y la redirige a la home.
export const Route = createFileRoute('/page/$')({
    beforeLoad: () => {
        throw redirect({ to: '/' })
    },
})

