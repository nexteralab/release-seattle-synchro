import { useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { Label } from '#/components/ui/label'

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
    <div className="space-y-1.5">
      <Label className="text-[11px] tracking-[1.1px] uppercase">{label}</Label>

      <div className="rounded-md border border-input bg-transparent px-3 py-2 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 transition-all">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-foreground text-[12px] font-medium px-2.5 py-0.5 rounded-[4px]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-secondary/50 hover:text-secondary transition-colors"
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
          className="w-full text-[14px] text-foreground placeholder:text-muted-foreground outline-none bg-transparent"
        />
      </div>

      <p className="text-[11px] text-muted-foreground">Press Enter or comma to add</p>
    </div>
  )
}
