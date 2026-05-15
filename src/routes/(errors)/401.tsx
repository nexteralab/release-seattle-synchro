import { createFileRoute } from '@tanstack/react-router'
import UnauthorisedError from '#/components/errors/unauthorized-error'

export const Route = createFileRoute('/(errors)/401')({
  head: () => ({
    meta: [
      { title: '401 — Unauthorized | Seattle Synchro' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: UnauthorisedError,
})
