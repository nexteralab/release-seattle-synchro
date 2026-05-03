import { Heart, Users, CheckSquare, TrendingUp, Zap, Shield, Smile, Star, Gift, Leaf } from 'lucide-react'

const values = [
  { icon: <Heart size={18} />, name: 'Respect', description: 'for self and others' },
  { icon: <Users size={18} />, name: 'Teamwork', description: 'work together to achieve a common goal' },
  { icon: <CheckSquare size={18} />, name: 'Commitment', description: 'abide by the club\'s codes of conduct' },
  { icon: <TrendingUp size={18} />, name: 'Perseverance', description: 'working hard, overcoming challenges, and finishing what is started' },
  { icon: <Zap size={18} />, name: 'Proactivity', description: 'to take initiative' },
  { icon: <Shield size={18} />, name: 'Courage', description: 'strength to handle challenges' },
  { icon: <Smile size={18} />, name: 'Authenticity', description: 'intentional and kind connection' },
  { icon: <Star size={18} />, name: 'Joy', description: 'contentment and enjoyment while practicing artistic swimming' },
  { icon: <Star size={18} />, name: 'Pride', description: 'being proud of Seattle Synchro' },
  { icon: <Gift size={18} />, name: 'Gratitude', description: 'appreciation for the opportunity to be a part of something bigger than yourself' },
  { icon: <Leaf size={18} />, name: 'Stewardship', description: 'keeps our environment clean and neat; promotes good sportsmanship and social responsibility' },
]

export function AboutUsValues() {
  return (
    <section className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="values-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-13 rounded-full bg-secondary flex items-center justify-center shrink-0 p-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h2
            id="values-heading"
            className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.2px] uppercase"
          >
            Values
          </h2>
        </div>
        <p className="text-secondary text-[16px] leading-[26px] mb-10">
          Seattle Synchro's team values are:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {values.map((value, i) => (
            <div
              key={i}
              className="border-l-4 border-secondary p-5 bg-white flex flex-row gap-2"
            >
              <div className="text-secondary mb-1">{value.icon}</div>
              <div className="flex flex-col items-start gap-2">
                <p className="font-bold text-secondary text-[11px] tracking-[1.2px] uppercase">
                  {value.name}
                </p>
                <p className="text-[#737373] text-[13px] leading-[20px]">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
