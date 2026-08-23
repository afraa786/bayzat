const LOGOS = [
  "Northfield & Co", "Verdant Labs", "Harlow Group", "Kestrel Works", "Amberline",
  "Fenwick Partners", "Solace Systems", "Braemar", "Loft & Union", "Pemberton",
  "Cobalt Yard", "Drift Studio", "Ridgeline", "Marrow Co", "Quietwork",
  "Hearth Digital", "Auric Supply", "Farrow Bay", "Nettle & Rye", "Callow Industries",
];

export default function LogoMarquee() {
  const track = [...LOGOS, ...LOGOS];

  return (
    <section className="marquee-section">
      <div className="container">
        <p className="marquee-label">Trusted by teams at</p>
      </div>
      <div className="marquee-mask">
        <div className="marquee-track">
          {track.map((name, i) => (
            <span className="marquee-logo" key={`${name}-${i}`}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
