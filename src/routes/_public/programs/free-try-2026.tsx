import { createFileRoute } from '@tanstack/react-router'
import { getFreeTryData, FreeTryPage } from '#/features/programs/free-try'

export const Route = createFileRoute('/_public/programs/free-try-2026')({
  loader: () => getFreeTryData(),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <FreeTryPage data={data} />
}
