import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import type { auth } from './auth'

// `import type` — solo tipos, no arrastra el servidor al bundle del cliente.
// Sin este plugin, la sesión del cliente no conoce `user.role`.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signOut, useSession } = authClient
