import { Check, TrendingUp, Sparkles } from "lucide-react";

/**
  reads: overlapping, offset, layered.
*/
export default function FeatureIllustration({ type }) {
  switch (type) {
    case "core-hr":
      return (
        <div className="collage">
          <div className="collage-card collage-card-main">
            {["Amara O.", "Jonas P.", "Riya K.", "Malik T."].map((name) => (
              <div className="collage-record-row" key={name}>
                <span className="collage-avatar">{name[0]}</span>
                <div className="collage-record-meta">
                  <span className="collage-record-name">{name}</span>
                  <span className="collage-record-sub">Full-time · Verified</span>
                </div>
                <Check size={16} className="collage-check" />
              </div>
            ))}
          </div>
          <div className="collage-card collage-card-mini collage-pos-tr">
            <span className="collage-mini-label">Documents synced</span>
            <span className="collage-mini-value">248</span>
          </div>
        </div>
      );

    case "payroll":
      return (
        <div className="collage">
          <div className="collage-card collage-card-main">
            <div className="collage-payslip-head">
              <span>Payslip · August</span>
              <span className="collage-tag-paid">Paid</span>
            </div>
            {[
              ["Base salary", "$5,200.00"],
              ["Housing allowance", "$800.00"],
              ["Statutory deduction", "-$312.00"],
            ].map(([label, value]) => (
              <div className="collage-line-row" key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
            <div className="collage-line-total">
              <span>Net pay</span>
              <span>$5,688.00</span>
            </div>
          </div>
          <div className="collage-card collage-card-mini collage-pos-bl">
            <TrendingUp size={16} className="collage-mini-icon" />
            <span className="collage-mini-label">Payroll accuracy</span>
            <span className="collage-mini-value">99.9%</span>
          </div>
        </div>
      );

    case "talent":
      return (
        <div className="collage">
          <div className="collage-card collage-card-main collage-pipeline">
            <span className="collage-pipeline-title">Sales Analyst pipeline</span>
            {[
              { stage: "Applied", count: 86 },
              { stage: "Screened", count: 34 },
              { stage: "Interview", count: 12 },
              { stage: "Offer", count: 3 },
            ].map((row) => (
              <div className="collage-pipeline-row" key={row.stage}>
                <span>{row.stage}</span>
                <div className="collage-pipeline-bar">
                  <div className="collage-pipeline-fill" style={{ width: `${row.count}%` }} />
                </div>
                <span className="collage-pipeline-count">{row.count}</span>
              </div>
            ))}
          </div>
          <div className="collage-card collage-card-mini collage-pos-tr">
            <span className="collage-mini-label">Avg. time to hire</span>
            <span className="collage-mini-value">18 days</span>
          </div>
        </div>
      );

    case "finance":
      return (
        <div className="collage">
          <div className="collage-card collage-card-main">
            <span className="collage-chart-title">Workforce spend by month</span>
            <div className="collage-chart">
              {[60, 100, 40, 130, 80, 150].map((h, i) => (
                <div
                  key={i}
                  className={`collage-bar ${i === 5 ? "collage-bar-highlight" : ""}`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
          <div className="collage-card collage-card-mini collage-pos-bl">
            <span className="collage-mini-label">This month</span>
            <span className="collage-mini-value">$284K</span>
          </div>
        </div>
      );

    case "benefits":
      return (
        <div className="collage">
          <div className="collage-card collage-card-main collage-benefits">
            <span className="collage-benefits-title">Health plan · Standard</span>
            {["Inpatient care", "Dental", "Optical", "Dependents (2)"].map((item) => (
              <div className="collage-benefits-row" key={item}>
                <Check size={14} className="collage-check" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="collage-card collage-card-mini collage-pos-tr">
            <span className="collage-mini-label">Claim approved</span>
            <span className="collage-mini-value">2 days</span>
          </div>
        </div>
      );

    case "ai":
      return (
        <div className="collage">
          <div className="collage-card collage-card-main collage-ai">
            <div className="collage-ai-head">
              <Sparkles size={16} />
              <span>Ask Crodlin</span>
            </div>
            <p className="collage-ai-question">"How many leave days does Riya have left?"</p>
            <p className="collage-ai-answer">Riya K. has 9 annual leave days remaining, based on her current balance and approved requests.</p>
          </div>
          <div className="collage-card collage-card-mini collage-pos-bl">
            <span className="collage-mini-label">Answered in</span>
            <span className="collage-mini-value">1.2s</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
