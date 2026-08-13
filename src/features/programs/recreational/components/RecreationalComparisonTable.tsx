const ROWS: [string, string, string][] = [
  ['Main goal', 'Enjoyment and skill building', 'Competition results'],
  ['Judges & scores', 'None', 'Yes, judged meets'],
  ['Ages', '5 to 10', '6 to 11 (Novice)'],
  ['Tryout required', 'No', 'Yes'],
  ['Practices per week', '1', '3 or more'],
  ['Program length', '8 sessions', 'Year round'],
]

export function RecreationalComparisonTable() {
  return (
    <section className="p-6 md:px-12 lg:p-20 bg-[#f5f5f5]" aria-labelledby="comparison-heading">
      <div className="max-w-screen-lg mx-auto">
        <h2
          id="comparison-heading"
          className="font-bold text-secondary text-[30px] md:text-[42px] tracking-[-2.4px] uppercase"
        >
          Recreational vs. Competitive
        </h2>
        <p className="mt-4 max-w-2xl text-[#737373] text-[16px] md:text-[18px] leading-[28px]">
          Not sure which path fits your family? Both are completely valid. There is no right way
          to enjoy the sport.
        </p>

        <div className="mt-8 bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                <th className="text-left px-5 md:px-7 py-5 border-b border-black/[0.08]" />
                <th className="text-left px-5 md:px-7 py-5 font-bold text-primary text-[12px] md:text-[13px] tracking-[1.4px] uppercase border-b border-black/[0.08]">
                  Recreational
                </th>
                <th className="text-left px-5 md:px-7 py-5 font-bold text-secondary text-[12px] md:text-[13px] tracking-[1.4px] uppercase border-b border-black/[0.08]">
                  Competitive
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, rec, comp], i) => (
                <tr key={label} className={i % 2 === 1 ? 'bg-[#fafafc]' : undefined}>
                  <td className="px-5 md:px-7 py-4 text-secondary font-semibold text-[15px] md:text-[17px] border-b border-black/[0.06]">
                    {label}
                  </td>
                  <td className="px-5 md:px-7 py-4 text-[#737373] text-[15px] md:text-[17px] leading-[26px] border-b border-black/[0.06]">
                    {rec}
                  </td>
                  <td className="px-5 md:px-7 py-4 text-[#737373] text-[15px] md:text-[17px] leading-[26px] border-b border-black/[0.06]">
                    {comp}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-5 md:px-7 py-4 text-secondary font-semibold text-[15px] md:text-[17px] align-top">
                  Can move up later
                </td>
                <td colSpan={2} className="px-5 md:px-7 py-4 text-[#737373] text-[15px] md:text-[17px] leading-[26px]">
                  Yes. Many competitive synchronized swimmers started in a recreational program.
                  Others stay recreational for years simply because they love it.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
