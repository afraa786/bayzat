import "./LogoMarquee.css";

const LOGOS = [
  { name: "Celestial", color: "#00BCD4" },
  { name: "Nova", color: "#212121" },
  { name: "Zenith", color: "#00BCD4" },
  { name: "Acme Corp", color: "#212121" },
  { name: "Quantum", color: "#00BCD4" },
  { name: "Echo Valley", color: "#212121" },
  { name: "PULSE", color: "#00BCD4" },
  { name: "APEX", color: "#212121" },
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
