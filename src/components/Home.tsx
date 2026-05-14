import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { usePublishedNews } from "#/features/team/news/hooks/use-news-posts";
import type { NewsItem } from "#/features/admin/news/services/news.service";
import { usePublishedPosts } from "#/features/team/blog/hooks/use-blog-posts";
import type { Post } from "#/features/admin/blogs/services/posts.service";

import headerImage from "/images/header.png";
import summerCampImage from "/images/hader_people.png";

import programBeginner from "/images/program_1.png";
import programRecreational from "/images/program_2.jpg";
import programCompetitive from "/images/program_3.jpg";

import sponsorSwimOutlet from "/images/sponsor_1.png";
import sponsorOoshirts from "/images/sponsor_2.png";
import sponsorPNASynchro from "/images/sponsor_3.png";
import sponsorDishedByRachel from "/images/sponsor_4.png";
import sponsorGreyCoastCrossFit from "/images/sponsor_5.png";
import sponsorThrive from "/images/sponsor_6.png";


import imageSummerCamp from "/images/image_summer_camp.jpg";
import { CoachesSpotlight } from "./CoachesSpotlight";
import { HomeAnnouncementModal } from "./HomeAnnouncementModal";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const sponsors = [
  { alt: "SwimOutlet.com", img: sponsorSwimOutlet, url: "https://www.swimoutlet.com/", number: 1 },
  { alt: "PNA Synchro", img: sponsorPNASynchro, url: "https://www.pnasynchro.org/", number: 2 },
  { alt: "Ooshirts", img: sponsorOoshirts, url: "https://ooshirts.com/", number: 3 },
  { alt: "Grey Coast CrossFit", img: sponsorGreyCoastCrossFit, url: "https://www.greycoastcrossfit.com/", number: 4 },
  { alt: "Dished by Rachel", img: sponsorDishedByRachel, url: "https://www.dishedbyrachel.com/", number: 5 },
  { alt: "Thrive", img: sponsorThrive, url: "https://www.thrivesp.com/", number: 6 },
];

