import { createFileRoute } from '@tanstack/react-router'
import { AboutUsPage } from '#/features/team/about-us/AboutUsPage'

export const Route = createFileRoute('/_public/team/about-us')({
  component: AboutUsPage,
})
