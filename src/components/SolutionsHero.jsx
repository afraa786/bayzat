import { ArrowDown, Check } from "lucide-react";

export default function SolutionsHero() {
  return (
    <section className="solutions-hero" id="solutions" aria-labelledby="solutions-title">
      <div className="solutions-hero-inner">
        <div className="solutions-hero-copy">
          <div>
            <h1 id="solutions-title">Make every part of work flow better.</h1>
            <p>One calm, connected system for the people, payroll, and decisions that keep your business moving.</p>
          </div>
          <div className="solutions-hero-proof">
            <p><Check size={18} strokeWidth={2} /> Built around the way your team works</p>
            <p><Check size={18} strokeWidth={2} /> Ready for every stage of growth</p>
          </div>
        </div>
        <a className="solutions-hero-scroll" href="#solutions-overview" aria-label="Explore solutions">
          <span>Explore solutions</span>
          <ArrowDown size={18} strokeWidth={1.7} />
        </a>
      </div>
    </section>
  );
}
