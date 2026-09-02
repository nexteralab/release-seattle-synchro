import { defineConfig } from 'vitest/config'

// Config aparte de vite.config.ts a propósito: el plugin de Cloudflare fija
// `resolve.external` en el entorno worker y Vitest no puede arrancar con eso.
// Los tests son de lógica pura, no necesitan el runtime de Workers.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
