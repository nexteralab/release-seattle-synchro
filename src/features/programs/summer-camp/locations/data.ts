import type { LocationContent } from './types'

export const REGISTER_URL =
  'https://www.seattlesynchrosst.com/page/system/classreg-shopping'

/** Constantes compartidas por TODAS las ciudades (no varían). */
export const SHARED = {
  ages: '6–11 years old · beginners welcome',
  swimLevel:
    'For safety, campers should be able to swim two laps of crawl stroke and float on their back.',
  schedule: '9:00am – 11:00am',
  pricingFeatures: ['5 morning sessions', 'Routine set to music', 'Friday performance'],
  whyCards: [
    { icon: '♪', tone: 'teal', title: 'Swim to Music', text: 'Learn a routine set to fun songs and move together in the water.' },
    { icon: '★', tone: 'green', title: 'Make New Friends', text: 'Team up with other kids and cheer each other on all week long.' },
    { icon: '〜', tone: 'teal', title: 'Learn Cool Tricks', text: 'Floats, spins, and sculls — the building blocks of artistic swimming.' },
    { icon: '✦', tone: 'green', title: 'Perform a Show', text: 'Show off the routine for family & friends on the last day!' },
  ],
  packItems: [
    { label: 'Swim Suit' },
    { label: 'Swim Cap' },
    { label: 'Goggles' },
    { label: 'Nose Clips', link: 'https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW' },
    { label: 'Towel' },
  ] as { label: string; link?: string }[],
}

/**
 * Piscinas reales del camp — FIJAS para todas las ciudades (son las únicas
 * disponibles). Fechas, horarios y precios no cambian entre ciudades.
 */
const CAMP_WEEKS: LocationContent['weeks'] = [
  {
    month: 'July',
    area: 'Newport Hills',
    locationName: 'Newport Swim & Tennis Club',
    address: '5464 119th Ave SE, Bellevue, WA 98006',
    dates: 'July 27 – 31',
    price: '$330',
    mapQuery: 'Newport Swim and Tennis Club Bellevue WA 98006',
    featured: true,
  },
  {
    month: 'August',
    area: 'Somerset',
    locationName: 'Somerset Recreation Club',
    address: '4445 Somerset Blvd SE, Bellevue, WA 98006',
    dates: 'August 3 – 7',
    price: '$330',
    mapQuery: '4445 Somerset Blvd SE Bellevue WA 98006',
  },
]

// Campos fijos compartidos: las piscinas están en Bellevue, así que el heading,
// el mapa y las semanas son idénticos en cada ciudad.
const FIXED = {
  state: 'WA',
  locationHeading: 'Two Pools in Bellevue',
  mapEmbedQuery: 'Bellevue, WA 98006',
  weeks: CAMP_WEEKS,
} satisfies Partial<LocationContent>

