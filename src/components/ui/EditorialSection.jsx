export default function EditorialSection({ eyebrow, title, intro, children, tone = "paper", className = "" }) {
  return (
    <section className={`editorial-section editorial-section--${tone} ${className}`.trim()}>
      <div className="container editorial-section__inner">
        <div className="editorial-section__heading">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {intro && <p className="editorial-section__intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
