import { Link } from '@tanstack/react-router'
import readyToJoin from '/images/ready_to_join_4.png'

export function RecreationalCTA() {
  return (
    <section
      className="relative py-24 px-12 md:px-48 bg-[#0A0A67] overflow-hidden min-h-[300px"
      aria-labelledby="recreational-cta-heading"
    >
      {/* Content — centered, capped width so it doesn't overlap the illustration */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <h2
          id="recreational-cta-heading"
          className="font-bold text-white text-[48px] tracking-[-2.4px] uppercase"
        >
          Ready to Join?
        </h2>
        <p className="text-white/80 text-[20px] leading-[32px]">
          Sign up for one of our recreational programs and discover the joy of artistic swimming.
        </p>
        <Link
          to="/contact-us"
          className="inline-block bg-white text-[#021521] px-10 py-4 font-bold text-[14px] tracking-[2.8px] uppercase hover:bg-gray-100 transition-colors"
        >
          Contact Us
        </Link>
      </div>

      {/* Decorative illustration — absolute bottom-right, hidden on mobile */}
      <img
        src={readyToJoin}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute bottom-[-100px] right-[-80px] h-full w-auto object-contain object-bottom pointer-events-none opacity-0.5"
      />
    </section>
  )
}
