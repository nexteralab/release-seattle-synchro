import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function ForbiddenError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className="h-svh bg-black text-slate-100">
      <div className="m-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(163,126,44,0.4)] bg-[rgba(10,10,10,0.85)] px-4 py-1 text-[0.7rem] tracking-[0.18em] uppercase text-[rgba(245,245,245,0.7)]">
          <span className="h-1 w-1 rounded-full bg-[#A37E2C]" />
          Error 403 · Access denied
        </div>

        <h1 className="text-[4.5rem] leading-none font-semibold tracking-tight sm:text-[6rem]">
          Insufficient permissions
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-[rgba(245,245,245,0.6)]">
          You don&apos;t have the required permissions to view this resource.  
          If you believe this is a mistake, please contact an administrator or go back to the previous page.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="border-[rgba(163,126,44,0.5)] bg-transparent text-slate-100 hover:bg-[#A37E2C] hover:text-black"
            onClick={() => history.go(-1)}
          >
            Go back
          </Button>
          <Button
            className="bg-[#A37E2C] text-black hover:bg-[#c39a3a]"
            onClick={() => navigate({ to: '/' })}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  )
}
