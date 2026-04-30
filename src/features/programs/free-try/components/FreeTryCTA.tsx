import { Link } from '@tanstack/react-router'
import readyToJoin from '/images/ready_to_join_3.png'

export function FreeTryCTA() {
  return (
    <section
      className="p-12 md:px-20 md:py-24 bg-secondary relative overflow-hidden"
      aria-labelledby="freetry-cta-heading"
    >
      <div className="max-w-screen-lg mx-auto text-center">
        <h2
          id="freetry-cta-heading"
          className="font-bold text-white text-[48px] tracking-[-2.4px] uppercase mb-6"
        >
          Ready to Dive In?
        </h2>
        <p className="text-white text-[20px] leading-[32px] mb-8 max-w-2xl mx-auto">
          Spots are limited! Join us on June 7th for a free introduction to the world of artistic swimming.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.seattlesynchro.com/page/system/classreg-shopping"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-secondary px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-gray-100 transition-colors"
          >
            Register Now
          </a>
          <Link
            to="/contact-us"
            className="inline-block border border-white text-white px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <img
        src={readyToJoin}
        alt=""
        aria-hidden="true"
        className="absolute bottom-[-100px] right-[-40px] h-full w-auto object-contain object-bottom pointer-events-none opacity-50 z-0"
      />
    </section>
  )
}
