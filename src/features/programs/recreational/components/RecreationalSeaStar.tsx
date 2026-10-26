import type { RecreationalProgram } from '../types'

interface Props {
  program: RecreationalProgram
}

export function RecreationalSharksMermaids({ program }: Props) {
  return (
    <section id="sharks-mermaids" className="p-6 md:px-12 lg:p-20 bg-[#F5F5F5] scroll-mt-24" aria-labelledby="sharks-mermaids-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2
              id="sharks-mermaids-heading"
              className="font-bold text-primary text-[40px] md:text-[48px] tracking-[-2.4px] uppercase"
            >
              {program.name}
            </h2>
            <a
              href={program.register_url}
              target="_blank"
              rel="noopener"
              className="bg-secondary text-primary rounded-full px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
            >
              {program.register_label}
            </a>
          </div>
          <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px] max-w-3xl">
            {program.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-8">
              Program Details
            </h3>
            <div className="space-y-6">
              <DetailItem label="Ages" value={program.ages} />
              <DetailItem label="Coach" value={program.coach} />
              <div>
                <h4 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
                  Workout Days / Times
                </h4>
                <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px]">
                  {program.workout_days_times}
                </p>
                {program.schedule_note && (
                  <p className="text-[#a1a1a1] text-[14px] mt-2">{program.schedule_note}</p>
                )}
              </div>
              {program.duration && <DetailItem label="Duration" value={program.duration} />}
              <div>
                <h4 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
                  Cost
                </h4>
                <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px]">
                  {program.cost}
                </p>
                {program.cost_note && (
                  <p className="text-[#a1a1a1] text-[14px] mt-2">{program.cost_note}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <h3 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-8">
              {program.skills_title}
            </h3>
            <ul className="space-y-5">
              {program.skills.map((skill, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="shrink-0 size-6 rounded-full bg-primary/18 text-primary flex items-center justify-center font-bold text-[13px] mt-0.5"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-secondary text-[16px] md:text-[17px] leading-[26px] font-medium">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="font-bold text-secondary text-[12px] md:text-[14px] tracking-[1.4px] uppercase mb-2">
        {label}
      </h4>
      <p className="text-[#737373] text-[16px] md:text-[18px] leading-[26px]">{value}</p>
    </div>
  )
}
