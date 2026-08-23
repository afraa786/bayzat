import { useReveal } from "../hooks/useReveal";
import FeatureIllustration from "./FeatureIllustration";
import RibbonCta from "./RibbonCta";

const SECTIONS = [
  {
    tag: "core hr",
    title: "Every employee record, one clean source of truth",
    body: "Store contracts, org charts, and personal details in a single system that stays in sync across every team. No more chasing updates through spreadsheets or shared drives.",
    art: "core-hr",
  },
  {
    tag: "payroll",
    title: "Payroll that runs itself, correctly, every time",
    body: "Crodlin calculates pay, deductions, and statutory contributions automatically, then routes approvals before anything is disbursed. Fewer errors, faster close.",
    art: "payroll",
  },
  {
    tag: "talent & hiring",
    title: "Hire faster without losing the human touch",
    body: "Move candidates through a shared pipeline, collect structured feedback, and convert offers into onboarding in a single motion — no re-entry required.",
    art: "talent",
  },
  {
    tag: "finance & spend",
    title: "Give finance a real-time view of workforce cost",
    body: "See payroll, expenses, and headcount spend in one ledger. Forecast confidently instead of reconciling three systems at month end.",
    art: "finance",
  },
  {
    tag: "insurance & benefits",
    title: "Benefits your team actually understands",
    body: "Employees enrol, compare, and claim in a few clicks, while HR keeps a clear audit trail of every policy and dependent on file.",
    art: "benefits",
  },
  {
    tag: "ai assistant",
    title: "An assistant that knows your policies by heart",
    body: "Ask Crodlin's assistant about leave balances, policy exceptions, or payroll timing, and get an answer grounded in your own company data — not a generic script.",
    art: "ai",
  },
];

function FeatureBlock({ tag, title, body, art, reversed }) {
  const textRef = useReveal();
  const artRef = useReveal(120);

  return (
    <div className={`feature-block ${reversed ? "feature-block-reversed" : ""}`}>
      <div className={`feature-block-art ${reversed ? "reveal-left" : "reveal-right"}`} ref={artRef}>
        <FeatureIllustration type={art} />
      </div>
      <div className={`feature-block-copy ${reversed ? "reveal-right" : "reveal-left"}`} ref={textRef}>
        <p className="eyebrow">{tag}</p>
        <h3 className="feature-block-title">{title}</h3>
        <p className="feature-block-body">{body}</p>
        <RibbonCta as="a" href="#learn-more" className="ribbon-btn-sm feature-block-link">
          Learn more
        </RibbonCta>
      </div>
    </div>
  );
}

export default function FeatureSections() {
  return (
    <section className="feature-blocks-section" id="platform">
      <div className="container feature-blocks-stack">
        {SECTIONS.map((s, i) => (
          <FeatureBlock key={s.tag} {...s} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
