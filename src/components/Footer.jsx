import { Link2, MessageCircle, Camera, PlaySquare, ShieldCheck, BadgeCheck, Apple, Smartphone } from "lucide-react";

const COLUMNS = [
  {
    title: "Platform",
    links: ["Core HR", "Payroll", "Attendance", "Shift Scheduling", "Employee Records", "Onboarding"],
  },
  {
    title: "Solutions",
    links: ["Small teams", "Growing companies", "Large enterprise", "For HR", "For Finance", "For IT"],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Help Center", "API Docs", "Webinars"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Newsroom", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  },
];

const SOCIALS = [
  { icon: Link2, label: "LinkedIn" },
  { icon: MessageCircle, label: "X" },
  { icon: Camera, label: "Instagram" },
  { icon: PlaySquare, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="nav-logo footer-logo">Crodlin</span>
            <p className="footer-tagline">
              The unified HR, payroll, and workforce platform for growing companies.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a href="#social" key={label} aria-label={label} className="footer-social-icon">
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-columns">
            {COLUMNS.map((col) => (
              <div className="footer-col" key={col.title}>
                <p className="footer-col-title">{col.title}</p>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}><a href={col.title === "Solutions" ? "/solutions" : "#footer-link"}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-badges">
          <div className="footer-badge">
            <ShieldCheck size={16} strokeWidth={1.75} /> SOC 2 Type II
          </div>
          <div className="footer-badge">
            <BadgeCheck size={16} strokeWidth={1.75} /> ISO 27001
          </div>
          <a href="#app-store" className="app-badge">
            <Apple size={22} strokeWidth={1.5} />
            <span>
              <span className="app-badge-eyebrow">Download on the</span>
              <span className="app-badge-name">App Store</span>
            </span>
          </a>
          <a href="#google-play" className="app-badge">
            <Smartphone size={22} strokeWidth={1.5} />
            <span>
              <span className="app-badge-eyebrow">Get it on</span>
              <span className="app-badge-name">Google Play</span>
            </span>
          </a>
        </div>

        <div className="footer-wordmark" aria-hidden="true">CRODLIN</div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Crodlin Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
