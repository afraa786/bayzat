import { MoveRight } from "lucide-react";
import "./cinematic-list.css";

const ITEMS = [
  {
    id: "01", title: "People & HR", category: "A connected workforce",
    description: "Employee records, leave, and everyday HR. All in one place.",
    href: "#platform",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85",
    alt: "A team collaborating around a shared table",
  },
  {
    id: "02", title: "Payroll & attendance", category: "Every hour accounted for",
    description: "Connect time, attendance, and pay in one seamless workflow.",
    href: "#platform",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
    alt: "A bright workspace with shared desks and natural light",
  },
  {
    id: "03", title: "Talent & hiring", category: "Room for your next chapter",
    description: "Bring great people on board, from first conversation to day one.",
    href: "#platform",
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85",
    alt: "Colleagues exchanging ideas in a creative office",
  },
  {
    id: "04", title: "Finance & spend", category: "Clarity in every decision",
    description: "Bring expenses, approvals, and workforce costs into focus.",
    href: "#platform",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85",
    alt: "An open office with large windows and green plants",
  },
];

export function CinematicList({ items = ITEMS }) {
  return (
    <section className="what-we-build" id="what-we-build" aria-labelledby="what-we-build-title">
      <div className="container">
        <div className="section-heading section-heading-center">
          <h2 className="section-title" id="what-we-build-title">What we <span>build</span></h2>
        </div>
        <div className="cinematic-list">
          {items.map((item) => (
            <a className="cinematic-item" href={item.href} key={item.id}>
              <div className="cinematic-image">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              </div>
              <div className="cinematic-content">
                <span className="cinematic-number">{item.id}</span>
                <div className="cinematic-copy">
                  <h3>{item.title}</h3>
                  <p className="cinematic-description">{item.description}</p>
                </div>
                <span className="cinematic-category">{item.category}</span>
                <span className="cinematic-arrow" aria-hidden="true"><MoveRight size={22} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
