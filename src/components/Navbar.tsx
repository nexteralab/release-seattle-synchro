import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/images/logo.png";

const menuItems = {
  programs: {
    label: "Programs",
    items: [
      { label: "Competitive", path: "/programs/competitive" },
      { label: "Recreational", path: "/programs/recreational" },
      { label: "Beginner", path: "/programs/beginner" },
      { label: "Summer Camp", path: "/programs/summer-camp" },
      { label: "Shows", path: "/programs/shows" },
    ],
  },
  team: {
    label: "Team",
    items: [
      { label: "Coaches", path: "/team/coaches" },
      { label: "About Us", path: "/team/about-us" },
      { label: "Blog", path: "/team/blog" },
      { label: "News", path: "/team/news" },
    ],
  },
  athletes: {
    label: "Athletes",
    items: [
      { label: "Hall of Fame", path: "/athletes/hall-of-fame" },
      { label: "Safety", path: "/athletes/safety" },
      { label: "Health", path: "/athletes/health" },
      { label: "Knoxing", path: "/athletes/knoxing" },
      { label: "Sport Psychology", path: "/athletes/sport-psychology" },
    ],
  },
  booster: {
    label: "Booster",
    items: [
      { label: "Donate", path: "/booster/donate" },
      { label: "Fundraising Opportunities", path: "/booster/fundraising" },
      { label: "Volunteer", path: "/booster/volunteer" },
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
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 group">
              <img
                src={logo}
                alt="Seattle Synchro"
                className={`transition-all duration-300 ${scrolled ? "h-[46px]" : "h-[52px]"}`}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0">
              {Object.entries(menuItems).map(([key, menu]) => {
                const active = isSectionActive(menu.items);
                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`relative px-4 py-2 inline-flex items-center gap-1.5 font-bold text-[12px] tracking-[1.6px] uppercase transition-colors duration-200 group ${active ? "text-[#0A0A67]" : "text-[#0A0A67]/50 hover:text-[#0A0A67]"
                        }`}
                    >
                      {menu.label}
                      <ChevronDown
                        size={10}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${activeDropdown === key ? "rotate-180" : ""}`}
                      />
                      {/* Underline */}
                      <span
                        className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#0A0A67] transition-all duration-300 origin-left ${active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40"
                          }`}
                        style={{ transformOrigin: "left" }}
                      />
                    </button>

                    {/* Puente transparente — evita el gap entre botón y dropdown */}
                    <div className="absolute top-full left-0 right-0 h-3" />

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute top-full left-0 mt-3 bg-white/95 backdrop-blur-sm border border-black/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] min-w-[210px] rounded-xl overflow-hidden"
                        >
                          <div className="py-2">
                            {menu.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`group/item flex items-center justify-between mx-2 px-3 py-2 rounded-lg text-[13px] transition-all duration-150 ${isActive(item.path)
                                  ? "bg-[#0A0A67]/[0.06] text-[#0A0A67] font-semibold"
                                  : "text-[#737373] hover:bg-black/[0.03] hover:text-[#171717]"
                                  }`}
                              >
                                <span>{item.label}</span>
                                <ArrowRight
                                  size={10}
                                  className={`transition-all duration-150 ${isActive(item.path)
                                    ? "opacity-60 text-[#0A0A67]"
                                    : "opacity-0 group-hover/item:opacity-30"
                                    }`}
                                />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Separator */}
              <div className="w-[1px] h-4 bg-black/10 mx-5" />

              {/* CTA */}
              <Link
                to="/programs/free-try-2026"
                className="group inline-flex items-center gap-2 bg-[#0A0A67] text-white px-5 py-2 rounded-full font-['Space_Grotesk'] font-bold text-[12px] tracking-[1.4px] uppercase hover:bg-[#030213] transition-all duration-200"
              >
                Free Try
                <ArrowRight
                  size={11}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

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
                className="mt-8"
              >
                <Link
                  to="/programs/free-try-2026"
                  className="flex items-center justify-center gap-2 w-full py-4 font-bold text-[13px] tracking-[2px] uppercase bg-[#0A0A67] text-white"
                >
                  Free Try
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
