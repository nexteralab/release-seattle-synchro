import { Link } from "@tanstack/react-router";


export function RecreationalDolphins() {
  return (
    <section className="p-12 md:px-20 md:py-24 bg-white" aria-labelledby="dolphins-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2
              id="dolphins-heading"
              className="font-bold text-primary text-[48px] tracking-[-2.4px] uppercase"
            >
              Dolphins
            </h2>
            <Link
              to="/booster/donate"
              className="bg-secondary text-primary px-10 py-4 font-bold text-[14px] tracking-[1.4px] uppercase hover:bg-secondary hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
          <p className="text-[#171717] text-[18px] leading-[26px]">
            Dolphins is our swimming class for swimmers who would like to practice Artistic Swimming but that still need to work on on mastering crawl stroke, breast stroke and back stroke. They should be comfortable floating on their back and swimming under water. Participants will also learn basic sculling and work on flexibility.
          </p>
          <p className="text-[#171717] text-[18px] leading-[26px]">
            The Dolphin program is a non-competitive program where swimmers learn basic swimming and synchro skills. Lessons run in 8 week sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#F5F5F5] p-10">
            <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
              Program Details
            </h3>
            <div className="space-y-6">
              <DetailItem label="Ages" value="6–12" />
              <DetailItem label="Coach" value="TBD" />
              <DetailItem label="Workout Days / Times" value="Not available - TBD" />
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-10">
            <h3 className="font-bold text-secondary text-[20px] tracking-[-1px] uppercase mb-8">
              Required Swimming Skills
            </h3>
            <div className="space-y-6">
              <DetailItem label="Duration" value="8-week session" />
              <DetailItem label="Cost" value="$150 + $15 registration fee" />
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="font-bold text-secondary text-[14px] tracking-[1.4px] uppercase mb-2">
        {label}
      </h4>
      <p className="text-[#737373] text-[16px]">{value}</p>
    </div>
  )
}
