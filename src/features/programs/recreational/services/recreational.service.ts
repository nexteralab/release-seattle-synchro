import { getConfig } from '#/features/programs/config.service'
import type { RecreationalData, RecreationalProgram } from '../types'

export const RECREATIONAL_DEFAULTS: RecreationalData = {
  hero: {
    image: '',
    alt: 'Recreational artistic swimming class in the pool, kids smiling',
  },
  overview: {
    title: 'Recreational Artistic Swimming Programs',
    subtitle: 'Non-competitive programs designed for fun, fitness, and skill development',
    body:
      'Designed for swimmers ages 5–10, this non-competitive program builds a strong foundation in **artistic swimming**, the Olympic sport also known as **synchronized swimming**, through fun, fitness, and progressive skill development. There are no judges, no scores, and no pressure to win. Instead, the focus is on movement, music, teamwork, and having a good time in the water. It is the perfect starting point for young athletes who dream of one day joining a competitive team.',
  },
  program: {
    name: 'Sharks & Mermaids',
    ages: '5–10',
    coach: 'Sophie Lin & Daniela Garmendia',
    workout_days_times: 'Saturdays 11:00am – 11:50am',
    schedule_note: 'No class Friday May 15th. Last class June 5th.',
    duration: '',
    cost: '$50 registration fee + $60 March dues',
    cost_note:
      'Pool fees should be covered through one payment to the booster club (approximately $280)',
    description:
      'These classes are designed for swimmers who have mastered crawl stroke, breaststroke and backstroke. They should be comfortable floating on their back and swimming independently.',
    register_label: 'Register Now',
    register_url: 'https://www.seattlesynchrosst.com/page/system/classreg-shopping',
    skills_title: 'Required Swimming Skills',
    skills: [
      'Swimmers must be safe in water and swim independently',
      '2 laps of crawl',
      '2 laps of breaststroke',
      '1 lap of backstroke',
      'Float on back independently for 10 seconds',
      'Tread water for 20 seconds',
    ],
  },
  classLook: {
    title: 'What a Class Actually Looks Like',
    pills: ['No Tryout', 'No Judges', 'No Scores', 'No Pressure to Win'],
    intro:
      'Recreational artistic swimming is about building skills and confidence in a low pressure environment. Swimmers work on real technique, then put it to music with their friends.',
    items: [
      { lead: 'Sculling and floating.', rest: 'The foundation of every artistic swimming position.' },
      { lead: 'Treading water techniques.', rest: 'Strength and control, not just staying afloat.' },
      { lead: 'Body control and breath holding.', rest: 'Real athletic skills that carry over to any sport.' },
      { lead: 'Simple synchronized patterns.', rest: 'Group routines set to music.' },
    ],
    callout:
      'Recreational does not mean not serious. The difference is the goal: enjoyment and skill building instead of competition results.',
  },
  whoFor: {
    title: 'Who Is It For?',
    items: [
      { lead: 'Kids who love to swim but are not interested in competing.', rest: 'The water is the point, not the medal.' },
      { lead: 'Beginners who want to try something new and creative.', rest: 'Artistic swimming adds expression to skills they already have.' },
      { lead: 'Swimmers who enjoy performing and teamwork,', rest: 'without the pressure of meets.' },
      { lead: 'Families looking for a fun alternative', rest: 'to the typical kids swimming lessons Seattle families are used to.' },
    ],
  },
  gymnasticsFit: {
    kicker: 'A Perfect Fit',
    title: 'Does Your Child Do Gymnastics or Dance?',
    inputs: ['Swimming', 'Dance', 'Gymnastics'],
    result: '= Artistic Swimming',
    body:
      'Artistic swimming is the only sport that combines all three. Gymnasts and dancers arrive with exactly the skills we build on: flexibility, body awareness, rhythm, and the discipline to drill a routine until it is clean.',
    items: [
      { lead: 'Everything transfers.', rest: 'Splits, extensions, pointed toes, counting music. Same vocabulary, different element.' },
      { lead: 'Much gentler on the body.', rest: 'No impact landings and no hard mats.' },
      { lead: 'A real team sport.', rest: 'The routine only works if everyone moves together.' },
      { lead: 'Choreography they already understand.', rest: 'Learning a routine is familiar ground for a dancer or gymnast.' },
    ],
  },
  comparison: {
    title: 'Recreational vs. Competitive',
    intro:
      'Not sure which path fits your family? Both are completely valid. There is no right way to enjoy the sport.',
    recreationalLabel: 'Recreational',
    competitiveLabel: 'Competitive',
    rows: [
      { label: 'Main goal', recreational: 'Enjoyment and skill building', competitive: 'Competition results' },
      { label: 'Judges & scores', recreational: 'None', competitive: 'Yes, judged meets' },
      { label: 'Ages', recreational: '5 to 10', competitive: '6 to 11 (Novice)' },
      { label: 'Tryout required', recreational: 'No', competitive: 'Yes' },
      { label: 'Practices per week', recreational: '1', competitive: '3 or more' },
      { label: 'Program length', recreational: '8 sessions', competitive: 'Year round' },
    ],
    footerLabel: 'Can move up later',
    footerText:
      'Yes. Many competitive synchronized swimmers started in a recreational program. Others stay recreational for years simply because they love it.',
  },
  summerCampFit: {
    title: 'A Great Fit for Summer Camp',
    intro:
      'Because it is playful, social, and does not require prior experience, artistic swimming is a natural fit for summer programs. A summer swim camp Seattle kids attend with us might include:',
    highlights: [
      'Basic artistic swimming skills like sculling and floating',
      'Simple group routines set to music',
      'Games that build water confidence',
      'A fun, low stakes end of week showcase for family and friends',
    ],
    outro:
      'It is a great way for kids to try something new during summer break, make friends, and stay active in the water, all without the commitment of a competitive season.',
    ctaLabel: 'Explore Summer Camp',
  },
  faq: {
    title: 'Common Questions Parents Ask',
    items: [
      {
        question: 'Is artistic swimming the same as synchronized swimming?',
        answer:
          'Yes. Artistic swimming is the current official name for the Olympic sport most people still know as synchronized swimming, or sometimes water ballet. We use both terms, it is the same sport.',
      },
      {
        question: 'Does my child need swim team experience?',
        answer:
          'No. Many recreational swimmers are trying artistic swimming for the very first time. What she does need are the swimming skills listed above: crawl stroke, breaststroke, backstroke, and comfort floating and swimming on her own.',
      },
      {
        question: 'Is it safe for beginners?',
        answer:
          "Yes. Instructors tailor each class to the swimmers' comfort and skill level, and safety always comes first.",
      },
      {
        question: 'My daughter does gymnastics. Would this be a good fit?',
        answer:
          'It is one of the best fits there is. Artistic swimming blends swimming, dance and gymnastics, so flexibility, body awareness and rhythm transfer directly. It is also much lower impact than tumbling.',
      },
      {
        question: 'Does recreational mean not serious?',
        answer:
          'Not at all. Recreational swimmers learn real skills: body control, breath holding, treading water, and basic synchronized patterns. The difference is the goal. Recreational programs prioritize enjoyment and skill building over competition results.',
      },
      {
        question: 'Can recreational swimmers move to competitive teams later?',
        answer:
          'Absolutely. Many competitive synchronized swimmers actually started out in a recreational program before deciding to pursue the sport more seriously. Some kids stick with the recreational track for years simply because they love it. Either path is completely valid.',
      },
      {
        question: 'Does she need to try out?',
        answer:
          'No. There is no tryout for our recreational programs. As long as she meets the swimming skills listed above, she can register directly. Tryouts are only for the competitive team.',
      },
      {
        question: 'What does my child need to bring?',
        answer: 'A swimsuit, a swim cap, goggles, nose clips and a towel.',
      },
    ],
    blogLead: 'Want the full picture?',
    blogLabel: 'Read our blog: What Recreational Artistic Swimming Looks Like →',
  },
  banner: {
    heading: 'Ready to Join?',
    description:
      'Sign up for one of our recreational programs and discover the joy of artistic swimming.',
    contactLabel: 'Contact Us',
    image: '3',
  },
}

