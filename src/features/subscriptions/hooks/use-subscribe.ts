import { useState } from 'react'
import { subscribe, AlreadySubscribedError, type SubscriptionSource } from '../services/subscriptions.service'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate'

export function useSubscribe(source: SubscriptionSource) {
  const [status, setStatus] = useState<Status>('idle')

  async function submit(email: string) {
    setStatus('loading')
    try {
      await subscribe(email, source)
      setStatus('success')
    } catch (err) {
      if (err instanceof AlreadySubscribedError) {
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
    }
  }

  function reset() { setStatus('idle') }

  return { status, submit, reset }
}
