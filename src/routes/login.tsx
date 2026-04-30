import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useAdminAuth } from '#/features/admin/auth/use-admin-auth'
import logo from '/images/logo.png'

const loginSchema = z.object({
  email:    z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})
type LoginForm = z.infer<typeof loginSchema>

export const Route = createFileRoute('/login')({
  validateSearch: z.object({ redirect: z.string().optional() }),
  component: LoginPage,
})

function LoginPage() {
  const { session, loading } = useAdminAuth()
  const navigate = useNavigate()
  const { redirect: redirectTo } = useSearch({ from: '/login' })

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: redirectTo ?? '/app' })
    }
  }, [loading, session, navigate, redirectTo])
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginForm) {
    try {
      const { adminLogin } = await import('#/features/admin/auth/auth-store')
      await adminLogin(data.email, data.password)
      toast.success('Welcome back!')
      navigate({ to: redirectTo ?? '/app' })
    } catch {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Logo + header */}
        <div className="text-center mb-10">
          <img src={logo} alt="Seattle Synchro" className="h-12 mx-auto mb-6" />
          <h1 className="font-bold text-[#0A0A67] text-[28px] tracking-[-1.4px] uppercase">
            Admin Panel
          </h1>
          <p className="text-[#737373] text-[14px] mt-2">
            Sign in to manage the website content
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-10 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

            {/* Email */}
            <div className="space-y-2">
              <label className="font-bold text-[#171717] text-[12px] tracking-[1.2px] uppercase block">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="admin@seattlesynchro.com"
                  {...register('email')}
                  className="w-full bg-[#f3f3f5] border border-transparent pl-10 pr-4 py-3 text-[15px] text-[#171717] placeholder:text-[#a1a1a1] focus:outline-none focus:border-[#0A0A67] focus:ring-2 focus:ring-[#0A0A67]/10 transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-[#d4183d] text-[13px]">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="font-bold text-[#171717] text-[12px] tracking-[1.2px] uppercase block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full bg-[#f3f3f5] border border-transparent pl-10 pr-10 py-3 text-[15px] text-[#171717] placeholder:text-[#a1a1a1] focus:outline-none focus:border-[#0A0A67] focus:ring-2 focus:ring-[#0A0A67]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#171717] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#d4183d] text-[13px]">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0A0A67] text-white py-3 font-bold text-[13px] tracking-[2px] uppercase hover:bg-[#0A0A67]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>

          </form>
        </div>

        <p className="text-center text-[#a1a1a1] text-[12px] mt-8">
          Seattle Synchro · Admin Panel
        </p>
      </div>
    </div>
  )
}
