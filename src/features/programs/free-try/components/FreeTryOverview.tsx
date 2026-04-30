import type { FreeTryData } from '../types'

const LOCATION_IMAGE =
  'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltJTIwdGVubmlzJTIwY2x1YiUyMGFlcmlhbHxlbnwxfHx8fDE3NzUxNzY0NTR8MA&ixlib=rb-4.1.0&q=80&w=800'

interface Props {
  data: FreeTryData
}

export function FreeTryOverview({ data }: Props) {
  return (
    <section id="details" className="p-12 md:px-20 md:py-24 bg-white" aria-labelledby="freetry-overview-heading">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <div>
            <h2
              id="freetry-overview-heading"
              className="font-bold text-secondary text-[40px] md:text-[48px] tracking-[-2.4px] uppercase mb-3"
            >
              Come Try Artistic<br />Swimming for Free!
            </h2>
            <p className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-8">
              Designed for Future Champions
            </p>

            <div className="space-y-6 mb-10">
              <DetailItem label="Ages" value={data.ages} />
              <DetailItem label="When" value={`${data.date} · ${data.time}`} />
            </div>

            {/* Safety box */}
            <div className="bg-secondary p-6 rounded-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white text-[20px]">🛡️</span>
                <h3 className="font-bold text-white text-[14px] tracking-[1.4px] uppercase">
                  Critical Safety Requirement
                </h3>
              </div>
              <p className="text-white/90 text-[15px] leading-[24px] italic">
                "{data.safetyNote}"
              </p>
            </div>
          </div>

          {/* Right: location card */}
          <div className="bg-[#f5f5f5] rounded-sm overflow-hidden">
            <div className="p-8">
              <p className="font-bold text-secondary text-[12px] tracking-[1.4px] uppercase mb-4">
                Location Details
              </p>
              <div className="flex items-start gap-3 mb-4">
                <span className="text-secondary text-[18px] mt-0.5">📍</span>
                <div>
                  <p className="font-bold text-secondary text-[16px] mb-1">{data.location.name}</p>
                  <p className="text-[#737373] text-[15px] leading-[24px] whitespace-pre-line">
                    {data.location.address}
                  </p>
                </div>
              </div>
            </div>
            <img
              src={LOCATION_IMAGE}
              alt={data.location.name}
              className="w-full h-[200px] object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="font-bold text-secondary text-[13px] tracking-[1.4px] uppercase mb-1">
        {label}
      </h4>
      <p className="text-[#737373] text-[16px]">{value}</p>
    </div>
  )
}
