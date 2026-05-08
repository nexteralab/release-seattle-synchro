import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import { CtaBanner } from '#/components/CtaBanner'
import { usePostAnalytics } from '#/hooks/use-post-analytics'
import { BlogPostContent } from './components/BlogPostContent'
import type { Post } from '#/features/admin/blogs/services/posts.service'
import {
  blurUpWithDelay,
  kenBurnsSlow,
  slideLeft,
} from '#/lib/animations'

interface Props {
  post: Post
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

      <article className="px-6 md:p-6 md:py-12 bg-white">
        <div className="max-w-screen-lg mx-auto">

          {/* Back link */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="mb-8"
          >
            <Link
              to="/team/blog"
              className="inline-flex items-center gap-2 font-bold text-[12px] tracking-[1.4px] uppercase text-[#a1a1a1] hover:text-[#0A0A67] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={blurUpWithDelay(0.05)}
              className="flex flex-wrap gap-2 mb-5"
            >
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="font-bold text-[10px] tracking-[1.4px] uppercase text-[#0A0A67] bg-[#0A0A67]/8 px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={blurUpWithDelay(0.12)}
            className="font-bold text-[#0A0A67] text-[36px] md:text-[52px] tracking-[-1.8px] uppercase leading-[1.1] mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          {post.excerpt && (
            <motion.p
              initial="hidden"
              animate="visible"
              variants={blurUpWithDelay(0.2)}
              className="text-[#737373] text-[18px] md:text-[20px] leading-[1.65] mb-8"
            >
              {post.excerpt}
            </motion.p>
          )}

          {/* Meta bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={blurUpWithDelay(0.26)}
            className="flex flex-wrap items-center gap-5 pb-8 border-b border-black/[0.08] mb-10 text-[13px] text-[#a1a1a1]"
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

          {/* Cover image — Ken Burns lento */}
          {post.cover_url && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={kenBurnsSlow}
              className="w-full h-[480px] md:h-[560px] overflow-hidden bg-[#030213] mb-12"
            >
              <img
                src={post.cover_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={blurUpWithDelay(0.35)}
          >
            <BlogPostContent html={post.content ?? ''} />
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
