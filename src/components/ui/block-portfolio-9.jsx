import "./block-portfolio-9.css";

const PROJECTS = [
  {
    title: "Breathe In",
    description:
      "Better a diamond with a flaw than a pebble without one. It's about creating yourself.",
    color: "#80b3ad",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "A team collaborating around a shared table",
    isWide: true,
  },
  {
    title: "Clock Me",
    description: "Better a diamond with a flaw than a pebble without one.",
    color: "#f48c68",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A bright workspace with shared desks and natural light",
    isWide: false,
  },
  {
    title: "Stream Co",
    description: "Better a diamond with a flaw than a pebble without one.",
    color: "#3c9bf2",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Colleagues exchanging ideas in a creative office",
    isWide: false,
  },
  {
    title: "Nirvanous",
    description:
      "Better a diamond with a flaw than a pebble without one. It's about creating yourself.",
    color: "#7a60f9",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "An open office with large windows and green plants",
    isWide: true,
  },
];

export default function Portfolio9() {
  return (
    <section
      className="portfolio-nine"
      aria-labelledby="portfolio-nine-title"
    >
      <div className="container">
        <div className="portfolio-nine__header">
          <div className="portfolio-nine__intro">
            <p className="eyebrow">Good work, thoughtfully done</p>
            <h2 id="portfolio-nine-title">
              Creative solutions to improve your business
            </h2>
            <p className="portfolio-nine__description">
              Only those who risk going too far can possibly find out how far
              one can go.
            </p>
          </div>
          <a className="portfolio-nine__button" href="#what-we-build">
            View portfolio
          </a>
        </div>

        <div className="portfolio-nine__grid">
          {PROJECTS.map((project) => (
            <article
              className={`portfolio-nine__card ${
                project.isWide
                  ? "portfolio-nine__card--wide"
                  : "portfolio-nine__card--narrow"
              }`}
              key={project.title}
              style={{ "--portfolio-card-color": project.color }}
            >
              <div className="portfolio-nine__text">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="portfolio-nine__image">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
