import { Gauge, HeartHandshake, Workflow, LineChart } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

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
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-desc">{desc}</p>
    </div>
  );
}

export default function FeatureRow() {
  return (
    <section className="feature-row-section">
      <div className="container">
        <div className="section-heading section-heading-center">
          <p className="eyebrow">platform overview</p>
          <h2 className="section-title">One platform, countless possibilities</h2>
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
