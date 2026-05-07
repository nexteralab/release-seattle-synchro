import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/page/')({
    beforeLoad: () => {
        throw redirect({ to: '/' })
    },
})
