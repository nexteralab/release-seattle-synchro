import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/images/logo.png";

// El panel del menú muestra título + descripción por ítem.
// OJO: las descripciones marcadas con [revisar] son un primer borrador — no
// están sacadas del contenido real de esas páginas. Corrígelas aquí.
const menuItems = {
  programs: {
    label: "Programs",
    items: [
      { label: "Beginner", path: "/programs/beginner", description: "First strokes and basic figures. [revisar]" },
      { label: "Recreational", path: "/programs/recreational", description: "Weekly practice for swimmers new to the sport." },
      { label: "Competitive", path: "/programs/competitive", description: "Team training and competition by age group." },
      { label: "Elite Clinic", path: "/programs/elite-clinic", description: "Intensive training with visiting head coaches." },
      { label: "Private Lessons", path: "/programs/private-lessons", description: "One-on-one coaching on the skills you pick. [revisar]" },
      { label: "Free Trial Class", path: "/programs/free-try", description: "A fun, no-pressure introduction." },
      { label: "Summer Camp", path: "/programs/summer-camp", description: "Summer sessions at our Bellevue pools." },
      { label: "Performance", path: "/programs/shows", description: "Season performances and how to attend. [revisar]" },
      { label: "Try Out", path: "/programs/try-out", description: "Evaluate swim readiness and find team placement." },
    ],
  },
  about: {
    label: "About Us",
    items: [
      { label: "About Us", path: "/team/about-us", description: "Who we are and how the club started. [revisar]" },
      { label: "Coaches", path: "/team/coaches", description: "Meet the staff and their credentials." },
      { label: "Hall of Fame", path: "/athletes/hall-of-fame", description: "Athletes who marked the club's history." },
      { label: "News", path: "/team/news", description: "Results, announcements and events." },
      { label: "Blog", path: "/team/blog", description: "Training tips and stories from the team." },
    ],
  },
  support: {
    label: "Support Us",
    items: [
      { label: "Donate", path: "/booster/donate", description: "Support the club with a donation. [revisar]" },
      { label: "Fundraising Opportunities", path: "/booster/fundraising", description: "Ways families can raise funds for the season. [revisar]" },
    ],
  },
  resources: {
    label: "Athlete Resources",
    items: [
      { label: "Safety", path: "/athletes/safety", description: "Policies for a safe training environment. [revisar]" },
      { label: "Health", path: "/athletes/health", description: "Nutrition, recovery and wellbeing. [revisar]" },
      { label: "Hair & Knoxing Guide", path: "/athletes/knoxing", description: "Hair preparation for artistic swimmers." },
      { label: "Sport Psychology", path: "/athletes/sport-psychology", description: "Mental preparation for training and competition. [revisar]" },
    ],
  }
};

