import { ContactHero } from './components/ContactHero'
import { ContactInfoPanel } from './components/ContactInfoPanel'
import { ContactForm } from './components/ContactForm'

export function ContactPage() {
  return (
    <main>
      <ContactHero />
      <section className="p-6 md:p-12 md:py-24 bg-[#f5f5f5]">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <ContactInfoPanel />
            </div>
            <div className="lg:col-span-3 bg-white p-8 md:p-10">
              <h2
                className="font-bold text-secondary text-[22px] tracking-[-1px] uppercase mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
