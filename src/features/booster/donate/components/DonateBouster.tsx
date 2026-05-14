import iconMission from '../icons/Icon.svg'

export function DonateBouster() {

    return (
        <section className="p-6 md:px-20 md:py-24 bg-[#f5f5f5]" aria-labelledby="mission-heading">
            <div className="max-w-screen-lg mx-auto">
                <div className="flex items-center gap-3 mb-8 align-center justify-center">
                    <div className="size-8 rounded-full bg-secondary flex items-center justify-center shrink-0 p-2">
                        <img src={iconMission} alt="Mission" className="w-full h-full" />
                    </div>
                    <h2
                        id="mission-heading"
                        className="font-bold text-[#0A0A67] text-[28px] md:text-[40px] tracking-[-1.2px] uppercase"
                    >
                        Boosters
                    </h2>
                </div>
                <div className="bg-white p-6 rounded-sm shadow-md text-center space-y-6 p-12">
                    <p className="text-[#171717] text-[16px] md:text-[18px] leading-[28px] max-w-4xl">
                        The Seattle Synchro Booster Club is an IRS-approved 501(c)(3) charitable organization and donations to the club are tax-deductible. Donations qualify for corporate matching funds, and volunteer hours count towards corporate volunteer rewards.
                    </p>
                    <p className="text-[#171717] text-[16px] md:text-[18px] leading-[28px] max-w-4xl">
                        Booster Club membership is separate from LLC registration. For more information please feel free to contact us: <a href="mailto:ssstboosterclub@gmail.com" className="text-secondary underline">ssstboosterclub@gmail.com</a>
                    </p>
                </div>
            </div>
        </section>
    )
}
