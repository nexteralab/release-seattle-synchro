import { useNavigate, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate()
  const { history } = useRouter()

  return (
    <div className={cn('h-svh w-full bg-[#0A0A67] text-white', className)}>
      <div className="m-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 px-12 text-center">

        {!minimal && (
          <div className="inline-flex items-center gap-2 border border-white/20 px-4 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span className="font-['Space_Grotesk'] font-bold text-[11px] tracking-[2px] uppercase text-white/60">
              Error 500
            </span>
          </div>
        )}

        {!minimal && (
          <h1 className="font-['Space_Grotesk'] font-bold text-[64px] sm:text-[80px] leading-none tracking-[-3px] uppercase text-white">
            Something<br />went wrong
          </h1>
        )}

        <p className="font-['Inter'] text-[16px] leading-[26px] text-white/60 max-w-md">
          We're sorry, an unexpected error occurred. Our team is already working to resolve this — please try again in a few moments.
        </p>

        {!minimal && (
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => history.go(-1)}
              className="inline-flex items-center justify-center px-8 py-3 border border-white/30 font-['Space_Grotesk'] font-bold text-[13px] tracking-[1.6px] uppercase text-white hover:bg-white/10 transition-colors duration-200"
            >
              Go back
            </button>
            <button
              onClick={() => navigate({ to: '/' })}
              className="inline-flex items-center justify-center px-8 py-3 bg-white font-['Space_Grotesk'] font-bold text-[13px] tracking-[1.6px] uppercase text-[#0A0A67] hover:bg-white/90 transition-colors duration-200"
            >
              Back to home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
