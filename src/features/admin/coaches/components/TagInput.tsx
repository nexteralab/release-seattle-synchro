import { useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'

interface Props {
  label: string
  placeholder?: string
  tags: string[]
  onChange: (tags: string[]) => void
}

export function TagInput({ label, placeholder = 'Type and press Enter', tags, onChange }: Props) {
  const [input, setInput] = useState('')

  function addTag() {
    const val = input.trim()
    if (val && !tags.includes(val)) {
      onChange([...tags, val])
    }
    setInput('')
  }

  function removeTag(tag: string) {
    onChange(tags.filter(t => t !== tag))
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
    if (e.key === 'Backspace' && !input && tags.length) {
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div>
      <label className="block font-bold text-[#171717] text-[11px] tracking-[1.1px] uppercase mb-1.5">
        {label}
      </label>
      <div className="border border-black/[0.12] rounded-[6px] px-3 py-2 focus-within:border-[#0A0A67] focus-within:ring-1 focus-within:ring-[#0A0A67]/20 transition-all">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-[#0A0A67]/8 text-[#0A0A67] text-[12px] font-medium px-2.5 py-1 rounded-[4px]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-[#0A0A67]/50 hover:text-[#0A0A67] transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X size={11} strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </div>
        )}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={addTag}
          placeholder={tags.length ? '' : placeholder}
          className="w-full text-[14px] text-[#171717] placeholder:text-[#a1a1a1] outline-none bg-transparent"
        />
      </div>
      <p className="text-[11px] text-[#a1a1a1] mt-1">Press Enter or comma to add</p>
    </div>
  )
}
