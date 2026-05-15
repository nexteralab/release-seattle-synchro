import { createFileRoute } from '@tanstack/react-router'
import ForbiddenError from '#/components/errors/forbidden'

export const Route = createFileRoute('/(errors)/403')({
  head: () => ({
    meta: [
      { title: '403 — Forbidden | Seattle Synchro' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ForbiddenError,
})
