import { StoreFooter } from '#/components/Footer'
import { NavbarHomePage } from '#/components/Navbar'
import { CookieBanner } from '#/components/CookieBanner'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { usePageAnalytics } from '#/features/analytics/use-page-analytics'

export const Route = createFileRoute('/_public')({
    component: PublicRoute,
})

function PublicRoute() {
    // Un pageview por navegación en todo el sitio público.
    usePageAnalytics()

    return <div className="flex min-h-screen flex-col bg-black">
        <NavbarHomePage />
        <main className="flex-1 mt-[68px]">
            <Outlet />
            {/* <WhatsAppChat /> */}
        </main>
        <StoreFooter />
        <CookieBanner />
    </div>
}
