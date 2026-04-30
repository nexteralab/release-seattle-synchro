import { StoreFooter } from '#/components/Footer'
import { NavbarHomePage } from '#/components/Navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
    component: PublicRoute,
})

function PublicRoute() {
    return <div className="flex min-h-screen flex-col bg-black">
        <NavbarHomePage />
        <main className="flex-1 mt-[68px]">
            <Outlet />
            {/* <WhatsAppChat /> */}
        </main>
        <StoreFooter />
    </div>
}
