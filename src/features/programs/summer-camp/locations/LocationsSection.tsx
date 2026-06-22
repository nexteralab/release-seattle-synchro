import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'
import { LOCATION_LIST } from './data'

const t = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
const vp = { once: true, margin: '-80px' }

export function LocationsSection() {
  return (
    <section className="bg-white p-6 md:px-12 md:py-24" aria-labelledby="locations-heading">
      <div className="max-w-screen-lg mx-auto space-y-12">
        <div className="space-y-4 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-secondary text-white font-bold text-[12px] tracking-[1.4px] uppercase">
            Camps Near You
          </span>
          <h2
            id="locations-heading"
            className="font-bold text-secondary text-[36px] md:text-[56px] tracking-[-2.4px] uppercase leading-[1.05]"
          >
            Pick Your City
          </h2>
          <p className="text-[#737373] text-[16px] md:text-[17px] leading-[28px]">
            Our synchronized swimming summer camp runs at two Bellevue pools, serving families
            across greater Seattle. Choose your city to see dates, locations, and details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATION_LIST.map((loc, idx) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ ...t, delay: idx * 0.06 }}
            >
              <Link
                to="/programs/summer-camp/$id"
                params={{ id: loc.slug }}
                className="group flex items-center justify-between gap-4 bg-[#f5f5f5] hover:bg-primary p-6 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary group-hover:text-white shrink-0 mt-0.5 transition-colors" />
                  <div>
                    <h3 className="font-bold text-secondary group-hover:text-white text-[20px] tracking-[-0.5px] uppercase transition-colors">
                      {loc.city}
                    </h3>
                    <p className="text-[#737373] group-hover:text-white/70 text-[13px] tracking-[1px] uppercase transition-colors">
                      {loc.state} · Summer Camp 2026
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-secondary group-hover:text-white shrink-0 group-hover:translate-x-1 transition-all"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
