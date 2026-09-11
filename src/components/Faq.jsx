import { useState, useRef } from "react";
import { Minus, Plus } from "lucide-react";
import DecorativeAsset from "./DecorativeAsset";

const FAQS = [
  {
    q: "What does Crodlin actually cover?",
    a: "Crodlin unifies core HR, payroll, attendance, shift scheduling, leave, and employee records in one platform, so you're not stitching together separate tools for each function.",
  },
  {
    q: "Is Crodlin compliant with local labor and tax regulations?",
    a: "Yes. Payroll calculations, statutory contributions, and leave policies are configured per country and updated as regulations change, so you stay compliant without manual tracking.",
  },
  {
    q: "How is Crodlin priced?",
    a: "Pricing is per employee per month, based on which modules you use. There are no setup fees, and you can add or remove modules as your team grows.",
  },
  {
    q: "How long does implementation take?",
    a: "Most teams under 200 employees are fully live within two to three weeks, including data migration, policy configuration, and admin training.",
  },
  {
    q: "What support do we get after go-live?",
    a: "Every customer gets a named onboarding specialist during setup and ongoing access to live chat and email support, with priority response for payroll-critical issues.",
  },
  {
    q: "Can Crodlin integrate with our existing tools?",
    a: "Crodlin connects with common accounting, SSO, and communication tools out of the box, and offers an API for custom integrations with internal systems.",
  },
  {
    q: "What security certifications does Crodlin hold?",
    a: "Crodlin is SOC 2 Type II and ISO 27001 certified, with data encrypted in transit and at rest, and role-based access controls across every module.",
  },
  {
    q: "Can we migrate from our current HR or payroll system?",
    a: "Yes. Our implementation team handles data migration from most common HR and payroll systems, including historical payroll records and employee documents.",
  },
];

function FaqItem({ q, a, isOpen, onToggle }) {
  const panelRef = useRef(null);

  return (
    <div className={`faq-item ${isOpen ? "faq-item-open" : ""}`}>
      <h3>
        <button
          className="faq-trigger"
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <span>{q}</span>
          {isOpen ? <Minus size={28} className="faq-chev" /> : <Plus size={28} className="faq-chev" />}
        </button>
      </h3>
      <div
        className="faq-panel"
        ref={panelRef}
        style={{ maxHeight: isOpen ? panelRef.current?.scrollHeight ?? 500 : 0 }}
      >
        <p className="faq-answer">{a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <div className="container faq-container">
        <div className="section-heading section-heading-center faq-heading">
          <p className="eyebrow">faq</p>
          <h2 className="section-title">Questions we get <span>a lot</span></h2>
        </div>
        <div className="faq-layout">
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                {...item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
          <div className="faq-visual" aria-hidden="true">
            <DecorativeAsset name="faqs" className="faq-visual-asset" />
          </div>
        </div>
      </div>
    </section>
  );
}
