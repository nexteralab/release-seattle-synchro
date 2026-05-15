import { createFileRoute } from '@tanstack/react-router'
import NotFoundError from '#/components/errors/not-found-error'

export const Route = createFileRoute('/(errors)/404')({
  head: () => ({
    meta: [
      { title: '404 — Page Not Found | Seattle Synchro' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: NotFoundError,
})
