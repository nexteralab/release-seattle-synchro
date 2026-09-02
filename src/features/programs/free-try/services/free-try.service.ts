import { getConfig } from '#/features/programs/config.service'
import type { FreeTryData } from '../types'

const REGISTER_URL = 'https://www.seattlesynchrosst.com/page/system/classreg-shopping'

/**
 * Contenido por defecto — el mismo que estaba fijo en el código antes de que
 * la página fuera editable. Sirve de red si la fila de `config` no existe, y
 * de valores iniciales del formulario del admin (lo importa su servicio), para
 * que las dos copias no puedan divergir.
 */
export const FREE_TRY_DEFAULTS: FreeTryData = {
  date: 'June 7th, 2026',
  time: '11:30 am – 12:00 pm',
  ages: '6 – 12 years old',
  location: {
    name: 'Newport Hills',
    address: 'Swim and Tennis Club\nAthletic Excellence Center',
  },
  hero: {
    badge: 'Open House',
    title: 'Free Artistic Swimming Trial in Bellevue',
    description: 'Join us for a free introduction to the world of artistic swimming',
    ctaLabel: 'Sign Up for Free',
    ctaUrl: REGISTER_URL,
    image: '',
  },
  safety: {
    requirementTitle: 'Critical Safety Requirement',
    requirement:
      'Safety is our priority. Participants MUST be able to swim a full lap of crawl stroke and breast stroke unassisted, without stopping and without a flotation device.',
    contactTitle: 'Got Questions?',
    contactHeading:
      'Not sure if your swimmer meets the requirements, or want more details before signing up?',
    contactBody: 'Reach out and our coaches will help you figure out the best fit.',
    contactLabel: 'Contact Us',
  },
  faq: [
    {
      question: "Does my child need swimming experience to try artistic swimming?",
      answer:
        "Yes, some. Basic swimming proficiency is required for safety, and each program has its own swimming requirements. No artistic swimming experience is needed! Keep in mind, the stronger the swimmer, the easier it is to learn artistic swimming.",
    },
    {
      question: "How much does the free trial cost?",
      answer:
        "Nothing. The trial session is completely free and there is no obligation to enroll afterwards. We do not ask for payment details to reserve a spot.",
    },
    {
      question: "What ages is the trial for?",
      answer:
        "Try Synchro is designed for swimmers aged 6 to 12. Team Tryouts, which are a separate event, are for ages 6 to 11. If your child is outside those ranges and interested in artistic swimming, contact us and we can point you to the right program.",
    },
    {
      question: "What is artistic swimming, exactly?",
      answer:
        "Artistic swimming is the ultimate team sport! Formerly called synchronized swimming, it combines swimming, dance and gymnastics into one sport. Athletes perform choreographed routines in the water, often upside down and without touching the bottom. It builds remarkable breath control, core strength, flexibility and teamwork.",
    },
    {
      question: "Can I stay and watch?",
      answer:
        "Yes, and we encourage it. There is spectator seating on deck. It is the best way to see whether the sport clicks for your child and to ask our coaches questions afterwards.",
    },
    {
      question: "What happens after the tryout?",
      answer:
        "Coaches will email you after the tryout with the results and next steps. If your swimmer is ready to join, we’ll recommend the program that best fits their current level — Beginner (Novice or Intermediate), Recreational, or Competitive. If they’re not quite ready, we’ll let you know what to work on before trying again.",
    },
    {
      question: "Is artistic swimming safe for kids?",
      answer:
        "Yes. Practices are led by certified coaches who are trained in First Aid and CPR, with some also certified as lifeguards. Our swimming prerequisites help ensure every participant is comfortable and safe in the water. As with any sport, injuries can happen, but safety is always a priority.",
    },
  ],
  banner: {
    heading: 'Ready to Dive In?',
    description:
      'Spots are limited! Join us for a free introduction to the world of artistic swimming.',
    registerLabel: 'Register Now',
    registerUrl: REGISTER_URL,
    contactLabel: 'Contact Us',
    image: '4',
  },
}

/** Rellena lo que falte: filas guardadas antes de que existieran hero y banner. */
function withDefaults(stored: Partial<FreeTryData> | undefined): FreeTryData {
  if (!stored) return FREE_TRY_DEFAULTS
  return {
    ...FREE_TRY_DEFAULTS,
    ...stored,
    location: { ...FREE_TRY_DEFAULTS.location, ...stored.location },
    hero: { ...FREE_TRY_DEFAULTS.hero, ...stored.hero },
    safety: { ...FREE_TRY_DEFAULTS.safety, ...stored.safety },
    // Una lista vacía es una decisión legítima del editor; solo se cae al
    // default cuando la clave no existe todavía.
    faq: stored.faq ?? FREE_TRY_DEFAULTS.faq,
    banner: { ...FREE_TRY_DEFAULTS.banner, ...stored.banner },
  }
}

export async function getFreeTryData(): Promise<FreeTryData> {
  const stored = await getConfig<{ content?: Partial<FreeTryData> }>('free-try')
  return withDefaults(stored?.content)
}
