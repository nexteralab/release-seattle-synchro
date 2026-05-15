import { createFileRoute } from '@tanstack/react-router'
import GeneralError from '#/components/errors/general-error'

export const Route = createFileRoute('/(errors)/500')({
  head: () => ({
    meta: [
      { title: '500 — Server Error | Seattle Synchro' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: GeneralError,
})
