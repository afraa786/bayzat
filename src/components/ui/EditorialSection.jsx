export default function EditorialSection({ eyebrow, title, intro, children, tone = "paper" }) {
  return (
    <section className={`editorial-section editorial-section--${tone}`}>
      <div className="container editorial-section__inner">
        <div className="editorial-section__heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {intro && <p className="editorial-section__intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
