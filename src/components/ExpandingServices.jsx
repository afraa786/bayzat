import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import webImage from "../../images/office1.jpeg";
import appImage from "../../images/tech1.jpeg";
import marketingImage from "../../images/tech5.jpeg";
import cloudImage from "../../images/tech6.jpeg";
import consultingImage from "../../images/office4.jpeg";
import "./ExpandingServices.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { title: "Web development", body: "Thoughtful websites built for your business, with performance and room to grow.", image: webImage, alt: "A warm wooden workspace with a laptop" },
  { title: "Mobile experiences", body: "Intuitive apps that bring your ideas to life, wherever your customers are.", image: appImage, alt: "A minimal silver music player with geometric controls" },
  { title: "Digital marketing", body: "Creative campaigns that connect your brand with the people who matter.", image: marketingImage, alt: "A white speaker with a circular pattern and metal frame" },
  { title: "Cloud solutions", body: "Connected systems that simplify your operations and support your next chapter.", image: cloudImage, alt: "A sculptural black speaker in a bright modern interior" },
  { title: "Technology strategy", body: "A clear direction for your technology, from the first idea to what comes next.", image: consultingImage, alt: "A glowing desk lamp beside a notebook" },
];

export default function ExpandingServices() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 769px)", mobile: "(max-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" }, scope => {
      if (!scope.conditions.motion) return;
      const rows = gsap.utils.toArray(".expanding-service", root);
      const list = root.querySelector(".expanding-services-list");
      const minimum = scope.conditions.mobile ? 320 : 180;
      const maximum = scope.conditions.mobile ? 560 : 450;
      // Earlier rows have reached their full height when this row reaches the top.
      // Stable endpoints avoid measuring a row while its height is changing.
      const rowTop = index => list.getBoundingClientRect().top + window.scrollY + index * maximum;
      const context = gsap.context(self => {
        gsap.set(rows, { height: minimum });
        self.add("animateRow", row => {
          const index = rows.indexOf(row);
          const frame = row.querySelector(".expanding-service-frame");
          gsap.fromTo(row, { height: minimum }, {
            height: maximum, ease: "none",
            scrollTrigger: {
              trigger: row, start: () => rowTop(index) - window.innerHeight,
              end: () => rowTop(index), scrub: .35, invalidateOnRefresh: true,
            },
          });
          gsap.fromTo(frame, { width: "30%" }, {
            width: "100%", ease: "none",
            scrollTrigger: {
              trigger: row, start: () => rowTop(index) + minimum - window.innerHeight,
              end: () => rowTop(index), scrub: .35, invalidateOnRefresh: true,
            },
          });
        });
      }, root);
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          context.animateRow(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: .1 });
      rows.forEach(row => observer.observe(row));
      return () => { observer.disconnect(); context.revert(); };
    }, root);
    return () => media.revert();
  }, []);

  return (
    <section className="expanding-services" ref={rootRef} aria-labelledby="expanding-services-title">
      <div className="container">
        <div className="expanding-services-heading">
          <h2 id="expanding-services-title"><em>Excellency in creative designs</em></h2>
        </div>
        <div className="expanding-services-list">
          {SERVICES.map((service, index) => (
            <article className="expanding-service" key={service.title}>
              <div className="expanding-service-copy">
                <div>
                  <span className="expanding-service-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.body}</p>
              </div>
              <div className="expanding-service-media">
                <div className="expanding-service-frame">
                  <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
