import { getConfig } from '#/features/programs/config.service'
import type { TryOutData } from '../types'
import heroImage from '/images/programs/try-out/hero.webp'

const FALLBACK: TryOutData = {
  ages: '6 – 11 years old',
  when: 'Try out for Novice',
  location: {
    name: 'Triangle Pool',
    address: '1919 108th Ave SE, Bellevue, WA',
  },
  heroImage: heroImage,
}

export async function getTryOutData(): Promise<TryOutData> {
  const stored = await getConfig<{ content?: TryOutData }>('try-out')
  return stored?.content ?? FALLBACK
}
