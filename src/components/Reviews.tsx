import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import syncroParent0 from '/images/programs/reviewers/syncroparent0.webp'
import syncroParent1 from '/images/programs/reviewers/syncroparent1.webp'
import natationBoy1 from '/images/programs/reviewers/natation_boy1.webp'
import natationGirl from '/images/programs/reviewers/natation_girl.webp'
import teamAthlete from '/images/programs/reviewers/TeamAthlete.webp'

const vp = { once: true, margin: '-40px' }

interface ReviewPhoto {
  src: string
  alt: string
}

interface Review {
  name: string
  paras: string[]
  photos?: ReviewPhoto[]
}

const REVIEWS: Review[] = [
  {
    name: 'Synchro Parent',
    paras: [
      'My child joined Seattle Synchro at age 7, and now at 15, looking back on these eight years, I can say it has been one of the most rewarding experiences of our lives.',
      "Watching this team evolve has been incredible. I remember when making it to the finals was just a dream; today, the team consistently brings home medals every season. Seeing the program grow larger, stronger, and more competitive has been a point of immense pride for me as a long-term 'Synchro Mom.'",
      'For me as a parent, this journey taught me how to let go and trust my child to face her own challenges. If you are looking for a program that builds not just elite athletes, but strong, capable human beings, Seattle Synchro is the place to be.',
    ],
    photos: [
      { src: syncroParent0, alt: 'First day of synchronized swimming, 2017' },
      { src: syncroParent1, alt: 'Athlete in Seattle Synchro team jacket with a medal' },
    ],
  },
  {
    name: 'Synchro Parent',
    paras: [
      'My kids (one is a boy!) have been in Seattle synchronized swimming team for four years. My daughter first found this team when she watched Olympic Games and fell in love with this sport.',
      'This team has become an extended family to us, my kids make so many good friends, and I, as a parent, do too. Being kind, responsible, respectful, caring and working hard is the theme of this team!',
      "My kids love this sport more than before, they learn to challenge themselves and take care of the teammates, all these come from the positive environment of the Seattle synchronized swimming team!",
    ],
    photos: [
      { src: natationBoy1, alt: 'Athlete lifted out of the water at a USA Artistic Swimming meet' },
      { src: natationGirl, alt: 'Athlete posing on the pool deck in competition suit' },
    ],
  },
  {
    name: 'Team Athlete',
    paras: [
      'I joined this team when I was seven years old in 2019. At first, I was unsure of this sport, but after seeing the amazing community the coaches have invested so much time and energy in, I eventually fell in love with this sport.',
      "The coaches make sure that they act in a way that doesn't make us as athletes perceive them as robots but as humans with personality and emotion. They push us to improve while leaving space for us to have fun.",
      'Overall, I really enjoy artistic swimming and swimming with this team of amazing people!!',
    ],
    photos: [
      { src: teamAthlete, alt: 'Teammates holding their Artistic Swimming National Championship medals' },
    ],
  },
  {
    name: 'Synchro Family',
    paras: [
      "Seattle Synchro has been an incredible part of our daughter's life, and we're so grateful for the nine years our family spent in this community. From her first practices to her final competitions, the coaches and teammates created a supportive, disciplined, and inspiring environment. Seattle Synchro truly feels like family, and we're thankful for the memories and life lessons it gave her.",
    ],
  },
]

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

interface ReviewsProps {
  /** Fondo de la sección — alterna con la sección anterior de cada página */
  bg?: 'light' | 'white'
}