export function Home() {
  return (
    <main className="">
      {/* Anuncio en home — comenta esta línea para apagarlo */}
      <HomeAnnouncementModal />

      {/* Hero */}
      <section aria-label="Hero" className="relative max-h-[80vh] min-h-[1000px] flex items-center justify-center overflow-hidden">
        <figure className="absolute inset-0 m-0">
          <img
            src={headerImage}
            alt="Piscina olímpica Seattle Synchro"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="relative z-10 w-full px-8 md:px-12 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="flex flex-col items-center md:items-start gap-6"
            >
              <div className="inline-block px-3 py-1 mb-6 bg-[#63AC2354]">
                <span className="font-bold text-white text-[14px] tracking-[1.4px] uppercase">
                  Washington - est 2001
                </span>
              </div>
              <h1 className="font-bold text-white text-[60px] md:text-[120px] tracking-[-1.8px] uppercase leading-[80px] md:leading-[100px] text-center md:text-left">
                Seattle Synchro
              </h1>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-white/90 text-[18px] md:text-[25px] max-w-2xl tracking-[-0.5px] leading-[32px] text-center md:text-left">
                  The Northwest's Premier Artistic Swimming Team.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <Link
                  to="/contact-us"
                  className="bg-white text-secondary px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:text-primary border border-secondary hover:border-primary transition-colors inline-flex items-center gap-2"
                >
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Imagen lateral */}
            <motion.figure
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="lg:flex items-center justify-center m-0 md:pt-16"
            >
              <img
                src={summerCampImage}
                alt="Nadadoras artísticas de Seattle Synchro en competencia"
                className="w-full h-auto max-w-4xl scale-[1.30]"
              />
            </motion.figure>
          </div>
        </div>

      </section>

      {/* Summer Camp */}
      <section aria-label="Summer Camp 2026" className="p-6 md:px-20 md:py-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-screen-lg mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 bg-[#63ac23]">
                <span className="font-bold text-white text-[14px] tracking-[1.4px] uppercase">
                  Limited Spots Available
                </span>
              </div>
              <h2 className="font-bold text-secondary text-[50px] md:text-[72px] tracking-[-3.6px] uppercase leading-[1] mb-6">
                Summer Camp<br />2026
              </h2>
              <p className="font-regular text-[#171717] text-[20px] leading-[32px] mb-8 max-w-lg">
                Experience the magic of artistic swimming this summer. Our intensive camp
                offers world-class coaching for all skill levels in the beautiful Pacific Northwest.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/programs/summer-camp"
                  className="inline-block bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-primary transition-colors rounded-sm"
                >
                  Learn More
                </Link>
                <a
                  href="https://www.seattlesynchrosst.com/page/system/classreg-shopping" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-white border border-secondary text-secondary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:border-primary hover:text-primary transition-colors"
                >
                  Register Now
                </a>
              </div>
            </div>
            <figure className="m-0">
              <img
                src={imageSummerCamp}
                alt="Campamento de verano de natación artística 2026"
                className="w-full h-auto border-[20px] border-[#f5f5f5]"
              />
            </figure>
          </div>
        </motion.div>
      </section>

      {/* Programs */}
      <section aria-label="Nuestros Programas" className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-screen-lg mx-auto"

        >

          <motion.div className="flex items-end justify-between mb-12 gap-4">
            <motion.h2
              className="font-bold text-secondary text-[50px] md:text-[72px] tracking-[-3.6px] uppercase leading-[72px]"
            >
              Our<br />Programs
            </motion.h2>
            <Link
              to="/programs"
              className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase hover:underline inline-flex items-center gap-2 shrink-0 pb-2"
            >
              see all <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: programBeginner,
                alt: "Programa para principiantes de natación artística",
                title: "Beginners",
                desc: "Introduction to artistic swimming for young athletes building foundational skills.",
                to: "/programs/beginner",
              },
              {
                img: programRecreational,
                alt: "Programa recreativo de natación artística",
                title: "Recreational",
                desc: "For swimmers with fundamental skills looking to advance their technique and artistry.",
                to: "/programs/recreational",
              },
              {
                img: programCompetitive,
                alt: "Programa competitivo de natación artística",
                title: "Competitive",
                desc: "Elite training for competitive swimmers aiming for national and international competitions.",
                to: "/programs/competitive",
              },
            ].map((program) => (
              <motion.article key={program.title} variants={fadeInUp} className="bg-white">
                <figure className="m-0 overflow-hidden relative">
                  <img
                    src={program.img}
                    alt={program.alt}
                    className="w-full h-120 md:h-60 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                </figure>
                <div className="p-6 md:p-8">
                  <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-4">
                    {program.title}
                  </h3>
                  <p className="font-medium text-[#737373] text-[14px] leading-[26px] mb-6 max-w-lg">
                    {program.desc}
                  </p>
                  <Link
                    to={program.to}
                    className="inline-flex items-center gap-2 font-bold text-secondary text-[12px] tracking-[1.2px] uppercase hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Latest News */}
      <LatestNewsSection />

      {/* Coaches */}
      <section aria-label="Nuestros Entrenadores" className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-screen-lg mx-auto space-y-10"
        >
          <div>
            <h2 className="font-bold text-secondary text-[50px] md:text-[72px] tracking-[-3.6px] uppercase mb-4">
              Meet Our<br />Coaches
            </h2>
            <p className="font-regular text-[20px] text-[#171717] md:text-[20px] leading-[32px] max-w-xl">
              Our coaching staff brings decades of elite experience — Olympic competitors,
              national team coaches, and lifelong artists of the water.
            </p>
          </div>
          <CoachesSpotlight />
        </motion.div>
      </section>

      {/* Sponsors */}
      <section aria-label="Patrocinadores" className="p-6 md:px-20 md:py-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-screen-lg mx-auto"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <h2 className="font-bold text-secondary text-[50px] md:text-[72px] tracking-[-3.6px] uppercase">
              Our<br />Sponsors
            </h2>
            <a
              href="https://www.seattlesynchrosst.com/page/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
            >
              Donate
            </a>
          </div>
          <SponsorsScroll sponsors={sponsors} />
        </motion.div>
      </section>

      {/* Blog */}
      <LatestBlogSection />
    </main>
  );
}

// ─── Latest News (Supabase-backed) ─────────────────────────────────────────

function fmtNewsDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

