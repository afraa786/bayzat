import { Quote } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const QUOTES = [
  {
    quote: "We moved four spreadsheets and a ticketing queue into Crodlin in under three weeks. Payroll close went from four days to one afternoon.",
    name: "Priya Nandan",
    title: "Head of People, Kestrel Works",
  },
  {
    quote: "The finance view alone paid for itself. We finally see workforce cost in real time instead of reconstructing it every month end.",
    name: "Daniel Osei",
    title: "VP Finance, Fenwick Partners",
  },
  {
    quote: "Our managers actually use it, which is the real test. Leave requests and approvals just happen now instead of living in email.",
    name: "Meera Chandran",
    title: "COO, Loft & Union",
  },
];

function TestimonialCard({ quote, name, title, index }) {
  const ref = useReveal(index * 100);
  return (
    <figure className="testimonial-card reveal" ref={ref}>
      <Quote size={28} strokeWidth={1.5} className="testimonial-quote-icon" />
      <blockquote>{quote}</blockquote>
      <figcaption>
        <span className="testimonial-name">{name}</span>
        <span className="testimonial-title">{title}</span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="why">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">what teams say</p>
          <h2 className="section-title">Trusted by people teams who'd rather not do payroll twice</h2>
        </div>
        <div className="testimonials-grid">
          {QUOTES.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
