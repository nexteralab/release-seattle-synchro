import { FileText, HeartHandshake } from 'lucide-react'
import { BOOSTER_CATEGORIES, type BoosterDocs } from '../../booster.service'

const linkCls =
    'flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 text-[#0A0A67] font-medium hover:bg-[#f5f5f5] transition-colors'

export function DonateBouster({ documents }: { documents: BoosterDocs }) {
    const groups = BOOSTER_CATEGORIES.filter(({ key }) => documents[key]?.length)

    return (
        <section className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="more-info-heading">
            <div className="max-w-screen-lg mx-auto space-y-8">
                <h2
                    id="more-info-heading"
                    className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.2px] uppercase text-center"
                >
                    For more information
                </h2>
                <div className="bg-white rounded-3xl shadow-md p-6 md:p-12 space-y-10">
                    <p className="text-[#171717] text-[16px] md:text-[18px] leading-[28px]">
                        Please send email to{' '}
                        <a href="mailto:synchroclub@gmail.com" className="text-secondary underline">
                            synchroclub@gmail.com
                        </a>{' '}
                        or send mail to 9805 NE 116th Street, #7357, Kirkland, WA 98034.
                    </p>

                    {/* Documentos públicos, cargados desde el admin */}
                    {groups.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-8 text-center rounded-xl border border-dashed border-black/10">
                            <FileText className="size-8 text-[#a1a1a1]" strokeWidth={1.5} aria-hidden="true" />
                            <p className="text-[#737373] text-[16px] leading-[26px]">
                                No documents have been published yet. Please check back soon.
                            </p>
                        </div>
                    ) : (
                        groups.map(({ key, label }) => (
                            <div key={key} className="space-y-4">
                                <h3 className="font-bold text-[#0A0A67] text-[18px] md:text-[20px] uppercase tracking-[-0.4px]">
                                    {label}
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {documents[key]!.map((doc) => (
                                        <li key={doc.url}>
                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                                                <FileText className="size-5 shrink-0" aria-hidden="true" />
                                                {doc.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}

                    <a href="/booster/fundraising" className={linkCls}>
                        <HeartHandshake className="size-5 shrink-0" aria-hidden="true" />
                        Fundraising Opportunities
                    </a>
                </div>
            </div>
        </section>
    )
}