export const LOCATIONS: Record<string, LocationContent> = {
  bellevue: {
    ...FIXED,
    slug: 'bellevue',
    city: 'Bellevue',
    heroTitle: 'Synchronized Swimming Summer Camp in Bellevue 2026',
    heroSubtitle:
      'A super-fun week of synchronized & artistic swimming summer camp for kids in Bellevue. Swim to music, learn cool tricks with new friends!',
    aboutParagraphs: [
      'Our recreational summer camp in Bellevue, WA blends athleticism with artistry in the pool. Designed for beginners, kids get expert coaching in technique, choreography, and teamwork — all while having a blast.',
      "Run by Seattle Synchro — greater Seattle's dedicated synchronized swim team — the camp teaches the basics of synchronized swimming, builds water confidence, and ends with a routine performed for family. Whether they're brand new or have splashed around before, every kid leaves with new skills and big smiles.",
    ],
    locationBlurb:
      'Easy to reach from Newport Hills, Somerset, Factoria, and across greater Seattle.',
    faqs: [
      { q: 'Where is the camp held in Bellevue?', a: 'We run camp at two pools in Bellevue, WA 98006: Newport Swim & Tennis Club in Newport Hills (week of July 27) and Somerset (week of August 3). Both are easy to reach from across greater Seattle.' },
      { q: 'What ages is the artistic swimming camp for?', a: 'The camp is built for beginners ages 6 to 11. Kids are grouped by age and ability so everyone progresses at a comfortable, fun pace.' },
      { q: 'Does my child need swimming experience?', a: 'Some water comfort is required for safety: campers should be able to independently swim two laps of crawl stroke and float on their back. No prior synchronized swimming experience is needed.' },
      { q: 'What is artistic swimming?', a: 'Artistic swimming — also called synchronized swimming — blends swimming, dance, and gymnastics into routines performed to music. Campers learn the basics and rehearse a routine performed for family on the last day.' },
      { q: 'What should my camper bring each day?', a: 'A swim suit, swim cap, goggles, nose clips, and a towel. Sessions run 9:00–11:00am, so a water bottle and sunscreen are smart too.' },
      { q: 'How do I register?', a: 'Tap any "Register Now" button to reserve a spot, or email info@seattlesynchro.org. Spots are limited and fill quickly, so early registration is recommended!' },
    ],
  },

  redmond: {
    ...FIXED,
    slug: 'redmond',
    city: 'Redmond',
    packOffset: 1,
    heroTitle: 'Synchronized Swimming Summer Camp in Redmond 2026',
    heroSubtitle:
      'A playful week of artistic & synchronized swimming for Redmond kids, just a short drive away in Bellevue. Swim to music, master new tricks, and make summer friends!',
    aboutParagraphs: [
      'Families in Redmond, WA are a quick hop from our recreational artistic swimming camp at two Bellevue pools. Built for beginners, each morning mixes athletic skill-building with the artistry of swimming to music — guided by an experienced, encouraging coaching team.',
      'Led by Seattle Synchro, the area\'s dedicated Seattle synchronized swimming team, the camp covers the fundamentals over five mornings, grows water confidence, and ends with a routine on the final day. New to the sport or already comfortable in the water, every Redmond camper goes home with fresh skills and a big smile.',
    ],
    locationBlurb:
      'An easy drive from Redmond via SR-520 and I-405 — both Bellevue pools are about 15 minutes away.',
    faqs: [
      { q: 'Where is the Redmond-area camp actually held?', a: 'Camp runs at two pools in Bellevue, WA 98006 — Newport Swim & Tennis Club in Newport Hills (week of July 27) and Somerset (week of August 3). Both sit roughly 15 minutes from Redmond via SR-520 or I-405.' },
      { q: 'Who can join the camp?', a: "It's designed for beginners ages 6 to 11. Campers are grouped by age and ability so each child moves at a fun, comfortable pace." },
      { q: 'Does my child need to be a strong swimmer?', a: 'Just basic water comfort, for safety: campers should be able to swim two laps of crawl stroke on their own and float on their back. No previous synchronized swimming experience is required.' },
      { q: 'What is artistic swimming?', a: 'Artistic swimming (synchronized swimming) blends swimming, dance, and gymnastics into routines set to music. Campers learn the building blocks and rehearse a short routine they perform for family on the last day.' },
      { q: 'What should my camper pack each morning?', a: 'A swim suit, swim cap, goggles, nose clips, and a towel. Since sessions run 9:00–11:00am, a water bottle and sunscreen are smart additions too.' },
      { q: 'How do we sign up?', a: 'Hit any "Register Now" button to grab a spot, or email info@seattlesynchro.org. Space is limited and fills fast, so registering early is your best bet.' },
    ],
  },

  kirkland: {
    ...FIXED,
    slug: 'kirkland',
    city: 'Kirkland',
    packOffset: 2,
    heroTitle: 'Synchronized Swimming Summer Camp in Kirkland 2026',
    heroSubtitle:
      'Five sunny mornings of synchronized swimming for Kirkland kids, held a short drive south in Bellevue. Glide to music, learn fun tricks, and team up with new friends!',
    aboutParagraphs: [
      'Just minutes from Kirkland, WA, our recreational summer camp brings athleticism and artistry together in the water across two Bellevue pools. Beginners are welcome — kids get hands-on coaching in technique, choreography, and teamwork while having a ton of fun.',
      "Coached by Seattle Synchro — a synchronized swim team serving greater Seattle — campers learn the basics of synchronized swimming through the week, build confidence in the water, and rehearse a routine they show off on the final day. Whether it's their first splash or they've swum before, every Kirkland kid leaves with new abilities and great memories.",
    ],
    locationBlurb:
      'A short trip down I-405 from Kirkland — both Bellevue pools are roughly 15 minutes away.',
    faqs: [
      { q: 'Where does the camp take place for Kirkland families?', a: 'We hold camp at two Bellevue pools in 98006 — Newport Swim & Tennis Club in Newport Hills (week of July 27) and Somerset (week of August 3) — about 15 minutes down I-405 from Kirkland.' },
      { q: 'What age group is the camp for?', a: 'Beginners ages 6 to 11. We group campers by age and skill so everyone progresses comfortably and has fun.' },
      { q: 'Is swimming experience required?', a: 'Only basic water comfort, for safety: kids should be able to swim two laps of crawl stroke unaided and float on their back. No synchronized swimming background is needed.' },
      { q: 'What is artistic swimming?', a: 'Artistic swimming — better known as synchronized swimming — combines swimming, dance, and gymnastics into routines performed to music. Campers learn the essentials and practice a routine for a family showcase on the last day.' },
      { q: 'What should kids bring daily?', a: 'Swim suit, swim cap, goggles, nose clips, and a towel. With 9:00–11:00am sessions, packing a water bottle and sunscreen is a good idea.' },
      { q: 'How can we register?', a: 'Use any "Register Now" button to reserve a place, or email info@seattlesynchro.org. Spots are limited and go quickly, so early sign-up is recommended.' },
    ],
  },

  newcastle: {
    ...FIXED,
    slug: 'newcastle',
    city: 'Newcastle',
    packOffset: 3,
    heroTitle: 'Synchronized Swimming Summer Camp in Newcastle 2026',
    heroSubtitle:
      'A week of artistic & synchronized swimming fun for Newcastle kids, just up the road in Bellevue. Swim to music, pick up cool moves, and make new friends!',
    aboutParagraphs: [
      'Newcastle, WA families are practically next door to our recreational artistic swimming camp, held at two nearby Bellevue pools. Designed for beginners, every morning balances athletic skill with the creativity of swimming to music under friendly, expert coaching.',
      'Taught by Seattle Synchro, greater Seattle\'s synchronized swim team, the camp covers synchronized swimming fundamentals across five mornings, builds water confidence, and ends with a routine on the last day. Brand new or already at ease in the pool, each Newcastle camper finishes with new skills and plenty of smiles.',
    ],
    locationBlurb:
      'Practically next door — both Bellevue pools are only about 10 minutes from Newcastle via Coal Creek Parkway.',
    faqs: [
      { q: 'Where is the camp located for Newcastle kids?', a: 'Camp is at two Bellevue pools in 98006 — Newport Swim & Tennis Club in Newport Hills (week of July 27) and Somerset (week of August 3) — roughly 10 minutes from Newcastle via Coal Creek Parkway.' },
      { q: 'What ages does the camp serve?', a: "It's for beginners ages 6 to 11, grouped by age and ability so each child learns at a relaxed, enjoyable pace." },
      { q: 'Does my child need prior swim skills?', a: 'Just basic water safety: campers should independently swim two laps of crawl stroke and float on their back. No synchronized swimming experience is necessary.' },
      { q: 'What is artistic swimming?', a: 'Also called synchronized swimming, it weaves swimming, dance, and gymnastics into music-driven routines. Campers master the basics and rehearse a routine to perform for family on the final day.' },
      { q: "What should be in my camper's bag?", a: 'A swim suit, swim cap, goggles, nose clips, and a towel. Because sessions run 9:00–11:00am, bring a water bottle and sunscreen too.' },
      { q: "What's the registration process?", a: 'Click any "Register Now" button to claim a spot, or email info@seattlesynchro.org. Places are limited and fill fast, so don\'t wait to sign up.' },
    ],
  },

  'mercer-island': {
    ...FIXED,
    slug: 'mercer-island',
    city: 'Mercer Island',
    packOffset: 4,
    heroTitle: 'Synchronized Swimming Summer Camp in Mercer Island 2026',
    heroSubtitle:
      'Five mornings of synchronized swimming for Mercer Island kids, a quick drive over I-90 to Bellevue. Move to music, learn playful tricks, and find new friends!',
    aboutParagraphs: [
      'Mercer Island, WA is a short hop over I-90 from our recreational summer camp at two Bellevue pools. Made for beginners, each session pairs real athletic coaching with the artistry of swimming to music — all in a fun, welcoming setting.',
      'With Seattle Synchro — the dedicated synchronized swim team for greater Seattle — campers spend the week learning synchronized swimming basics, growing their water confidence, and rehearsing a routine they perform on day five. First-timers and confident swimmers alike leave with new skills and big grins.',
    ],
    locationBlurb:
      'A quick drive over I-90 from Mercer Island — both Bellevue pools are about 10–15 minutes away.',
    faqs: [
      { q: 'Where is the camp held for Mercer Island families?', a: 'We run camp at two Bellevue pools in 98006 — Newport Swim & Tennis Club in Newport Hills (week of July 27) and Somerset (week of August 3) — about 10–15 minutes from Mercer Island via I-90.' },
      { q: 'What ages is it open to?', a: 'Beginners ages 6 to 11. Kids are grouped by age and ability so each one progresses at a fun, comfortable pace.' },
      { q: 'Is previous swimming experience needed?', a: 'Only basic water comfort, for safety: campers should be able to swim two laps of crawl stroke on their own and float on their back. No synchronized swimming experience is required.' },
      { q: 'What is artistic swimming?', a: 'Artistic swimming, also known as synchronized swimming, combines swimming, dance, and gymnastics into routines set to music. Campers learn the fundamentals and prepare a routine to perform for family on the last day.' },
      { q: 'What should my camper bring each day?', a: 'Swim suit, swim cap, goggles, nose clips, and a towel. Sessions run 9:00–11:00am, so a water bottle and sunscreen are smart to pack.' },
      { q: 'How do we get registered?', a: 'Tap any "Register Now" button to secure a spot, or email info@seattlesynchro.org. Spots are limited and fill quickly, so early registration helps.' },
    ],
  },
}

export function getLocation(slug: string): LocationContent | undefined {
  return LOCATIONS[slug.toLowerCase()]
}

/** Lista para enlazar todas las ciudades desde la página principal del camp. */
export const LOCATION_LIST = Object.values(LOCATIONS)
