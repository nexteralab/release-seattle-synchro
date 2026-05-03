import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { Clock, User, ArrowRight } from 'lucide-react'
import { usePublishedNews } from './hooks/use-news-posts'
import type { NewsItem } from '#/features/admin/news/services/news.service'
import { SubscribeForm } from '#/features/subscriptions/components/SubscribeForm'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
}

function fmtDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

// ── Skeletons ─────────────────────────────────────────────
function SkeletonFeatured() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
      <div className="w-full h-[500px] bg-[#ececf0]" />
      <div className="space-y-4">
        <div className="h-3 w-24 bg-[#ececf0]" />
        <div className="h-10 w-full bg-[#ececf0]" />
        <div className="h-10 w-3/4 bg-[#ececf0]" />
        <div className="h-3 w-48 bg-[#ececf0]" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full bg-[#ececf0]" />
          <div className="h-4 w-full bg-[#ececf0]" />
          <div className="h-4 w-2/3 bg-[#ececf0]" />
        </div>
        <div className="h-12 w-40 bg-[#ececf0] mt-4" />
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white overflow-hidden animate-pulse">
      <div className="h-[300px] bg-[#ececf0]" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-20 bg-[#ececf0]" />
        <div className="h-5 w-full bg-[#ececf0]" />
        <div className="h-5 w-3/4 bg-[#ececf0]" />
        <div className="h-3 w-full bg-[#ececf0]" />
        <div className="h-3 w-2/3 bg-[#ececf0]" />
      </div>
    </div>
  )
}

