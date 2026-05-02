import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import { CtaBanner } from '#/components/CtaBanner'
import { usePostAnalytics } from '#/hooks/use-post-analytics'
import { BlogPostContent } from './components/BlogPostContent'
import type { Post } from '#/features/admin/blogs/services/posts.service'

interface Props {
  post: Post
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

export function BlogPostPage({ post }: Props) {
  usePostAnalytics(post.id, 'blog')

  return (
    <div className="w-full bg-white">

      {/* Cover image */}
      <div className="w-full max-w-screen-lg mx-auto">

      </div>

      {/* Article */}
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
              to="/blog"
              className="inline-flex items-center gap-2 font-['Space_Grotesk',sans-serif] font-bold text-[12px] tracking-[1.4px] uppercase text-[#a1a1a1] hover:text-[#0A0A67] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-5"
            >
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="font-['Space_Grotesk',sans-serif] font-bold text-[10px] tracking-[1.4px] uppercase text-[#0A0A67] bg-[#0A0A67]/8 px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-['Space_Grotesk',sans-serif] font-bold text-[#0A0A67] text-[36px] md:text-[52px] tracking-[-1.8px] uppercase leading-[1.1] mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          {post.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-['Inter',sans-serif] text-[#737373] text-[18px] md:text-[20px] leading-[1.65] mb-8"
            >
              {post.excerpt}
            </motion.p>
          )}

          {/* Meta bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center gap-5 pb-8 border-b border-black/[0.08] mb-10 font-['Inter',sans-serif] text-[13px] text-[#a1a1a1]"
          >
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} />
                <span className="text-[#737373] font-medium">{post.author}</span>
              </span>
            )}
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {fmtDate(post.published_at)}
              </span>
            )}
            {post.read_time_minutes && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.read_time_minutes} min read
              </span>
            )}
          </motion.div>

          {post.cover_url && (
            <div className="w-full h-[480px] md:h-[560px] overflow-hidden bg-[#030213]">
              <motion.img
                initial={{ scale: 1.05, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                src={post.cover_url}
                alt={post.title}
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
              <BlogPostContent html={post.content ?? ''} />
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
