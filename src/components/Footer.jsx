import { ArrowUpRight, Link2, MessageCircle, Camera, PlaySquare } from "lucide-react";

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
            <a href="#top" className="footer-brand-link" aria-label="Crodlin home">
              <span className="footer-brand-mark" aria-hidden="true">C</span>
              <span className="footer-logo">Crodlin</span>
            </a>
            <p className="footer-tagline">
              The unified HR, payroll, and workforce platform for growing companies.
            </p>
            <a href="#get-started" className="footer-cta">
              Start a conversation <ArrowUpRight size={16} strokeWidth={2} />
            </a>
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

        <div className="footer-wordmark" aria-hidden="true">Crodlin</div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Crodlin Technology. All rights reserved.</p>
          <nav aria-label="Legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#security">Security</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
