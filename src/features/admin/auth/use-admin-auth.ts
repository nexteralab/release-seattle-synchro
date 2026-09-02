import { authClient } from '#/lib/auth-client'
import { adminLogout } from './auth-store'

export function useAdminAuth() {
  const { data, isPending } = authClient.useSession()
  return {
    session: data ?? null,
    user: data?.user ?? null,
    isAuthenticated: !!data,
    loading: isPending,
    adminLogout,
  }
}
