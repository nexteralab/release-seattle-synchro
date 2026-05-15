import { createFileRoute } from '@tanstack/react-router'
import MaintenanceError from '#/components/errors/maintenance-error'

export const Route = createFileRoute('/(errors)/503')({
  head: () => ({
    meta: [
      { title: '503 — Service Unavailable | Seattle Synchro' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: MaintenanceError,
})
