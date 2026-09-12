import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import RibbonCta from "./RibbonCta";

const VALUE_PROPS = [
  "Streamline HR operations with intuitive employee tools",
  "Support your workforce with connected people workflows",
  "Simplify payroll processes with accurate, compliant automation",
  "Enhance financial management with real-time workforce costs",
  "Increase productivity with AI-powered insights and reporting",
  "Automate workflows with integrations your team can trust",
];

export default function LeadCapture() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="lead-section" id="get-started">
      <img className="lead-decorative-icon" src="/decorative-icons/half-icon.png" alt="" aria-hidden="true" />
      <img className="lead-bottom-icon" src="/decorative-icons/half-icon.png" alt="" aria-hidden="true" />
      <img className="lead-dots" src="/decorative-icons/dotted.png" alt="" aria-hidden="true" />
      <img className="lead-dots lead-dots--bottom" src="/decorative-icons/dotted.png" alt="" aria-hidden="true" />
      <div className="container lead-inner">
        <div className="lead-copy">
          <h2 className="section-title">See Crodlin running on your own data</h2>
          <p className="lead-sub">Our all-in-one HR, payroll, finance, and people platform helps your team:</p>
          <ul className="lead-values">
            {VALUE_PROPS.map((v) => (
              <li key={v}>
                <CheckCircle2 size={18} strokeWidth={2} />
                {v}
              </li>
            ))}
          </ul>
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          <div className="lead-form-row">
            <label className="field-label" htmlFor="lead-name">Full name</label>
            <input id="lead-name" className="field" required placeholder="Jordan Blake" value={form.name} onChange={update("name")} />
          </div>
          <div className="lead-form-row">
            <label className="field-label" htmlFor="lead-email">Work email</label>
            <input id="lead-email" type="email" className="field" required placeholder="jordan@company.com" value={form.email} onChange={update("email")} />
          </div>
          <div className="lead-form-row">
            <label className="field-label" htmlFor="lead-company">Company name</label>
            <input id="lead-company" className="field" required placeholder="Company Inc." value={form.company} onChange={update("company")} />
          </div>
          <div className="lead-form-row">
            <label className="field-label" htmlFor="lead-phone">Phone number</label>
            <input id="lead-phone" type="tel" className="field" placeholder="+1 (555) 000-0000" value={form.phone} onChange={update("phone")} />
          </div>
          <div className="lead-actions">
            <RibbonCta as="button" type="submit" className="ribbon-btn-sm lead-submit">Get Started</RibbonCta>
            <button type="button" className="lead-video-button" aria-label="Watch a product tour">▶ Watch tour video</button>
          </div>
        </form>
      </div>
    </section>
  );
}
