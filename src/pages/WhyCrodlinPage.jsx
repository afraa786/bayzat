import CounterCurtainHero from "../components/ui/CounterCurtainHero";
import EditorialSection from "../components/ui/EditorialSection";
import RibbonCta from "../components/RibbonCta";
import ServicesCarousel from "../components/ui/ServicesCarousel";
import "./WhyCrodlinPage.css";

const PRINCIPLES = [
  ["01", "One source of truth", "People data, payroll, time, and operations stay connected instead of living across disconnected tools."],
  ["02", "Built around people", "Clear employee experiences and thoughtful automation give HR teams more time for work that needs a human."],
  ["03", "Ready for what’s next", "Flexible workflows, useful insight, and dependable controls help growing organizations move without rebuilding their foundation."],
];

export default function WhyCrodlinPage() {
  return (
    <>
      <CounterCurtainHero />
      <EditorialSection
        eyebrow="Why Crodlin"
        title="Workflows should disappear. Progress should not."
        intro="Crodlin brings the systems behind work into one calm, connected platform—so your people can move faster without feeling the machinery underneath."
      >
        <div className="why-principles">
          {PRINCIPLES.map(([number, title, copy]) => (
            <article className="why-principle" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </EditorialSection>
      <ServicesCarousel />
      <EditorialSection
        eyebrow="The difference"
        title="Less administration. More direction."
        intro="A platform should not add another layer of work. It should remove uncertainty, make ownership clear, and help every team act on the same information."
        tone="moss"
      >
        <RibbonCta as="a" href="#get-started" className="why-cta">See Crodlin in action</RibbonCta>
      </EditorialSection>
    </>
  );
}
