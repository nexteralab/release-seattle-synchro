import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import { CtaBanner } from '#/components/CtaBanner'
import { usePostAnalytics } from '#/hooks/use-post-analytics'
import { NewsPostContent } from './components/NewsPostContent'
import type { NewsItem } from '#/features/admin/news/services/news.service'

interface Props {
  news: NewsItem
}

const vp = { once: true, margin: '-40px' } as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function fmtDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function NewsPostPage({ news }: Props) {
  usePostAnalytics(news.id, 'news')

  return (
    <div className="w-full bg-white">

      <article className="px-6 md:p-6 md:py-12 bg-white">
        <div className="max-w-screen-lg mx-auto">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/team/news"
              className="inline-flex items-center gap-2 font-['Space_Grotesk',sans-serif] font-bold text-[12px] tracking-[1.4px] uppercase text-[#a1a1a1] hover:text-[#0A0A67] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to News
            </Link>
          </motion.div>

          {/* Category + Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {news.category && (
              <span className="font-['Space_Grotesk',sans-serif] font-bold text-[10px] tracking-[1.4px] uppercase text-white bg-[#0A0A67] px-3 py-1.5">
                {news.category}
              </span>
            )}
            {news.tags?.map(tag => (
              <span
                key={tag}
                className="font-['Space_Grotesk',sans-serif] font-bold text-[10px] tracking-[1.4px] uppercase text-[#0A0A67] bg-[#0A0A67]/8 px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67] text-[36px] md:text-[52px] tracking-[-1.8px] uppercase leading-[1.1] mb-6"
          >
            {news.title}
          </motion.h1>

          {/* Excerpt */}
          {news.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-['Inter',sans-serif] text-[#737373] text-[18px] md:text-[20px] leading-[1.65] mb-8"
            >
              {news.excerpt}
            </motion.p>
          )}

          {/* Meta bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center gap-5 pb-8 border-b border-black/[0.08] mb-10 font-['Inter',sans-serif] text-[13px] text-[#a1a1a1]"
          >
            {news.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} />
                <span className="text-[#737373] font-medium">{news.author}</span>
              </span>
            )}
            {news.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {fmtDate(news.published_at)}
              </span>
            )}
            {news.read_time_minutes && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {news.read_time_minutes} min read
              </span>
            )}
          </motion.div>

          {/* Cover */}
          {news.cover_url && (
            <div className="w-full h-[480px] md:h-[560px] overflow-hidden bg-[#030213] mb-10">
              <motion.img
                initial={{ scale: 1.05, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                src={news.cover_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <NewsPostContent html={news.content ?? ''} />
            </motion.div>
          </motion.div>

        </div>
      </article>

      <CtaBanner
        heading="Join Our Team"
        description="Inspired by what you've read? Come swim with Seattle Synchro and be part of our story."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        image="1"
        alt="Join the Seattle Synchro team"
      />
    </div>
  )
}
