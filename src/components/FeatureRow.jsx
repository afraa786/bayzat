import { Gauge, HeartHandshake, Workflow, LineChart } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import DecorativeAsset from "./DecorativeAsset";

const FEATURES = [
  { icon: Gauge, title: "Drive efficiency, save time", desc: "Automate the repetitive parts of HR and payroll so your team can focus on people, not paperwork." },
  { icon: HeartHandshake, title: "Empower employees to thrive", desc: "Give every employee self-service access to payslips, leave, and records — no more ticket queues." },
  { icon: Workflow, title: "Unified, scalable operations", desc: "One source of truth across HR, payroll, and attendance means fewer errors and less reconciliation." },
  { icon: LineChart, title: "Lead with real insights", desc: "Real-time workforce dashboards turn scattered data into decisions you can act on today." },
];

function FeatureCard({ icon: Icon, title, desc, index }) {
  const ref = useReveal(index * 100);
  return (
    <div className="feature-card reveal" ref={ref}>
      <div className="feature-card-icon">
        <Icon size={36} strokeWidth={2.8} />
      </div>
      <div className="feature-card-copy">
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-desc">{desc}</p>
      </div>
    </div>
  );
}

export default function FeatureRow() {
  return (
    <section className="feature-row-section" id="solutions-overview">
      <DecorativeAsset name="asset1" className="feature-row-accent" />
      <DecorativeAsset name="dotted" className="feature-row-dots" />
      <div className="container">
        <div className="section-heading section-heading-center">
          <h2 className="section-title">One platform, countless possibilities</h2>
          <p className="feature-row-intro">Automate HR, payroll, benefits, and spend management through one connected workflow.</p>
        </div>
        <div className="feature-row-grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
