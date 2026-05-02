import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import appCss from '../styles.css?url'

import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import GeneralError from '#/components/errors/general-error'
import NotFoundError from '#/components/errors/not-found-error'
import { Toaster } from 'sonner'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('vite-ui-theme');var mode=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='system'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Seattle Synchro ',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ],
  }),
  component: RootDocument,
  errorComponent: GeneralError,
  notFoundComponent: NotFoundError,
})

function RootDocument() {
  const { queryClient } = Route.useRouteContext()
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
          <HeadContent />
        </head>
        <body className="antialiased [overflow-wrap:anywhere]" suppressContentEditableWarning>
          <Outlet />
          <Toaster
            position="bottom-right"
            richColors
          />
          <Scripts />
        </body>
      </html>
    </QueryClientProvider>
  )
}
