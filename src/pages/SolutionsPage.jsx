import SolutionsHero from "../components/SolutionsHero";
import FeatureRow from "../components/FeatureRow";
import Portfolio9 from "../components/ui/block-portfolio-9";
import { CinematicList } from "../components/ui/cinematic-list";
import FeatureSections from "../components/FeatureSections";
import { LayoutGrid } from "../components/ui/layout-grid";
import ExpandingServices from "../components/ExpandingServices";

const solutionCards = [
  {
    id: 1,
    title: "People & HR",
    className: "layout-grid__item--wide",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "A team collaborating around a shared table",
    content: (
      <>
        <h3>People &amp; HR</h3>
        <p>
          Bring employee records, leave, and everyday HR into one connected
          place that makes work simpler for everyone.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "Payroll & attendance",
    className: "layout-grid__item--tall",
    thumbnail:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A bright workspace with shared desks and natural light",
    content: (
      <>
        <h3>Payroll &amp; attendance</h3>
        <p>
          Connect time, attendance, and pay in one seamless workflow, with
          accurate information from clock-in to payday.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "Talent & hiring",
    thumbnail:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Colleagues exchanging ideas in a creative office",
    content: (
      <>
        <h3>Talent &amp; hiring</h3>
        <p>
          Find and welcome the right people, with a smoother experience from
          the first conversation through their first day.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "Finance & spend",
    className: "layout-grid__item--wide",
    thumbnail:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "An open office with large windows and green plants",
    content: (
      <>
        <h3>Finance &amp; spend</h3>
        <p>
          Bring expenses, approvals, and workforce costs into focus so your
          team can make confident, well-informed decisions.
        </p>
      </>
    ),
  },
];

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <FeatureRow />
      <Portfolio9 />
      <CinematicList />
      <section
        className="solutions-grid-section"
        aria-labelledby="solutions-grid-title"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">One connected platform</p>
            <h2 className="section-title" id="solutions-grid-title">
              Explore our solutions
            </h2>
          </div>
          <LayoutGrid cards={solutionCards} />
        </div>
      </section>
      <FeatureSections />
      <ExpandingServices />
    </>
  );
}
