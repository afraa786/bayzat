import "./LogoMarquee.css";

const LOGOS = [
  { name: "Celestial", color: "#6655b8" },
  { name: "Nova", color: "#be4b32" },
  { name: "Zenith", color: "#267a69" },
  { name: "Acme Corp", color: "#b47720" },
  { name: "Quantum", color: "#346bb4" },
  { name: "Echo Valley", color: "#71813c" },
  { name: "PULSE", color: "#c24765" },
  { name: "APEX", color: "#ad5527" },
];

export default function LogoMarquee() {
  return (
    <section className="brand-marquee" aria-label="Company logos">
      <p className="brand-marquee-label">Trusted by popular companies</p>
      <div className="brand-marquee-mask">
        <div className="brand-marquee-track">
          {[0, 1].map(copy => (
            <div className="brand-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {LOGOS.map(logo => (
                <span className="brand-marquee-logo" key={logo.name} style={{ "--brand-color": logo.color }} tabIndex={copy === 0 ? 0 : undefined}>
                  {logo.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