function LatestNewsSection() {
  const { data: newsList, isLoading } = usePublishedNews()

  if (isLoading) return null
  if (!newsList || newsList.length === 0) return null

  const featured = newsList[0]
  const rest = newsList.slice(1, 3)

  return (
    <section aria-label="Latest News" className="p-6 md:px-20 md:py-24 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-screen-lg mx-auto"
      >
        <div className="flex items-end justify-between mb-12 gap-4">
          <h2 className="font-bold text-secondary text-[50px] md:text-[72px] tracking-[-3.6px] uppercase leading-[1]">
            Latest<br />News
          </h2>
          <Link
            to="/team/news"
            className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase hover:underline inline-flex items-center gap-2 shrink-0 pb-2"
          >
            See All <ArrowRight size={14} />
          </Link>
        </div>

        <div className={`grid grid-cols-1 ${rest.length > 0 ? 'md:grid-cols-2' : ''} gap-8`}>
          <FeaturedNewsCard news={featured} />

          {rest.length > 0 && (
            <div className="flex flex-col gap-6">
              {rest.map((item) => (
                <SmallNewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function FeaturedNewsCard({ news }: { news: NewsItem }) {
  const label = news.category ?? news.tags?.[0]

  return (
    <Link
      to="/team/news/$slug"
      params={{ slug: news.slug }}
      className="group bg-white block"
    >
      <figure className="m-0 overflow-hidden relative">
        {news.cover_url ? (
          <img
            src={news.cover_url}
            alt={news.title}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-[#0A0A67]/10 to-[#0A0A67]/5 flex items-center justify-center">
            <span className="font-bold text-[#0A0A67]/20 text-[96px] uppercase">
              {news.title.charAt(0)}
            </span>
          </div>
        )}
        {label && (
          <div className="absolute top-4 left-4">
            <span className="bg-white px-3 py-1 font-bold text-[#171717] text-[10px] tracking-[1px] uppercase">
              {label}
            </span>
          </div>
        )}
      </figure>
      <div className="pt-6">
        {news.published_at && (
          <time
            dateTime={news.published_at}
            className="font-bold text-secondary text-[12px] tracking-[1.2px] uppercase"
          >
            {fmtNewsDate(news.published_at)}
          </time>
        )}
        <h3 className="font-bold text-secondary text-[24px] tracking-[-1.2px] mt-4 mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>
        {news.excerpt && (
          <p className="font-medium text-[#171717] text-[16px] leading-[26px] line-clamp-3">
            {news.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

function SmallNewsCard({ news }: { news: NewsItem }) {
  return (
    <Link
      to="/team/news/$slug"
      params={{ slug: news.slug }}
      className="group bg-white flex gap-6"
    >
      <figure className="m-0 shrink-0 overflow-hidden">
        {news.cover_url ? (
          <img
            src={news.cover_url}
            alt={news.title}
            className="w-32 h-32 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-32 h-32 bg-gradient-to-br from-[#0A0A67]/10 to-[#0A0A67]/5 flex items-center justify-center">
            <span className="font-bold text-[#0A0A67]/20 text-[40px] uppercase">
              {news.title.charAt(0)}
            </span>
          </div>
        )}
      </figure>
      <div className="flex-1 min-w-0">
        {news.published_at && (
          <time
            dateTime={news.published_at}
            className="font-bold text-secondary text-[12px] tracking-[1.2px] uppercase"
          >
            {fmtNewsDate(news.published_at)}
          </time>
        )}
        <h3 className="font-bold text-secondary text-[16px] tracking-[-0.8px] mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>
        {news.excerpt && (
          <p className="font-medium text-[#171717] text-[14px] leading-[22px] line-clamp-2">
            {news.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

// ─── Latest Blog (Supabase-backed) ─────────────────────────────────────────

function LatestBlogSection() {
  const { data: posts, isLoading } = usePublishedPosts()

  if (isLoading) return null
  if (!posts || posts.length === 0) return null

  const featured = posts[0]
  const rest = posts.slice(1, 3)

  return (
    <section aria-label="Blog" className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-screen-lg mx-auto"
      >
        <div className="flex items-end justify-between mb-12 gap-4">
          <h2 className="font-bold text-secondary text-[50px] md:text-[72px] tracking-[-3.6px] uppercase leading-[1]">
            Latest from<br />Our Blog
          </h2>
          <Link
            to="/team/blog"
            className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase hover:underline inline-flex items-center gap-2 shrink-0 pb-2"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className={`grid grid-cols-1 ${rest.length > 0 ? 'md:grid-cols-2' : ''} gap-8`}>
          <FeaturedPostCard post={featured} />

          {rest.length > 0 && (
            <div className="flex flex-col gap-6">
              {rest.map((p) => (
                <SmallPostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function FeaturedPostCard({ post }: { post: Post }) {
  const label = post.tags?.[0]

  return (
    <Link
      to="/team/blog/$slug"
      params={{ slug: post.slug }}
      className="group block"
    >
      <figure className="m-0 overflow-hidden relative bg-white">
        {post.cover_url ? (
          <img
            src={post.cover_url}
            alt={post.title}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-[#0A0A67]/10 to-[#0A0A67]/5 flex items-center justify-center">
            <span className="font-bold text-[#0A0A67]/20 text-[96px] uppercase">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
        {label && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#0A0A67] text-white px-3 py-1 font-bold text-[10px] tracking-[1px] uppercase">
              {label}
            </span>
          </div>
        )}
      </figure>
      <div className="pt-6">
        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="font-bold text-secondary text-[12px] tracking-[1.2px] uppercase"
          >
            {fmtNewsDate(post.published_at)}
          </time>
        )}
        <h3 className="font-bold text-secondary text-[24px] tracking-[-1.2px] mt-4 mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-medium text-[#171717] text-[16px] leading-[26px] line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="inline-flex items-center gap-2 mt-4 font-bold text-secondary text-[12px] tracking-[1.2px] uppercase group-hover:gap-3 transition-all">
          Read More
          <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}

function SmallPostCard({ post }: { post: Post }) {
  const label = post.tags?.[0]

  return (
    <Link
      to="/team/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex gap-6"
    >
      <figure className="m-0 shrink-0 overflow-hidden bg-white">
        {post.cover_url ? (
          <img
            src={post.cover_url}
            alt={post.title}
            className="w-32 h-32 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-32 h-32 bg-gradient-to-br from-[#0A0A67]/10 to-[#0A0A67]/5 flex items-center justify-center">
            <span className="font-bold text-[#0A0A67]/20 text-[40px] uppercase">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
      </figure>
      <div className="flex-1 min-w-0">
        {label && (
          <span className="inline-block font-bold text-[#0A0A67] text-[10px] tracking-[1px] uppercase mb-1">
            {label}
          </span>
        )}
        <h3 className="font-bold text-secondary text-[16px] tracking-[-0.8px] mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-medium text-[#171717] text-[14px] leading-[22px] line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}

// ─── Sponsors horizontal scroll with mobile hint ───────────────────────────

type Sponsor = { alt: string; img: string; url: string; number: number }

function SponsorsScroll({ sponsors }: { sponsors: Sponsor[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => setHintVisible(el.scrollLeft < 24)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative">
      <ul
        ref={ref}
        className="flex overflow-x-auto gap-4 px-2 py-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:py-0 items-center list-none p-0 scrollbar-none"
      >
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.alt}
            className={`flex-shrink-0 flex items-center justify-center p-4 w-[200px] md:w-auto ${sponsor.number % 2 === 0 ? "order-2" : "order-1"}`}
          >
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center p-4 rounded-lg transition-all duration-300 hover:bg-[#f5f5f5]"
            >
              <img
                src={sponsor.img}
                alt={sponsor.alt}
                className="w-full max-h-[100px] md:max-h-[120px] object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
              <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ExternalLink size={14} className="text-[#0A0A67]" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Scroll hint — mobile only, desaparece al hacer swipe */}
      <div
        className={`
          pointer-events-none absolute inset-y-0 right-0 w-20
          bg-gradient-to-l from-white via-white/60 to-transparent
          flex items-center justify-end pr-2
          transition-opacity duration-300
          md:hidden
          ${hintVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        >
          <ChevronRight size={20} className="text-[#0A0A67]" />
        </motion.div>
      </div>
    </div>
  )
}
