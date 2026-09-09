import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import logo from "/images/logo.png";

// El panel del menú muestra título + descripción por ítem.
// OJO: las descripciones marcadas con son un primer borrador — no
// están sacadas del contenido real de esas páginas. Corrígelas aquí.
const menuItems = {
  programs: {
    label: "Programs",
    blurb: "From first strokes to competitive routines — a track for every swimmer.",
    items: [
      { label: "Recreational", path: "/programs/recreational", description: "Weekly practice for swimmers new to the sport.", image: "/images/nav/recreational_hero.jpg" },
      { label: "Beginner", path: "/programs/beginner", description: "First strokes and basic figures.", image: "/images/nav/beginner_hero.jpg" },
      { label: "Competitive", path: "/programs/competitive", description: "Team training and competition by age group.", image: "/images/nav/competitive_hero.jpg" },
      { label: "Elite Clinic", path: "/programs/elite-clinic", description: "Intensive training with visiting head coaches.", image: "/images/nav/elite-clinc.jpg" },
      { label: "Private Lessons", path: "/programs/private-lessons", description: "One-on-one coaching on the skills you pick.", image: "/images/nav/piscina.jpg" },
      { label: "Free Trial Class", path: "/programs/free-try", description: "A fun, no-pressure introduction.", image: "/images/nav/image_free_try.jpg" },
      { label: "Summer Camp", path: "/programs/summer-camp", description: "Summer sessions at our Bellevue pools.", image: "/images/nav/hero_summer.jpg" },
      { label: "Performance", path: "/programs/shows", description: "Season performances and how to attend.", image: "/images/nav/shows_hero.jpg" },
      { label: "Try Out", path: "/programs/try-out", description: "Evaluate swim readiness and find team placement.", image: "/images/nav/tryout.jpg" },
    ],
  },
  about: {
    label: "About Us",
    blurb: "The club, the staff and everything happening this season.",
    items: [
      { label: "About Us", path: "/team/about-us", description: "Who we are and how the club started.", image: "/images/nav/about_us_hero.jpg" },
      { label: "Coaches", path: "/team/coaches", description: "Meet the staff and their credentials.", image: "/images/nav/hero.jpg" },
      { label: "Hall of Fame", path: "/athletes/hall-of-fame", description: "Athletes who marked the club's history.", image: "/images/nav/hall_of_fame.jpg" },
      { label: "News", path: "/team/news", description: "Results, announcements and events.", image: "/images/nav/content.jpg" },
      { label: "Blog", path: "/team/blog", description: "Training tips and stories from the team.", image: "/images/nav/program_3.jpg" },
    ],
  },
  support: {
    label: "Support Us",
    blurb: "Every season runs on the families and friends behind the team.",
    items: [
      { label: "Donate", path: "/booster/donate", description: "Support the club with a donation.", image: "/images/nav/hero_donate.jpg" },
      { label: "Fundraising Opportunities", path: "/booster/fundraising", description: "Ways families can raise funds for the season.", image: "/images/nav/program_1.jpg" },
    ],
  },
  resources: {
    label: "Athlete",
    blurb: "Practical guides for training, health and competition days.",
    items: [
      { label: "Safety", path: "/athletes/safety", description: "Policies for a safe training environment.", image: "/images/nav/team.jpg" },
      { label: "Health", path: "/athletes/health", description: "Nutrition, recovery and wellbeing.", image: "/images/nav/health_1.jpg" },
      { label: "Hair & Knoxing Guide", path: "/athletes/knoxing", description: "Hair preparation for artistic swimmers.", image: "/images/nav/health_2.jpg" },
      { label: "Sport Psychology", path: "/athletes/sport-psychology", description: "Mental preparation for training and competition.", image: "/images/nav/program_2.jpg" },
    ],
  }
};

