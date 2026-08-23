import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Squiggle from "./Squiggle";
import RibbonCta from "./RibbonCta";

const PLATFORM_ITEMS = [
  { label: "Core HR" },
  { label: "Leave Management" },
  { label: "Attendance" },
  { label: "Shift Scheduling" },
  { label: "Employee Records" },
  { label: "Onboarding" },
];

const SOLUTIONS_SIZE = [
  { label: "Small teams" },
  { label: "Growing companies" },
  { label: "Large enterprise" },
];

const SOLUTIONS_ROLE = [
  { label: "For HR" },
  { label: "For Finance" },
  { label: "For IT" },
];

const RESOURCES_ITEMS = [
  { label: "Blog" },
  { label: "Case Studies" },
  { label: "Help Center" },
];

function MegaColumn({ title, items }) {
  return (
    <div className="mega-col">
      {title && <p className="mega-col-title">{title}</p>}
      <ul>
        {items.map(({ label }) => (
          <li key={label}>
            <a href="#platform" className="mega-item">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openWithClear = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">Crodlin</a>

        <nav className="nav-links">
          <div className="nav-item" onMouseEnter={() => openWithClear("platform")} onMouseLeave={scheduleClose}>
            <button className="nav-trigger" aria-expanded={openMenu === "platform"}>
              <span className="nav-trigger-label">Platform<Squiggle /></span>
            </button>
          </div>
          <div className="nav-item" onMouseEnter={() => openWithClear("solutions")} onMouseLeave={scheduleClose}>
            <button className="nav-trigger" aria-expanded={openMenu === "solutions"}>
              <span className="nav-trigger-label">Solutions<Squiggle /></span>
            </button>
          </div>
          <a href="#why" className="nav-trigger" onMouseEnter={() => openWithClear(null)}>
            <span className="nav-trigger-label">Why Crodlin<Squiggle /></span>
          </a>
          <div className="nav-item" onMouseEnter={() => openWithClear("resources")} onMouseLeave={scheduleClose}>
            <button className="nav-trigger" aria-expanded={openMenu === "resources"}>
              <span className="nav-trigger-label">Resources<Squiggle /></span>
            </button>
          </div>
        </nav>

        <div className="nav-actions">
          <a href="#login" className="nav-login">Log in</a>
          <RibbonCta as="a" href="#get-started" className="ribbon-btn-sm">Get Started</RibbonCta>
        </div>

        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`mega ${openMenu ? "mega-open" : ""}`}
        onMouseEnter={() => openWithClear(openMenu)}
        onMouseLeave={scheduleClose}
      >
        <div className="container mega-inner">
          {openMenu === "platform" && <MegaColumn items={PLATFORM_ITEMS} />}
          {openMenu === "solutions" && (
            <>
              <MegaColumn title="By company size" items={SOLUTIONS_SIZE} />
              <MegaColumn title="By role" items={SOLUTIONS_ROLE} />
            </>
          )}
          {openMenu === "resources" && <MegaColumn items={RESOURCES_ITEMS} />}
        </div>
      </div>

      {mobileOpen && (
        <div className="nav-mobile">
          <a href="#platform" onClick={() => setMobileOpen(false)}>Platform</a>
          <a href="#solutions" onClick={() => setMobileOpen(false)}>Solutions</a>
          <a href="#why" onClick={() => setMobileOpen(false)}>Why Crodlin</a>
          <a href="#resources" onClick={() => setMobileOpen(false)}>Resources</a>
          <a href="#login" onClick={() => setMobileOpen(false)}>Log in</a>
          <RibbonCta as="a" href="#get-started" className="ribbon-btn-sm" onClick={() => setMobileOpen(false)}>Get Started</RibbonCta>
        </div>
      )}
    </header>
  );
}
