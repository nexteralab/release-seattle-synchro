import { authClient } from '#/lib/auth-client'

// SOLO cliente. La sesión del servidor vive en `./session.ts` — mantenerlos
// separados evita que el splitter de server functions mezcle ambos grafos.

export async function adminLogin(email: string, password: string) {
  const { data, error } = await authClient.signIn.email({ email, password })
  if (error) throw new Error(error.message ?? 'Invalid credentials')
  return data
}

export async function adminLogout(): Promise<void> {
  await authClient.signOut()
}