export function Reviews({ bg = 'light' }: ReviewsProps) {
  const [index, setIndex] = useState(0)
  const review = REVIEWS[index]

  function move(step: number) {
    setIndex((i) => (i + step + REVIEWS.length) % REVIEWS.length)
  }

  return (
    <section
      id="reviews"
      className={`p-6 md:p-12 md:px-20 md:py-24 ${bg === 'white' ? 'bg-white' : 'bg-[#f5f5f5]'}`}
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p className="font-bold text-[13px] tracking-[2.2px] uppercase text-primary/60">Reviews</p>
            <motion.h2
              id="reviews-heading"
              whileInView={{ opacity: [0, 1], x: [-40, 0] }}
              viewport={vp}
              transition={{ duration: 0.35, ease: [0.35, 0.85, 0.25, 1] }}
              className="mt-2 font-bold text-secondary text-[30px] md:text-[44px] tracking-[-2.4px] uppercase"
            >
              What Parents Say
            </motion.h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => move(-1)}
              className="size-12 rounded-full bg-white border border-secondary text-secondary flex items-center justify-center transition-colors hover:bg-secondary hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => move(1)}
              className="size-12 rounded-full bg-white border border-secondary text-secondary flex items-center justify-center transition-colors hover:bg-secondary hover:text-white"
            >
              →
            </button>
          </div>
        </div>

        <div className={`mt-10 rounded-3xl shadow-sm p-6 md:p-12 ${bg === 'white' ? 'bg-[#f5f5f5]' : 'bg-white'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.35, 0.85, 0.25, 1] }}
              className={
                review.photos?.length
                  ? `grid grid-cols-1 md:grid-cols-2 gap-10 ${review.photos.length > 1 ? 'items-start' : 'items-stretch'}`
                  : undefined
              }
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="shrink-0 size-[52px] rounded-full bg-primary text-white flex items-center justify-center font-bold text-[19px]">
                    {initialsOf(review.name)}
                  </div>
                  <p className="font-bold text-secondary text-[20px] tracking-[-0.4px]">{review.name}</p>
                </div>
                <div className="mt-2 ml-[68px] flex text-[#6FBE44] text-[19px] tracking-[2px]">★★★★★</div>
                <div className="mt-7 space-y-5">
                  {review.paras.map((para) => (
                    <p key={para} className="text-[#737373] text-[16px] md:text-[17px] leading-[29px]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {review.photos?.length ? (
                <div className={review.photos.length > 1 ? 'grid grid-cols-2 gap-5' : 'grid grid-cols-1 h-full'}>
                  {review.photos.map((photo) => (
                    <div
                      key={photo.src}
                      className={
                        review.photos!.length > 1
                          ? 'relative w-full aspect-[3/5] rounded-2xl overflow-hidden bg-[#ececf0]'
                          : 'relative w-full h-full min-h-[240px] rounded-3xl overflow-hidden bg-[#ececf0]'
                      }
                    >
                      <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.google.com/search?q=seattle+synchro&sca_esv=c2d76b9b33058453&rlz=1C1VDKB_enUS1052US1052&sxsrf=APpeQnuPw_HOrZ6TDlDsUY7Q-5kSdIpYzQ%3A1786404500535&ei=lF56av-XII6E0PEPpdLv8QY&ved=0ahUKEwj_sbetm5eWAxUOAjQIHSXpO24Q4dUDCBA&uact=5&oq=seattle+synchro&gs_lp=Egxnd3Mtd2l6LXNlcnAiD3NlYXR0bGUgc3luY2hybzIEECMYJzIEECMYJzIEECMYJzIFEAAYgAQyBRAAGIAEMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHkjqBVCTBFiTBHABeACQAQCYAWGgAawBqgEBMrgBA8gBAPgBAZgCAqACccICChAAGEcY1gQYsAOYAwCIBgGQBgSSBwMxLjGgB4AKsgcDMC4xuAdowgcDMi0yyAcKgAgB&sclient=gws-wiz-serp#lrd=0x248366a32682053f:0xe452efe5526d6780,1,,,,"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 h-14 px-10 rounded-full bg-white border border-secondary text-secondary font-bold text-[14px] tracking-[2.2px] uppercase transition-colors hover:bg-secondary hover:text-white"
          >
            See More Google Reviews →
          </a>
        </div>
      </div>
    </section>
  )
}