export function NavbarHomePage() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isSectionActive = (items: { path: string }[]) =>
    items.some((item) => isActive(item.path));

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] py-0"
          : "bg-white py-0"
          }`}
      >
        <div className="max-w-screen-lg mx-auto px-6 md:px-20 lg:px-0">
          {/* Tres zonas: 1 logo · 2 navegación · 3 CTAs.
              Rejilla y no flex con justify-between: con las columnas laterales
              a 1fr, la navegación queda centrada respecto al contenedor y no
              respecto al hueco que dejan logo y botones, que miden distinto. */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 group">
              <img
                src={logo}
                alt="Seattle Synchro"
                className={`transition-all duration-300 ${scrolled ? "h-[46px]" : "h-[52px]"}`}
              />
            </Link>

            {/* 2 — Navegación.
                Un único panel para todas las secciones, anclado al centro de
                la navegación, en vez de un desplegable estrecho bajo cada
                ítem. `onMouseLeave` vive en el contenedor: así el puntero
                puede cruzar del ítem al panel sin que se cierre. */}
            <div
              className="hidden lg:block relative"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center justify-center gap-1">
                {Object.entries(menuItems).map(([key, menu]) => {
                  const active = isSectionActive(menu.items);
                  const open = activeDropdown === key;
                  return (
                    <button
                      key={key}
                      onMouseEnter={() => setActiveDropdown(key)}
                      onFocus={() => setActiveDropdown(key)}
                      aria-expanded={open}
                      className={`inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-full px-4 py-2 font-bold text-[12px] tracking-[1.6px] uppercase transition-colors duration-200 ${open || active
                        ? "bg-black/[0.05] text-[#0A0A67]"
                        : "text-[#0A0A67]/50 hover:text-[#0A0A67]"
                        }`}
                    >
                      {menu.label}
                      <ChevronDown
                        size={10}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {activeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                    // pt-3 y no mt-3: el hueco entre la navegación y el panel
                    // queda dentro del área hoverable, si no se cierra al cruzarlo.
                    className="absolute top-full left-1/2 z-10 w-[min(720px,88vw)] -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-2xl border border-black/[0.06] bg-white/95 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                        {menuItems[activeDropdown as keyof typeof menuItems].items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setActiveDropdown(null)}
                            className={`group/item rounded-lg px-3 py-2.5 transition-colors duration-150 ${isActive(item.path) ? "bg-[#0A0A67]/[0.06]" : "hover:bg-black/[0.03]"
                              }`}
                          >
                            <span
                              className={`block text-[14px] font-semibold leading-snug ${isActive(item.path) ? "text-[#0A0A67]" : "text-[#171717]"
                                }`}
                            >
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="mt-0.5 block text-[13px] leading-snug text-[#737373]">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3 — CTAs. Ya no hace falta el separador que había entre la
                navegación y los botones: los separa la propia rejilla. */}
            <div className="flex items-center justify-end gap-2">
              <Link
                to="/contact-us"
                className="hidden lg:inline-flex group shrink-0 whitespace-nowrap items-center gap-2 bg-[#0A0A67] text-white px-5 py-2 rounded-full font-bold text-[12px] tracking-[1.4px] hover:text-primary uppercase transition-all duration-200"
              >
                Contact Us
              </Link>

              <a
                href="https://www.seattlesynchrosst.com/page/home"
                target="_blank"
                rel="noopener"
                className="hidden lg:inline-flex group shrink-0 whitespace-nowrap items-center gap-2 bg-[#F5F5F5] text-[#0A0A67] px-5 py-2 rounded-full font-['Space_Grotesk'] font-bold text-[12px] tracking-[1.4px] uppercase hover:bg-[#e0e7ef] transition-all duration-200 border border-[#0A0A67]/10"
              >
                Members
              </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-[#0A0A67]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={22} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={22} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-white pt-[71px] overflow-y-auto lg:hidden"
          >
            <div className="px-8 py-6 flex flex-col">
              {Object.entries(menuItems).map(([key, menu], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="border-b border-[#ececf0]"
                >
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === key ? null : key)
                    }
                    className="w-full flex items-center justify-between py-4 font-['Space_Grotesk'] font-bold text-[13px] tracking-[1.8px] uppercase text-[#0A0A67]"
                  >
                    {menu.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={`transition-transform duration-200 ${mobileExpanded === key ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 flex flex-col gap-0.5 pl-0">
                          {menu.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`flex items-center gap-2 py-2 text-[14px] transition-colors ${isActive(item.path)
                                ? "text-[#0A0A67] font-semibold"
                                : "text-[#737373]"
                                }`}
                            >
                              {isActive(item.path) && (
                                <span className="w-1 h-1 rounded-full bg-[#0A0A67] shrink-0" />
                              )}
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="mt-8 flex flex-col gap-2"
              >
                <Link
                  to="/contact-us"
                  className="flex items-center justify-center gap-2 w-full py-4 font-bold text-[13px] tracking-[2px] uppercase bg-[#0A0A67] text-white"
                >
                  Contact Us
                  <ArrowRight size={12} />
                </Link>
                <a
                  href="https://www.seattlesynchrosst.com/page/home"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 bg-[#F5F5F5] text-[#0A0A67] px-5 py-2 border border-[#0A0A67]/10 w-full py-4 font-bold text-[13px] tracking-[2px] uppercase bg-[#F5F5F5] text-[#0A0A67] hover:bg-[#e0e7ef] transition-all duration-200"
                >
                  Members
                  <ArrowRight size={12} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
