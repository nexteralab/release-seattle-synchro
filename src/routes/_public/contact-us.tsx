import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '#/features/contact-us'

export const Route = createFileRoute('/_public/contact-us')({
  component: () => <ContactPage />,
})
