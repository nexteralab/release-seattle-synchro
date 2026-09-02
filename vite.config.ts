import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  environments: {
    ssr: {
      optimizeDeps: {
        // src/server.ts importa estos dos paquetes por nombre para esquivar los
        // `export *` de @tanstack/react-start/server. No se pueden pre-bundlear:
        // resuelven imports virtuales (#tanstack-router-entry,
        // #tanstack-start-server-fn-resolver) que solo existen dentro del plugin
        // de TanStack Start.
        exclude: ['@tanstack/start-server-core', '@tanstack/react-start-server'],
      },
    },
  },
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
