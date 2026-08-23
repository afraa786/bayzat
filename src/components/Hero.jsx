import { useState } from "react";
import { PlayCircle, CheckCircle2, ImageIcon } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import RibbonCta from "./RibbonCta";

export default function Hero() {
  const [email, setEmail] = useState("");
  const visualRef = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">hr · payroll · workforce</p>
          <h1 className="hero-title">
            One platform for people, pay, and everything in between
          </h1>
          <p className="hero-sub">
            Crodlin brings core HR, payroll, attendance, and workforce data into a single
            system of record — so growing teams spend less time reconciling spreadsheets
            and more time on the people doing the work.
          </p>

          <form className="hero-form" onSubmit={handleSubmit}>
            <label htmlFor="hero-email" className="visually-hidden">Work email</label>
            <input
              id="hero-email"
              type="email"
              required
              placeholder="you@company.com"
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <RibbonCta as="button" type="submit" className="ribbon-btn-sm">
              Get a free demo
            </RibbonCta>
          </form>

          <a href="#tour" className="hero-tour">
            <PlayCircle size={18} strokeWidth={1.75} />
            Watch a product tour
          </a>

          <p className="hero-trust">
            <CheckCircle2 size={16} strokeWidth={2} />
            Join 1,000+ companies streamlining HR with Crodlin
          </p>
        </div>

        <div className="hero-visual reveal" id="hero-visual" ref={visualRef}>
          <div className="hero-placeholder">
            <ImageIcon size={40} strokeWidth={1.5} />
            <span>Product screenshot placeholder</span>
          </div>

          <div className="ledger-badge">
            <span className="ledger-badge-label">On-time payroll</span>
            <span className="ledger-badge-value">99.9%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
