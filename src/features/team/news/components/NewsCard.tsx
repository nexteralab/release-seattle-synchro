import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { Clock, User } from 'lucide-react'
import type { NewsItem } from '#/features/admin/news/services/news.service'

interface Props {
  news: NewsItem
  index?: number
}

function fmtDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function NewsCard({ news, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        to="/team/news/$slug"
        params={{ slug: news.slug }}
        className="group block bg-white overflow-hidden hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
      >
        {/* Cover */}
        <div className="aspect-[16/9] overflow-hidden bg-[#ececf0]">
          {news.cover_url ? (
            <img
              src={news.cover_url}
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0A0A67]/10 to-[#0A0A67]/5 flex items-center justify-center">
              <span className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67]/20 text-[48px] uppercase">
                {news.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category + Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {news.category && (
              <span className="font-['Space_Grotesk',sans-serif] font-bold text-[10px] tracking-[1.4px] uppercase text-white bg-[#0A0A67] px-2.5 py-1">
                {news.category}
              </span>
            )}
            {news.tags?.slice(0, news.category ? 1 : 2).map(tag => (
              <span
                key={tag}
                className="font-['Space_Grotesk',sans-serif] font-bold text-[10px] tracking-[1.4px] uppercase text-[#0A0A67] bg-[#0A0A67]/8 px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67] text-[20px] tracking-[-0.5px] leading-[1.3] mb-3 group-hover:text-[#0A0A67]/80 transition-colors line-clamp-2">
            {news.title}
          </h2>

          {/* Excerpt */}
          {news.excerpt && (
            <p className="font-['Inter',sans-serif] text-[#737373] text-[14px] leading-[22px] mb-4 line-clamp-2">
              {news.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-[12px] text-[#a1a1a1] font-['Inter',sans-serif] pt-3 border-t border-black/[0.06]">
            {news.author && (
              <span className="flex items-center gap-1.5">
                <User size={11} />
                {news.author}
              </span>
            )}
            <span>{fmtDate(news.published_at)}</span>
            {news.read_time_minutes && (
              <span className="flex items-center gap-1.5 ml-auto">
                <Clock size={11} />
                {news.read_time_minutes} min read
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