/** Lo que puede haber guardado: el shape nuevo (`content`) o el viejo (`sub_programs`). */
interface Stored {
  content?: Partial<RecreationalData>
  sub_programs?: (Partial<RecreationalProgram> & { id?: string })[]
}

/** Rellena lo que falte sección por sección y migra al vuelo el shape viejo. */
function withDefaults(stored: Stored | null): RecreationalData {
  const c = stored?.content ?? {}
  const d = RECREATIONAL_DEFAULTS
  const { id: _id, ...legacy } = stored?.sub_programs?.find(p => p.id === 'sharks-mermaids') ?? {}
  return {
    hero: { ...d.hero, ...c.hero },
    overview: { ...d.overview, ...c.overview },
    program: { ...d.program, ...legacy, ...c.program },
    classLook: { ...d.classLook, ...c.classLook },
    whoFor: { ...d.whoFor, ...c.whoFor },
    gymnasticsFit: { ...d.gymnasticsFit, ...c.gymnasticsFit },
    comparison: { ...d.comparison, ...c.comparison },
    summerCampFit: { ...d.summerCampFit, ...c.summerCampFit },
    faq: { ...d.faq, ...c.faq },
    banner: { ...d.banner, ...c.banner },
  }
}

export async function getRecreationalData(): Promise<RecreationalData> {
  return withDefaults(await getConfig<Stored>('recreational'))
}
