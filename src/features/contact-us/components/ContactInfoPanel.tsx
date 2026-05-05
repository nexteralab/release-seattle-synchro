import { Mail, Phone, Clock } from 'lucide-react'

const OFFICE_HOURS = [
  { day: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
]

export function ContactInfoPanel() {
  return (
    <div className="space-y-4">
      <ContactCard
        icon={<Mail size={18} strokeWidth={1.75} />}
        label="Email"
        lines={['info@seattlesynchrosst.com']}
        href="mailto:info@seattlesynchrosst.com"
      />
      <ContactCard
        icon={<Phone size={18} strokeWidth={1.75} />}
        label="Phone"
        lines={['(206) 555-0192']}
        href="tel:+12065550192"
      />
      <div className="bg-white p-6 space-y-4">
        <div className="flex items-center gap-3 text-[#0A0A67]">
          <Clock size={18} strokeWidth={1.75} />
          <span
            className="font-bold text-[13px] tracking-[1.3px] uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Office Hours
          </span>
        </div>
        <div className="divide-y divide-black/[0.06]">
          {OFFICE_HOURS.map(({ day, hours }) => (
            <div key={day} className="flex justify-between py-3">
              <span
                className="text-[#171717] text-[14px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {day}
              </span>
              <span
                className={`text-[14px] font-medium ${hours === 'Closed' ? 'text-[#d4183d]' : 'text-[#0A0A67]'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactCard({
  icon,
  label,
  lines,
  href,
}: {
  icon: React.ReactNode
  label: string
  lines: string[]
  href: string
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-4 bg-white p-6 hover:shadow-md transition-shadow group"
    >
      <span className="text-[#0A0A67] mt-0.5">{icon}</span>
      <div>
        <p
          className="font-bold text-[13px] tracking-[1.3px] uppercase text-[#0A0A67] mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {label}
        </p>
        {lines.map((line) => (
          <p
            key={line}
            className="text-[#737373] text-[15px] group-hover:text-[#0A0A67] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {line}
          </p>
        ))}
      </div>
    </a>
  )
}
