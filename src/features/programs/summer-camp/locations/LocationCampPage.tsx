import { useState } from 'react'
import programBeginner from "/images/program_1.png";
import { REGISTER_URL, SHARED } from './data'
import type { LocationContent } from './types'
import { CtaBanner } from '#/components/CtaBanner'

const BLUE = '#0A0A67'
const GREEN = '#6CA80D'
const TEAL = '#34B6CC'

// ponytail: keyframes inyectados una vez para los efectos float/bob del diseño
const ANIM = `
@keyframes scbFloatA { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-26px) translateX(10px); } }
@keyframes scbFloatB { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(22px) translateX(-12px); } }
@keyframes scbFloatC { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
@keyframes scbBob { 0%,100% { transform: rotate(-3deg) translateY(0); } 50% { transform: rotate(-3deg) translateY(-12px); } }
`

const sg = "'Space Grotesk', sans-serif"

const mapsLink = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

interface Props {
  content: LocationContent
}

export function LocationCampPage({ content }: Props) {
  const { city, weeks, faqs } = content
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Rota el orden de "What to Bring" por ciudad (variedad SEO); contenido idéntico.
  const off = (content.packOffset ?? 0) % SHARED.packItems.length
  const packItems = [...SHARED.packItems.slice(off), ...SHARED.packItems.slice(0, off)]

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#4a5560', overflowX: 'hidden' }}>
      <style>{ANIM}</style>

      {/* ===================== HERO ===================== */}
      <section
        className="px-6 pt-32 pb-20 md:px-10 md:pt-[150px] md:pb-[120px]"
        style={{ position: 'relative', background: 'linear-gradient(165deg, #eef9fb 0%, #f4f8e9 100%)', overflow: 'hidden' }}
      >
        {/* burbujas decorativas */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', top: '14%', left: '6%', width: 90, height: 90, borderRadius: '50%', background: 'rgba(52,182,204,0.16)', animation: 'scbFloatA 8s ease-in-out infinite' }} />
          <span style={{ position: 'absolute', top: '62%', left: '12%', width: 48, height: 48, borderRadius: '50%', background: 'rgba(108,168,13,0.18)', animation: 'scbFloatB 7s ease-in-out infinite' }} />
          <span style={{ position: 'absolute', top: '18%', right: '8%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(52,182,204,0.12)', animation: 'scbFloatB 10s ease-in-out infinite' }} />
          <span style={{ position: 'absolute', bottom: '10%', right: '18%', width: 40, height: 40, borderRadius: '50%', background: 'rgba(108,168,13,0.2)', animation: 'scbFloatC 7.5s ease-in-out infinite' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-14 items-center" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div>
            <span style={{ display: 'inline-block', background: BLUE, color: '#fff', fontFamily: sg, fontWeight: 700, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', padding: '8px 18px', borderRadius: 999, marginBottom: 22 }}>
              Ages 6–11 · Beginners Welcome
            </span>
            <h1 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 0.98, letterSpacing: -2, color: BLUE, margin: '0 0 22px' }}>
              {content.heroTitle}
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: '#5a6b75', maxWidth: 480, margin: '0 0 34px' }}>
              {content.heroSubtitle}
            </p>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', fontFamily: sg, fontWeight: 700, fontSize: 14, letterSpacing: 1.6, textTransform: 'uppercase', color: '#fff', background: GREEN, padding: '18px 40px', borderRadius: 999, textDecoration: 'none', boxShadow: '0 10px 22px rgba(108,168,13,0.32)' }}
            >
              Register Now
            </a>
            <div style={{ display: 'flex', gap: 30, marginTop: 38 }}>
              <Stat n="5" label="fun mornings" />
              <Stat n={String(weeks.length)} label={`${city} pools`} border />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-14px -14px 14px 14px', background: GREEN, borderRadius: 40, transform: 'rotate(-3deg)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, transform: 'rotate(-3deg)', animation: 'scbBob 6s ease-in-out infinite' }}>
              <img
                src={content.heroImage ?? programBeginner}
                alt={`Kids at synchronized swimming summer camp in ${city}`}
                style={{ display: 'block', width: '100%', height: 440, objectFit: 'cover', borderRadius: 36 }}
              />
            </div>
            <span style={{ position: 'absolute', zIndex: 2, bottom: -18, left: -22, background: '#fff', borderRadius: 18, padding: '14px 20px', boxShadow: '0 12px 28px rgba(0,0,0,0.14)', fontFamily: sg, fontWeight: 700, color: BLUE, transform: 'rotate(4deg)' }}>
              🌊 9–11am daily
            </span>
          </div>
        </div>
      </section>

      {/* wave divider */}
      <div style={{ lineHeight: 0, marginTop: -1, background: '#f4f8e9' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 72 }}>
          <path
            d="M0,25 C120,7 240,7 360,25 C480,43 600,43 720,25 C840,7 960,7 1080,25 C1200,43 1320,43 1440,25 L1440,65 C1320,83 1200,83 1080,65 C960,47 840,47 720,65 C600,83 480,83 360,65 C240,47 120,47 0,65 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* ===================== WHY KIDS LOVE IT ===================== */}
      <section className="px-6 pt-10 pb-24 md:px-10" style={{ background: '#f4f8e9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHead kicker="Why Kids Love It" kickerColor={GREEN} title="A Week of Splashy Fun" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHARED.whyCards.map((c) => (
              <div key={c.title} style={{ background: '#fff', borderRadius: 24, padding: '32px 26px', boxShadow: '0 6px 20px rgba(10,10,103,0.06)' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: c.tone === 'teal' ? '#eef9fb' : '#f3f7e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: c.tone === 'teal' ? TEAL : GREEN, marginBottom: 20 }}>
                  {c.icon}
                </div>
                <h3 style={{ fontFamily: sg, fontWeight: 700, fontSize: 20, color: BLUE, margin: '0 0 8px' }}>{c.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#6a7680', margin: 0 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT + CAMP DETAILS ===================== */}
      <section className="px-6 py-24 md:px-10" style={{ margin: '0 auto', background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-screen-lg mx-auto">
          <div>
            <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, textTransform: 'uppercase', color: GREEN, margin: '0 0 12px' }}>About the Camp</p>
            <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: -1.2, color: BLUE, margin: '0 0 22px' }}>Dive Into Artistic Swimming</h2>
            {content.aboutParagraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: '#5a6b75', margin: i === 0 ? '0 0 18px' : 0 }}>{p}</p>
            ))}
          </div>
          <div style={{ background: BLUE, borderRadius: 28, padding: 42, color: '#fff' }}>
            <h3 style={{ fontFamily: sg, fontWeight: 700, fontSize: 22, letterSpacing: 0.5, textTransform: 'uppercase', margin: '0 0 28px' }}>Camp Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Detail label="Ages" value={SHARED.ages} />
              <Detail label="Swim Level" value={SHARED.swimLevel} />
              <Detail label="Daily Schedule" value={SHARED.schedule} />
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 22 }}>
                <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', color: '#aee15a', margin: '0 0 12px' }}>{city} Locations</p>
                {weeks.map((w, i) => (
                  <div key={w.area} style={{ marginBottom: i === weeks.length - 1 ? 0 : 14 }}>
                    <p style={{ fontFamily: sg, fontWeight: 600, fontSize: 15, color: '#fff', margin: '0 0 2px' }}>{w.month} · {w.area}</p>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{w.dates} · {w.locationName}<br />{w.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHAT TO PACK ===================== */}
      <section className="px-6 py-20 md:px-10" style={{ background: '#eef9fb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className='max-w-screen-lg mx-auto'>
          <SectionHead kicker="Pack Your Bag" kickerColor={TEAL} title="What to Bring" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {packItems.map((it) => (
              <div key={it.label} style={{ background: '#fff', borderRadius: 20, padding: '26px 18px', textAlign: 'center', boxShadow: '0 4px 14px rgba(10,10,103,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 22, margin: '0 auto 16px' }}>✓</div>
                <p style={{ fontFamily: sg, fontWeight: 600, fontSize: 16, color: BLUE, margin: it.link ? '0 0 4px' : 0 }}>{it.label}</p>
                {it.link && (
                  <a href={it.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#a1a1a1', textDecoration: 'underline' }}>recommended pick</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section className="px-6 py-24 md:px-10" style={{ margin: '0 auto', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, textTransform: 'uppercase', color: GREEN, margin: '0 0 12px' }}>Register</p>
          <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: -1.2, color: BLUE, margin: '0 0 14px' }}>Pick Your Week in {city}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#6a7680', maxWidth: 560, margin: '0 auto' }}>Five mornings of synchronized swimming, 9–11am, ending with a Friday show for family &amp; friends.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto" style={{ maxWidth: 760, alignItems: 'stretch' }}>
          {weeks.map((w, i) => (
            <div key={w.area} style={{ background: BLUE, border: `2px solid ${BLUE}`, borderRadius: 26, padding: '38px 32px', display: 'flex', flexDirection: 'column', boxShadow: w.featured ? '0 20px 44px rgba(10,10,103,0.3)' : 'none' }}>
              <h3 style={{ fontFamily: sg, fontWeight: 700, fontSize: 20, color: '#fff', margin: '0 0 4px' }}>Week {i + 1} · {w.area}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: '0 0 22px' }}>{w.dates} · {city}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 24 }}>
                <span style={{ fontFamily: sg, fontWeight: 700, fontSize: 46, letterSpacing: -1.5, color: '#fff' }}>{w.price}</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>/ camper</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30, fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>
                {SHARED.pricingFeatures.map((f) => (<span key={f}>✓&nbsp;&nbsp;{f}</span>))}
              </div>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', textAlign: 'center', fontFamily: sg, fontWeight: 700, fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase', color: BLUE, background: GREEN, padding: 14, borderRadius: 999, textDecoration: 'none' }}>Register</a>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== LOCATION + MAP ===================== */}
      <section className="px-6 py-20 md:px-10" style={{ background: '#f4f8e9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className='max-w-screen-lg mx-auto'>
          <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, textTransform: 'uppercase', color: GREEN, margin: '0 0 12px' }}>Find Us</p>
          <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 42px)', letterSpacing: -1.2, color: BLUE, margin: '0 0 8px' }}>{content.locationHeading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#6a7680', maxWidth: 560, margin: '0 0 44px' }}>{content.locationBlurb}</p>
          <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-9 items-stretch">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {weeks.map((w) => (
                <div key={w.area} style={{ background: '#fff', borderRadius: 22, padding: 28, boxShadow: '0 6px 18px rgba(10,10,103,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: GREEN, fontSize: 18 }}>●</span>
                    <h3 style={{ fontFamily: sg, fontWeight: 700, fontSize: 18, color: BLUE, margin: 0 }}>{w.area}</h3>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: '#6a7680', margin: '0 0 6px' }}>{w.locationName}<br />{w.address}</p>
                  <p style={{ fontFamily: sg, fontWeight: 600, fontSize: 13, color: BLUE, margin: '0 0 14px' }}>{w.dates}</p>
                  <a href={mapsLink(w.mapQuery)} target="_blank" rel="noopener noreferrer" style={{ fontFamily: sg, fontWeight: 700, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: BLUE, textDecoration: 'none', borderBottom: `2px solid ${GREEN}`, paddingBottom: 2 }}>Get Directions →</a>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 22, overflow: 'hidden', boxShadow: '0 6px 18px rgba(10,10,103,0.1)', minHeight: 420, background: '#e6e9ee' }}>
              <iframe
                title={`Map of ${city}, ${content.state} camp locations`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(content.mapEmbedQuery)}&z=12&output=embed`}
                style={{ width: '100%', height: '100%', minHeight: 420, border: 0, display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="px-6 py-24 md:px-10" style={{ background: '#eef9fb' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <SectionHead kicker="Parent Questions" kickerColor={GREEN} title="Good to Know" />
          {faqs.map((f, i) => {
            const open = openFaq === i
            return (
              <div key={f.q} style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 18, marginBottom: 14, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '22px 26px' }}
                >
                  <span style={{ fontFamily: sg, fontWeight: 600, fontSize: 18, color: BLUE }}>{f.q}</span>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', background: '#f4f8e9', color: GREEN, fontFamily: sg, fontWeight: 700, fontSize: 20, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{open ? '–' : '+'}</span>
                </button>
                {open && (
                  <div style={{ padding: '0 26px 24px', fontSize: 16, lineHeight: 1.7, color: '#6a7680' }}>{f.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <CtaBanner
        heading="Ready to Dive In?"
        description="Spots fill up quickly! Register now to secure your place in our 2026 Summer Camp program."
        linkToContact="/contact-us"
        linkLabelContact="Contact Us"
        linkVariantContact="secondary"
        linkToRegister="https://www.seattlesynchrosst.com/page/system/classreg-shopping"
        linkLabelRegister="Register Now"
        image="1"
        alt="Ready to Dive In? Summer Camp 2026 banner"
      />
    </div>
  )
}

function Stat({ n, label, border }: { n: string; label: string; border?: boolean }) {
  return (
    <div style={border ? { borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: 30 } : undefined}>
      <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 30, color: BLUE, margin: 0 }}>{n}</p>
      <p style={{ fontSize: 13, color: '#8a97a0', margin: '2px 0 0' }}>{label}</p>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', color: '#aee15a', margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0 }}>{value}</p>
    </div>
  )
}

function SectionHead({ kicker, kickerColor, title }: { kicker: string; kickerColor: string; title: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 50 }}>
      <p style={{ fontFamily: sg, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, textTransform: 'uppercase', color: kickerColor, margin: '0 0 12px' }}>{kicker}</p>
      <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: -1.2, color: BLUE, margin: 0 }}>{title}</h2>
    </div>
  )
}