// ── Featured news ──────────────────────────────────────────
function FeaturedNews({ news }: { news: NewsItem }) {
  const label = news.category ?? news.tags?.[0]

  return (
    <section className="p-6 md:p-12 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="inline-block px-3 py-1 mb-8 bg-[#0A0A67]">
          <span className="font-bold text-white text-[11px] tracking-[1.4px] uppercase">
            Latest News
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden">
            {news.cover_url ? (
              <img
                src={news.cover_url}
                alt={news.title}
                className="w-full h-[500px] object-cover"
              />
            ) : (
              <div className="w-full h-[500px] bg-gradient-to-br from-[#0A0A67]/10 to-[#0A0A67]/5 flex items-center justify-center">
                <span className="font-bold text-[#0A0A67]/20 text-[96px] uppercase">
                  {news.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {label && (
              <span className="font-bold text-[#0A0A67] text-[12px] tracking-[1.4px] uppercase">
                {label}
              </span>
            )}
            <h2 className="font-bold text-[#0A0A67] text-[40px] md:text-[48px] tracking-[-2px] uppercase leading-[1.05] mt-4 mb-6">
              {news.title}
            </h2>

            <div className="flex items-center gap-4 mb-6 text-[#737373] text-[14px]">
              {news.author && (
                <span className="flex items-center gap-1.5">
                  <User size={13} />
                  {news.author}
                </span>
              )}
              {news.published_at && <span>{fmtDate(news.published_at)}</span>}
              {news.read_time_minutes && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {news.read_time_minutes} min
                </span>
              )}
            </div>

            {news.excerpt && (
              <p className="text-[#171717] text-[18px] leading-[29px] mb-8">
                {news.excerpt}
              </p>
            )}

            <Link
              to="/team/news/$slug"
              params={{ slug: news.slug }}
              className="inline-block bg-[#021521] text-white px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-[#0A0A67] transition-colors"
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Grid card ──────────────────────────────────────────────
function NewsCard({ news, index }: { news: NewsItem; index: number }) {
  const label = news.category ?? news.tags?.[0]

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeInUp}
      transition={{ delay: index * 0.08 }}
      className="bg-white overflow-hidden group cursor-pointer"
    >
      <Link to="/team/news/$slug" params={{ slug: news.slug }}>
        {/* Image */}
        <div className="relative h-[300px] overflow-hidden bg-[#ececf0]">
          {news.cover_url ? (
            <img
              src={news.cover_url}
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0A0A67]/10 to-[#0A0A67]/5 flex items-center justify-center">
              <span className="font-bold text-[#0A0A67]/20 text-[64px] uppercase">
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
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-[#737373] text-[12px]">
            {news.published_at && <span>{fmtDate(news.published_at)}</span>}
            {news.author && (
              <>
                <span>•</span>
                <span>{news.author}</span>
              </>
            )}
          </div>

          <h3 className="font-bold text-[#171717] text-[22px] tracking-[-0.8px] uppercase leading-[1.2] mb-4 group-hover:text-[#0A0A67] transition-colors line-clamp-2">
            {news.title}
          </h3>

          {news.excerpt && (
            <p className="text-[#737373] text-[14px] leading-[22px] mb-6 line-clamp-2">
              {news.excerpt}
            </p>
          )}

          <span className="inline-flex items-center gap-2 font-bold text-[#171717] text-[12px] tracking-[1.2px] uppercase group-hover:gap-3 transition-all">
            Read More
            <ArrowRight size={12} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

// ── Page ──────────────────────────────────────────────────
export function NewsListPage() {
  const { data: newsList, isLoading, isError } = usePublishedNews()

  const featured = newsList?.[0] ?? null
  const rest = newsList?.slice(1) ?? []

  return (
    <div className="w-full">

      {/* Hero */}
      <section className="py-24 px-12 md:px-48 bg-gradient-to-br from-[#0A0A67] to-[#021521]">
        <div className="max-w-screen-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold text-white text-[64px] md:text-[72px] tracking-[-3.6px] uppercase leading-[1] mb-6"
          >
            Seattle Synchro<br />News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-medium text-white/80 text-[20px] md:text-[24px] tracking-[-0.6px] leading-[32px] max-w-3xl mx-auto"
          >
            Competition results, events and the latest announcements from our team
          </motion.p>
        </div>
      </section>

      {/* Error */}
      {isError && (
        <div className="py-12 px-12 md:px-48 bg-white text-center">
          <p className="text-[#737373] text-[16px]">
            Could not load news. Please try again later.
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <>
          <section className="py-12 px-12 md:px-48 bg-white">
            <div className="max-w-screen-2xl mx-auto">
              <SkeletonFeatured />
            </div>
          </section>
          <section className="py-12 px-12 md:px-48 bg-[#f5f5f5]">
            <div className="max-w-screen-2xl mx-auto">
              <div className="h-10 w-64 bg-[#ececf0] animate-pulse mb-16" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Empty */}
      {!isLoading && !isError && newsList?.length === 0 && (
        <section className="py-12 px-12 md:px-48 bg-white text-center">
          <p className="font-bold text-[#0A0A67] text-[28px] tracking-[-0.8px] uppercase mb-3">
            Coming Soon
          </p>
          <p className="text-[#737373] text-[16px]">
            We're working on our first announcements. Check back soon!
          </p>
        </section>
      )}

      {/* Featured */}
      {!isLoading && !isError && featured && (
        <FeaturedNews news={featured} />
      )}

      {/* Grid */}
      {!isLoading && !isError && rest.length > 0 && (
        <section className="py-12 px-12 md:px-48 bg-[#f5f5f5]">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="font-bold text-[#0A0A67] text-[40px] md:text-[48px] tracking-[-2.4px] uppercase mb-16">
              Recent News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((item, i) => (
                <NewsCard key={item.id} news={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 px-12 md:px-48 bg-[#202124]">
        <div className="max-w-screen-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-bold text-white text-[40px] md:text-[48px] tracking-[-2.4px] uppercase mb-6"
          >
            Stay Updated
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/70 text-[18px] md:text-[20px] leading-[32px] mb-8 max-w-2xl mx-auto"
          >
            Never miss a competition result or team announcement. Subscribe to stay in the loop.
          </motion.p>
          <SubscribeForm source="news" />
        </div>
      </section>

    </div>
  )
}