export function NavbarHomePage() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
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

  // El panel móvil es `fixed inset-0`: sin esto la página de atrás sigue
  // scrolleando por debajo y al cerrar el menú quedás en otra posición.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

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
          {/* Flex en móvil y rejilla solo desde lg: el bloque central es
              `hidden lg:block`, y `display:none` lo saca de la rejilla, así que
              en móvil el hamburger caía en la columna del medio y la tercera
              quedaba vacía. */}
          <div className="flex items-center justify-between gap-4 h-[68px] lg:grid lg:grid-cols-[1fr_auto_1fr]">

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
                      onMouseEnter={() => { setActiveDropdown(key); setHoveredPath(null); }}
                      onFocus={() => { setActiveDropdown(key); setHoveredPath(null); }}
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

              {activeDropdown && (() => {
                const menu = menuItems[activeDropdown as keyof typeof menuItems];
                // El preview cae al primer ítem mientras no haya hover:
                // el panel nunca aparece con la columna derecha vacía.
                const preview =
                  menu.items.find((i) => i.path === hoveredPath) ?? menu.items[0];
                return (
                  // pt-3 y no mt-3: el hueco entre la navegación y el panel
                  // queda dentro del área hoverable, si no se cierra al cruzarlo.
                  <div className="absolute top-full left-1/2 z-10 w-[min(880px,92vw)] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-[200px_1fr_260px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]">

                      {/* Intro de la sección */}
                      <div className="bg-[#0A0A67]/[0.04] p-6">
                        <p className="font-bold text-[#0A0A67] text-[20px] tracking-[-0.6px]">
                          {menu.label}
                        </p>
                        <p className="mt-2 text-[13px] leading-[20px] text-[#737373]">
                          {menu.blurb}
                        </p>
                      </div>

                      {/* Lista de ítems */}
                      <div className="p-3">
                        {menu.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => setHoveredPath(item.path)}
                            onFocus={() => setHoveredPath(item.path)}
                            onClick={() => setActiveDropdown(null)}
                            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[14px] font-semibold leading-snug ${preview.path === item.path
                                ? "bg-[#0A0A67]/[0.06] text-[#0A0A67]"
                                : "text-[#171717]"
                              }`}
                          >
                            {item.label}
                            <ArrowRight
                              size={14}
                              className={preview.path === item.path ? "shrink-0" : "hidden"}
                            />
                          </Link>
                        ))}
                      </div>

                      {/* Preview del ítem apuntado.
                          Se pintan todas las imágenes de la sección y solo se
                          alterna cuál es visible: si se montara una sola, cada
                          hover dispararía una descarga y el panel parpadearía. */}
                      <div className="p-3">
                        <Link
                          to={preview.path}
                          onClick={() => setActiveDropdown(null)}
                          className="block overflow-hidden rounded-xl bg-[#f5f5f5]"
                        >
                          <div className="relative h-[150px] w-full">
                            {menu.items.map((item) => (
                              <img
                                key={item.path}
                                src={item.image}
                                alt={item.label}
                                width={420}
                                height={280}
                                className={`absolute inset-0 h-full w-full object-cover ${preview.path === item.path ? "" : "invisible"
                                  }`}
                              />
                            ))}
                          </div>
                          <div className="p-3">
                            <p className="text-[13px] font-semibold text-[#0A0A67]">
                              {preview.label}
                            </p>
                            <p className="mt-1 text-[12px] leading-[18px] text-[#737373]">
                              {preview.description}
                            </p>
                          </div>
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })()}
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
                {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[68px] overflow-y-auto lg:hidden">
          <div className="px-8 py-6 flex flex-col">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key} className="border-b border-[#ececf0]">
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

                {/* grid-rows 0fr→1fr: despliegue con transición CSS sin
                      medir alturas en JS. */}
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ${mobileExpanded === key ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0">
                    <div className="pb-4 flex flex-col gap-2">
                      <p className="text-[13px] leading-[20px] text-[#737373]">
                        {menu.blurb}
                      </p>
                      {menu.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-3 rounded-xl p-2 pr-3 transition-colors ${isActive(item.path)
                            ? "bg-[#0A0A67]/[0.06]"
                            : "bg-[#f5f5f5]"
                            }`}
                        >
                          <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            className="size-11 shrink-0 rounded-lg object-cover"
                          />
                          <span className="min-w-0">
                            <span className={`block text-[14px] font-semibold ${isActive(item.path) ? "text-[#0A0A67]" : "text-[#171717]"}`}>
                              {item.label}
                            </span>
                            <span className="block text-[12px] leading-[17px] text-[#737373]">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col gap-2">
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
                className="flex items-center justify-center gap-2 w-full py-4 font-bold text-[13px] tracking-[2px] uppercase bg-[#F5F5F5] text-[#0A0A67] border border-[#0A0A67]/10 hover:bg-[#e0e7ef] transition-colors duration-200"
              >
                Members
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
