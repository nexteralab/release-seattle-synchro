interface Props {
  html: string
}

export function BlogPostContent({ html }: Props) {
  return (
    <div
      className={[
        'font-["Inter",sans-serif] text-[#171717] text-[17px] leading-[30px]',

        // Headings
        '[&_h1]:font-["Space_Grotesk",sans-serif] [&_h1]:font-bold [&_h1]:text-[#0A0A67] [&_h1]:text-[36px] [&_h1]:tracking-[-1.2px] [&_h1]:uppercase [&_h1]:leading-tight [&_h1]:mt-10 [&_h1]:mb-4',
        '[&_h2]:font-["Space_Grotesk",sans-serif] [&_h2]:font-bold [&_h2]:text-[#0A0A67] [&_h2]:text-[26px] [&_h2]:tracking-[-0.8px] [&_h2]:uppercase [&_h2]:leading-tight [&_h2]:mt-10 [&_h2]:mb-3',
        '[&_h3]:font-["Space_Grotesk",sans-serif] [&_h3]:font-bold [&_h3]:text-[#171717] [&_h3]:text-[20px] [&_h3]:tracking-[-0.4px] [&_h3]:mt-8 [&_h3]:mb-2',
        '[&_h4]:font-["Space_Grotesk",sans-serif] [&_h4]:font-bold [&_h4]:text-[#171717] [&_h4]:text-[16px] [&_h4]:mt-6 [&_h4]:mb-2',

        // Paragraphs
        '[&_p]:text-[#737373] [&_p]:mb-5 [&_p]:leading-[30px]',

        // Lists
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-1.5',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-1.5',
        '[&_li]:text-[#737373] [&_li]:leading-[26px]',

        // Links
        '[&_a]:text-[#0A0A67] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[#0A0A67]/30 [&_a]:hover:decoration-[#0A0A67] [&_a]:transition-all',

        // Blockquote
        '[&_blockquote]:border-l-4 [&_blockquote]:border-[#0A0A67] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#737373] [&_blockquote]:my-8 [&_blockquote]:text-[18px]',

        // Code
        '[&_code]:bg-[#f3f3f5] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[14px] [&_code]:font-mono [&_code]:text-[#171717]',
        '[&_pre]:bg-[#f3f3f5] [&_pre]:p-5 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:text-[14px] [&_pre]:leading-[22px]',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',

        // Media
        '[&_img]:w-full [&_img]:rounded-lg [&_img]:my-8 [&_img]:shadow-sm',
        '[&_figure]:my-8',
        '[&_figcaption]:text-center [&_figcaption]:text-[#a1a1a1] [&_figcaption]:text-[13px] [&_figcaption]:mt-2',

        // Divider
        '[&_hr]:border-[#ececf0] [&_hr]:my-10',

        // Tables
        '[&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-[15px]',
        '[&_th]:border [&_th]:border-[#ececf0] [&_th]:bg-[#f5f5f5] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-bold [&_th]:text-[#171717] [&_th]:text-[13px] [&_th]:tracking-[0.3px]',
        '[&_td]:border [&_td]:border-[#ececf0] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[#737373]',
        '[&_tr:hover_td]:bg-[#f5f5f5]/50',

        // Strong / em
        '[&_strong]:font-bold [&_strong]:text-[#171717]',
        '[&_em]:italic',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
